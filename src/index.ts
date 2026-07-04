import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "./lib/env";
import { auth } from "./lib/auth";

const app = new Hono();

app.use(
  "/api/auth/*",
  cors({
    origin: env.CLIENT_URL,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.get("/health", (c) => c.json({ status: "ok" }));

export default {
  port: env.PORT,
  fetch: app.fetch,
};
