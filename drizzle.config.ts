import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.tsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://studentattend_owner:x8LFz0QJYOtD@ep-wild-hill-a5qkgycg.us-east-2.aws.neon.tech/Student%20Attendance%20Tracker%20System?sslmode=require!",
  },
});