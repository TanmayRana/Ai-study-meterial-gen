import {
  boolean,
  json,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  isMember: boolean().default(false),
  customerId: varchar(),
});

export const STUDY_MATERIAL_TABLE = pgTable("studyMaterials", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  courseType: varchar().notNull(),
  topic: varchar().notNull(),
  difficultyLevel: varchar().default("easy"),
  courseLayout: json(),
  createdBy: varchar().notNull(),
  status: varchar().default("Generating"),
});

export const CHAPTER_NODE_TABLE = pgTable("chapterNodes", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  chapterId: varchar().notNull(),
  notes: text(),
});

export const STUDY_TYPE_CONTENT_TABLE = pgTable("studyTypeContents", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  content: json(),
  type: varchar().notNull(),
  status: varchar().default("Generating"),
});

export const PAYMENT_TABLE = pgTable("payments", {
  id: serial().primaryKey(),
  customerId: varchar(),
  sessionId: varchar(),
});
