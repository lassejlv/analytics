import * as v from "valibot";

export const env = v.parse(
  v.object({
    DATABASE_URL: v.string(),
    BETTER_AUTH_SECRET: v.string(),
    BETTER_AUTH_URL: v.string(),
    CLIENT_URL: v.optional(v.string(), "http://localhost:3000"),
    PORT: v.optional(v.pipe(v.string(), v.transform(Number)), "3000"),
  }),
  process.env,
);
