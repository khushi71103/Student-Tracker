import { boolean, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

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

export const ATTENDANCE = pgTable('attendance',{
  id: serial('id').primaryKey(),
  studentId: serial('studentId').notNull(),
  present:boolean('present').default(false),
  day:integer('day').notNull(),
  date:varchar('date').notNull()
})