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

export const customers = sqliteTable("customers", {
  id: integer("id")
    .primaryKey({
      autoIncrement: true,
    }),

  firstName: text("first_name")
    .notNull(),

  lastName: text("last_name")
    .notNull(),

  email: text("email"),

  phone: text("phone"),

  address: text("address"),
});

export const employees = sqliteTable("employees", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),

  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),

  email: text("email"),
  phone: text("phone"),

  position: text("position"), // e.g. Manager, Developer, Sales
  department: text("department"), // e.g. IT, HR, Finance

  salary: integer("salary"),

  hireDate: text("hire_date"),

  address: text("address"),
});