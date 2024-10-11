import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { GRADES, STUDENTS } from './schema';  // Import both tables

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema: { grades: GRADES, students: STUDENTS } });

export default db;
