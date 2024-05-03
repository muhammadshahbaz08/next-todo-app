import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const todoTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  task: varchar("task", { length: 255 }).notNull(),
});

//Types
export type Todo = InferSelectModel<typeof todoTable>;
export type newTodo = InferInsertModel<typeof todoTable>;

export const db = drizzle(sql);
