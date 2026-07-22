import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";

import type { D1Database } from "@cloudflare/workers-types";

import { contacts } from "../db/schema";

type Bindings = {
  DB: D1Database;
};

const contactRoutes = new Hono<{
  Bindings: Bindings;
}>();

// GET /api/contacts
contactRoutes.get("/", async (c) => {
  const db = drizzle(c.env.DB);

  const result = await db
    .select()
    .from(contacts);

  return c.json({
    success: true,
    data: result,
  });
});

// GET /api/contacts/:id
contactRoutes.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const db = drizzle(c.env.DB);

  const result = await db
    .select()
    .from(contacts)
    .where(eq(contacts.id, id))
    .limit(1);

  if (result.length === 0) {
    return c.json(
      {
        success: false,
        message: "Contact not found",
      },
      404
    );
  }

  return c.json({
    success: true,
    data: result[0],
  });
});

// POST /api/contacts
contactRoutes.post("/", async (c) => {
  const body = await c.req.json();

  const db = drizzle(c.env.DB);

  const result = await db
    .insert(contacts)
    .values({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      company: body.company,
    })
    .returning();

  return c.json(
    {
      success: true,
      message: "Contact created successfully",
      data: result[0],
    },
    201
  );
});

// PUT /api/contacts/:id
contactRoutes.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const body = await c.req.json();

  const db = drizzle(c.env.DB);

  const result = await db
    .update(contacts)
    .set({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      company: body.company,
    })
    .where(eq(contacts.id, id))
    .returning();

  if (result.length === 0) {
    return c.json(
      {
        success: false,
        message: "Contact not found",
      },
      404
    );
  }

  return c.json({
    success: true,
    message: "Contact updated successfully",
    data: result[0],
  });
});

// DELETE /api/contacts/:id
contactRoutes.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const db = drizzle(c.env.DB);

  const result = await db
    .delete(contacts)
    .where(eq(contacts.id, id))
    .returning();

  if (result.length === 0) {
    return c.json(
      {
        success: false,
        message: "Contact not found",
      },
      404
    );
  }

  return c.json({
    success: true,
    message: "Contact deleted successfully",
  });
});

export default contactRoutes;