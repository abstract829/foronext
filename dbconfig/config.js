import { Pool } from "pg";

export const db = new Pool({
  connectionString:
    "postgres://kmfjqgulourodh:a23c5c10905a3356fc01f8b18cdffcb960959dc0141725ef841fe2468cd43b48@ec2-52-201-106-191.compute-1.amazonaws.com:5432/d29r14dprilii2",
  ssl: {
    rejectUnauthorized: false,
  },
});
