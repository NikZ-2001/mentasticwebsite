import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  migrations: {
    seed: 'pnpm exec ts-node prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
})