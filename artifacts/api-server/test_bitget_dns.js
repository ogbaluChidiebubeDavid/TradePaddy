import dns from "dns";
const originalLookup = dns.lookup;
dns.lookup = function (hostname, options, callback) {
  let cb = callback;
  let opts = options;
  if (typeof options === "function") {
    cb = options;
    opts = {};
  }
  if (typeof opts === "number") {
    opts = { family: opts };
  }
  if (hostname === "api.bitget.com") {
    if (opts && opts.all) {
      return cb(null, [{ address: "104.18.14.166", family: 4 }], 4);
    }
    return cb(null, "104.18.14.166", 4);
  }
  return originalLookup(hostname, options, cb);
};

import { validateCredentials } from "./src/lib/bitget.ts";

async function run() {
  const creds = {
    apiKey: "bg_b158ad6ba8dbd3f92e0ea3aa45dce1cb",
    secretKey: "14d8b6817ef2a72659bc240c35c93cbfd7304c818dfde6addd85abc3da4131b3",
    passphrase: "Chukstonydave"
  };
  
  try {
    console.log("Testing Bitget credentials with DNS override...");
    const result = await validateCredentials(creds);
    console.log("Success! UID:", result.uid);
    console.log("Spot assets count:", result.spotAssets.length);
    console.log("Spot assets:", JSON.stringify(result.spotAssets, null, 2));
  } catch (err) {
    console.error("Error validating credentials:", err);
  }
}

run();
