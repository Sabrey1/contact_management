import {
  sqliteTable,
  integer,
  text,
} from "drizzle-orm/sqlite-core";

import { relations } from "drizzle-orm";

export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),

  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),

  company: text("company"),

  company_name: text("company_name"),
});


export const contactEmails = sqliteTable("contact_emails", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),

  contactId: integer("contact_id")
    .notNull()
    .references(() => contacts.id),

  email: text("email").notNull(),

  type: text("type"), 
  // example: personal, work
});


export const contactPhones = sqliteTable("contact_phones", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),

  contactId: integer("contact_id")
    .notNull()
    .references(() => contacts.id),

  phone: text("phone").notNull(),

  type: text("type"),
  // example: mobile, home, work
});



export const contactsRelations = relations(
  contacts,
  ({ many }) => ({
    emails: many(contactEmails),
    phones: many(contactPhones),
  })
);


export const contactEmailsRelations = relations(
  contactEmails,
  ({ one }) => ({
    contact: one(contacts, {
      fields: [contactEmails.contactId],
      references: [contacts.id],
    }),
  })
);


export const contactPhonesRelations = relations(
  contactPhones,
  ({ one }) => ({
    contact: one(contacts, {
      fields: [contactPhones.contactId],
      references: [contacts.id],
    }),
  })
);



































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


export const roles = sqliteTable("roles", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),

  name: text("name").notNull(), // Admin, Manager, Employee

  description: text("description"),
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),

  name: text("name").notNull(),

  description: text("description"),

  createdAt: text("created_at")
    .notNull()
    .default("CURRENT_TIMESTAMP"),
});



export const suppliers = sqliteTable("suppliers", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),

  name: text("name").notNull(),
  contactPerson: text("contact_person"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  website: text("website"),
  createdAt: text("created_at")
    .notNull()
    .default("CURRENT_TIMESTAMP"),
});