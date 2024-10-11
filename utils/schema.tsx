import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

// Define the GRADES table
export const GRADES = pgTable('grades', {
  id: serial('id').primaryKey(),
  grade: varchar('grade', { length: 10 }).notNull(), // Fixed typo from 'garde' to 'grade'
});

export const STUDENTS = pgTable('students', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 20 }).notNull(), // Added missing parentheses for notNull()
  grade: varchar('grade', { length: 10 }).notNull(),
  address: varchar('address', { length: 50 }),
  contact: varchar('contact', { length: 11 }),
});
