import { config } from 'dotenv'
import * as v from 'valibot'

config({ path: ['.env.local', '.env'] })

export const env = v.parse(
  v.object({
    DATABASE_URL: v.string(),
    BETTER_AUTH_SECRET: v.string(),
    BETTER_AUTH_URL: v.string(),
  }),
  process.env,
)
