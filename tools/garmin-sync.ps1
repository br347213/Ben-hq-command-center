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
    return
  }

  $template = @{
    note = "Local personal Garmin Connect config. Do not commit this file."
    username = "YOUR_GARMIN_EMAIL"
    password = "YOUR_GARMIN_PASSWORD"
    start_date = "2026-01-01"
  } | ConvertTo-Json -Depth 4

  Set-Content -LiteralPath $ConfigPath -Value $template
  Write-Host "Created local Garmin config template at $ConfigPath"
}

function Run-Python {
  param([string[]]$Args)
  $python = Find-Python $PythonPath
  if ($python -eq "py") {
    & py @Args
  } else {
    & $python @Args
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
  $env:GARMINDB_HOME = $GarminRoot
  Run-Python @((Garmin-CliPath), "--config", $ConfigPath, "--all", "--download", "--import", "--analyze", "--latest")
}

$statsCandidates = @(
  (Join-Path $GarminRoot "stats.txt"),
  (Join-Path $GarminRoot "DBs\stats.txt")
)

$statsPath = $statsCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
$statsText = if ($statsPath) { Get-Content -Raw -LiteralPath $statsPath } else { "" }

$summary = [ordered]@{
  source = "GarminDB"
  status = if ($statsPath) { "ready" } else { "configured" }
  generatedAt = (Get-Date).ToString("o")
  garminRoot = $GarminRoot
  statsPath = $statsPath
  readiness = "Unknown"
  readinessNote = if ($statsPath) { "GarminDB stats are available locally. Ben HQ can include Garmin context in the encrypted packet." } else { "GarminDB is configured, but no stats.txt was found yet. Run the latest sync after Garmin credentials are set." }
  rawStatsPreview = if ($statsText) { $statsText.Substring(0, [Math]::Min(1200, $statsText.Length)) } else { "" }
}

$summary | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $SummaryPath
Write-Host "Wrote Garmin summary to $SummaryPath"
