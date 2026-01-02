import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.ENV === "production" ? { rejectUnauthorized: false } : false,
});
