// Local dev-server launcher.
//
// On this machine, Avast's HTTPS web-shield intercepts outbound TLS
// connections and re-signs them with its own root certificate. Node trusts
// that certificate only when NODE_EXTRA_CA_CERTS points at it -- otherwise
// every outbound HTTPS call from Node (including calls to Supabase) fails
// with "TypeError: fetch failed". Some process launchers don't propagate
// that env var to spawned processes, so this wrapper sets it explicitly
// before starting Next.js, regardless of who started the wrapper itself.
//
// Safe on machines without Avast: the cert path is only applied if it
// actually exists, so this is a no-op elsewhere.
const { spawnSync } = require("child_process");
const fs = require("fs");

const avastCertPath = "C:\\ProgramData\\Avast Software\\Avast\\wscert.pem";
const env = { ...process.env };

if (!env.NODE_EXTRA_CA_CERTS && fs.existsSync(avastCertPath)) {
  env.NODE_EXTRA_CA_CERTS = avastCertPath;
  env.NODE_USE_SYSTEM_CA = "1";
}

const result = spawnSync("npx", ["next", "dev"], {
  stdio: "inherit",
  shell: true,
  env,
});

process.exit(result.status ?? 1);
