import express, { type Express } from "express";
import cors from "cors";
import session from "express-session";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

import path from "path";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SESSION_SECRET = process.env["SESSION_SECRET"];
if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is required");
}

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    },
  }),
);

app.use("/api", router);

// Serve static frontend files in production
if (process.env.NODE_ENV === "production") {
  const publicPath = path.resolve(__dirname, "../../tradepaddy/dist/public");
  app.use(express.static(publicPath));
  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

export default app;
