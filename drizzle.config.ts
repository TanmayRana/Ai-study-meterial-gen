import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.ts",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_8bgyDtJLIe5Z@ep-tight-forest-a4l2c7qp-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
  },
});
