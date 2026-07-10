param(
  [switch]$Setup,
  [switch]$Latest,
  [string]$PythonPath = $env:BEN_HQ_PYTHON
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$PrivateRoot = Join-Path $ProjectRoot ".ben-hq-private"
$GarminRoot = Join-Path $PrivateRoot "garmin"
$SummaryPath = Join-Path $GarminRoot "garmin-summary.json"
$ConfigPath = Join-Path $GarminRoot "GarminConnectConfig.json"

New-Item -ItemType Directory -Force -Path $PrivateRoot, $GarminRoot | Out-Null

function Find-Python {
  param([string]$Preferred)
  if ($Preferred -and (Test-Path $Preferred)) {
    return $Preferred
  }

  $candidates = @(
    "$env:LOCALAPPDATA\Programs\Python\Python312\python.exe",
    "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe",
    "$env:ProgramFiles\Python312\python.exe",
    "$env:ProgramFiles\Python311\python.exe"
  )

  foreach ($candidate in $candidates) {
    if ($candidate -and (Test-Path $candidate)) {
      return $candidate
    }
  }

  $command = Get-Command py -ErrorAction SilentlyContinue
  if ($command) {
    return "py"
  }

  $command = Get-Command python -ErrorAction SilentlyContinue
  if ($command -and $command.Source -notlike "*WindowsApps*") {
    return $command.Source
  }

  throw "Python is not installed. Install Python 3.11+ for this user, then rerun tools\garmin-sync.ps1 -Setup."
}

function Ensure-Config {
  if (Test-Path $ConfigPath) {
    $existing = Get-Content -Raw -LiteralPath $ConfigPath | ConvertFrom-Json
    if ($existing.PSObject.Properties.Name -contains "username") {
      $startDate = Get-Date "2026-01-01"
      if ($existing.start_date) {
        try { $startDate = Get-Date $existing.start_date } catch { }
      }
      $migrated = [ordered]@{
        db = [ordered]@{ type = "sqlite" }
        garmin = [ordered]@{ domain = "garmin.com" }
        credentials = [ordered]@{
          user = $existing.username
          secure_password = $false
          password = $existing.password
          password_file = $null
        }
        data = [ordered]@{
          weight_start_date = $startDate.ToString("MM/dd/yyyy")
          sleep_start_date = $startDate.ToString("MM/dd/yyyy")
          rhr_start_date = $startDate.ToString("MM/dd/yyyy")
          hrv_start_date = $startDate.ToString("MM/dd/yyyy")
          monitoring_start_date = $startDate.ToString("MM/dd/yyyy")
          download_latest_activities = 25
          download_all_activities = 1000
        }
        directories = [ordered]@{
          relative_to_home = $false
          base_dir = $GarminRoot
          mount_dir = ""
        }
        enabled_stats = [ordered]@{
          monitoring = $true
          steps = $true
          itime = $true
          sleep = $true
          rhr = $true
          hrv = $true
          weight = $true
          activities = $true
        }
        course_views = [ordered]@{ steps = @() }
        modes = [ordered]@{}
        activities = [ordered]@{ display = @() }
        settings = [ordered]@{ metric = $false; default_display_activities = @("walking", "running", "cycling") }
        checkup = [ordered]@{ look_back_days = 90 }
      }
      $migrated | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $ConfigPath
      Write-Host "Migrated GarminDB config to the current schema."
    }
    return
  }

  $template = [ordered]@{
    db = [ordered]@{ type = "sqlite" }
    garmin = [ordered]@{ domain = "garmin.com" }
    credentials = [ordered]@{ user = "YOUR_GARMIN_EMAIL"; secure_password = $false; password = "YOUR_GARMIN_PASSWORD"; password_file = $null }
    data = [ordered]@{
      weight_start_date = "01/01/2026"; sleep_start_date = "01/01/2026"; rhr_start_date = "01/01/2026"; hrv_start_date = "01/01/2026"; monitoring_start_date = "01/01/2026"
      download_latest_activities = 25; download_all_activities = 1000
    }
    directories = [ordered]@{ relative_to_home = $false; base_dir = $GarminRoot; mount_dir = "" }
    enabled_stats = [ordered]@{ monitoring = $true; steps = $true; itime = $true; sleep = $true; rhr = $true; hrv = $true; weight = $true; activities = $true }
    course_views = [ordered]@{ steps = @() }
    modes = [ordered]@{}
    activities = [ordered]@{ display = @() }
    settings = [ordered]@{ metric = $false; default_display_activities = @("walking", "running", "cycling") }
    checkup = [ordered]@{ look_back_days = 90 }
  } | ConvertTo-Json -Depth 8

  Set-Content -LiteralPath $ConfigPath -Value $template
  Write-Host "Created local Garmin config template at $ConfigPath"
}

function Run-Python {
  param([string[]]$ArgumentList)
  $python = Find-Python $PythonPath
  if ($python -eq "py") {
    & py @ArgumentList
  } else {
    & $python @ArgumentList
  }
  if ($LASTEXITCODE -ne 0) {
    throw "Garmin sync command failed with exit code $LASTEXITCODE."
  }
}

function Garmin-CliPath {
  $scriptPath = Join-Path $env:APPDATA "Python\Python312\Scripts\garmindb_cli.py"
  if (Test-Path $scriptPath) {
    return $scriptPath
  }
  throw "GarminDB CLI was not found. Run tools\garmin-sync.ps1 -Setup first."
}

Ensure-Config

if ($Setup) {
  Run-Python @("-m", "pip", "install", "--user", "--upgrade", "pip")
  Run-Python @("-m", "pip", "install", "--user", "--upgrade", "garmindb")
}

if ($Latest) {
  $directSync = Join-Path $PSScriptRoot "garmin-direct-sync.py"
  $tokenStore = Join-Path $GarminRoot "tokens"
  Run-Python @($directSync, "--config", $ConfigPath, "--summary", $SummaryPath, "--tokenstore", $tokenStore)
}

$statsCandidates = @(
  (Join-Path $GarminRoot "stats.txt"),
  (Join-Path $GarminRoot "DBs\stats.txt")
)

$statsPath = $statsCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
$statsText = if ($statsPath) { Get-Content -Raw -LiteralPath $statsPath } else { "" }

if (-not (Test-Path $SummaryPath)) {
  throw "Garmin sync did not produce a summary."
}
