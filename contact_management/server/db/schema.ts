import {
  sqliteTable,
  integer,
  text,
} from "drizzle-orm/sqlite-core";

export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),

  firstName: text("first_name").notNull(),

  lastName: text("last_name").notNull(),

  email: text("email"),

  phone: text("phone"),

  company: text("company"),
});