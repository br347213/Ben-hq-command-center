const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };

function corsHeaders(origin, allowedOrigin) {
  return origin === allowedOrigin
    ? {
        "access-control-allow-origin": allowedOrigin,
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "content-type",
        vary: "Origin",
      }
    : {};
}

function response(body, status, origin, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...corsHeaders(origin, env.ALLOWED_ORIGIN) },
  });
}

function decodeHex(value) {
  if (!/^[0-9a-f]{64}$/i.test(value || "")) return null;
  return Uint8Array.from(value.match(/.{2}/g), (byte) => Number.parseInt(byte, 16));
}

function equalBytes(left, right) {
  if (!left || !right || left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left[index] ^ right[index];
  return difference === 0;
}

async function expectedSignature(secret, timestamp, nonce) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${nonce}`)));
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("origin") || "";
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return origin === env.ALLOWED_ORIGIN
        ? new Response(null, { status: 204, headers: corsHeaders(origin, env.ALLOWED_ORIGIN) })
        : response({ error: "Origin not allowed" }, 403, origin, env);
    }
    if (request.method !== "POST" || url.pathname !== "/refresh") {
      return response({ error: "Not found" }, 404, origin, env);
    }
    if (origin !== env.ALLOWED_ORIGIN) return response({ error: "Origin not allowed" }, 403, origin, env);

    let body;
    try {
      body = await request.json();
    } catch {
      return response({ error: "Invalid request" }, 400, origin, env);
    }
    const timestamp = Number(body.timestamp);
    const nonce = typeof body.nonce === "string" ? body.nonce : "";
    const signature = decodeHex(body.signature);
    if (!Number.isSafeInteger(timestamp) || Math.abs(Date.now() - timestamp) > 5 * 60 * 1000 || !/^[0-9a-f-]{20,64}$/i.test(nonce)) {
      return response({ error: "Expired or invalid request" }, 401, origin, env);
    }
    const expected = await expectedSignature(env.REFRESH_SHARED_SECRET, timestamp, nonce);
    if (!equalBytes(signature, expected)) return response({ error: "Signature rejected" }, 401, origin, env);

    const workflowUrl = `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/actions/workflows/${env.GITHUB_WORKFLOW_FILE}/dispatches`;
    const dispatched = await fetch(workflowUrl, {
      method: "POST",
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${env.GITHUB_DISPATCH_TOKEN}`,
        "content-type": "application/json",
        "user-agent": "ben-hq-garmin-refresh",
        "x-github-api-version": "2022-11-28",
      },
      body: JSON.stringify({ ref: env.GITHUB_REF }),
    });
    if (!dispatched.ok) {
      return response({ error: "Refresh could not be started" }, 502, origin, env);
    }
    return response({ accepted: true }, 202, origin, env);
  },
};
