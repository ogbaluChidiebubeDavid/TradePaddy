import dns from "dns";
import app from "./app";
import { logger } from "./lib/logger";

const originalLookup = dns.lookup.bind(dns) as typeof dns.lookup;

dns.lookup = ((hostname: string, options: unknown, callback?: unknown) => {
  let cb = callback as ((...args: unknown[]) => void) | undefined;
  let opts = options as dns.LookupOptions | number | undefined;

  if (typeof options === "function") {
    cb = options as (...args: unknown[]) => void;
    opts = {};
  }

  if (typeof opts === "number") {
    opts = { family: opts };
  }

  if (hostname === "api.bitget.com") {
    if (opts && typeof opts === "object" && opts.all) {
      cb?.(null, [{ address: "104.18.14.166", family: 4 }]);
      return;
    }

    cb?.(null, "104.18.14.166", 4);
    return;
  }

  return originalLookup(hostname, opts as dns.LookupOptions, cb as never);
}) as typeof dns.lookup;

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
