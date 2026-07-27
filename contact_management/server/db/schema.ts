import {
  sqliteTable,
  integer,
  text,
} from "drizzle-orm/sqlite-core";

import { relations } from "drizzle-orm";

export const roles = sqliteTable("roles", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),
  name: text("name").notNull(), // Admin, Manager, Employee
  description: text("description"),
}); 

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({autoIncrement:true}),
  username: text("username").notNull(),
  password: text("password").notNull(),

  roleId: integer("role_id")
    .references(() => roles.id)
    .notNull(),
});

export const permissions = sqliteTable("permissions", {
  id: integer("id").primaryKey({autoIncrement:true}),
  name: text("name").notNull(),
});

export const rolePermissions = sqliteTable("role_permissions", {
  id: integer("id").primaryKey({autoIncrement:true}),

  roleId: integer("role_id")
    .references(() => roles.id)
    .notNull(),

  permissionId: integer("permission_id")
    .references(() => permissions.id)
    .notNull(),
});

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



// contacts relations
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

// Role relationship
export const rolesRelations = relations(
  roles,
  ({ many }) => ({
    users: many(users),

    rolePermissions: many(rolePermissions),
  })
);

// User Relations
export const usersRelations = relations(
  users,
  ({ one }) => ({
    role: one(roles, {
      fields: [users.roleId],
      references: [roles.id],
    }),
  })
);

// Permission Relations
export const permissionsRelations = relations(
  permissions,
  ({ many }) => ({
    rolePermissions: many(rolePermissions),
  })
);

// Role Permission Relations

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

 