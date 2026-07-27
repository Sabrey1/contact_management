import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { rateLimiter } from "hono-rate-limiter";
import { db } from "../db/db";
import {
  roles,
  contactEmails,
  contactPhones,
} from "../db/schema";


const roleRoutes = new Hono();

const roleLimiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 5,
  keyGenerator: (c) => {
    return c.req.header("cf-connecting-ip") || "unknown";
  },
});
const contact_phones = rateLimiter({
  windowMs: 60 * 1000,
  limit: 5,
  keyGenerator: (c) => {
    return c.req.header("cf-connecting-ip") || "unknown";
  },
});

// Apply to all routes inside roleRoutes
// roleRoutes.use("*", contactLimiter);

roleRoutes.get("/",roleLimiter, async (c) => {
  const result = await db.query.roles.findMany();
  return c.json({
    success:true,
    data:result
  });
});


roleRoutes.get("/:id", async (c)=>{
  const id = Number(c.req.param("id"));
  const result = await db.query.contacts.findFirst({
    where:eq(roles.id,id),
    with:{
      emails:true,
      phones:true,
    }
  });
  if(!result){
    return c.json({
      success:false,
      message:"Role not found"
    },404);
  }
  return c.json({
    success:true,
    data:result
  });
});

roleRoutes.post("/", async(c)=>{
  const body = await c.req.json();
  const [role] = await db
    .insert(roles)
    .values( body )
    .returning();
   
  return c.json({
    success:true,
    data:role
  },201);

});

roleRoutes.post("/:id/emails", async(c)=>{
  const contactId = Number(c.req.param("id"));
  const body = await c.req.json();

  const [email] = await db
    .insert(contactEmails)
    .values({
      contactId,
      email:body.email,
      type:body.type
    })
    .returning();

  return c.json({
    success:true,
    data:email
  },201);
});

roleRoutes.post("/:id/phones", async(c)=>{
  const contactId = Number(c.req.param("id"));
  const body = await c.req.json();
  const [phone] = await db
    .insert(contactPhones)
    .values({
      contactId,
      phone:body.phone,
      type:body.type
    })
    .returning();

  return c.json({
    success:true,
    data:phone
  },201);
});

roleRoutes.get("/:id/emails", async(c)=>{
  const contactId = Number(c.req.param("id"));
  const result = await db
    .select()
    .from(contactEmails)
    .where(eq(contactEmails.contactId,contactId));

  return c.json({
    success:true,
    data:result
  });
});

roleRoutes.get("/:id/phones", async(c)=>{

  const contactId = Number(c.req.param("id"));

  const result = await db
    .select()
    .from(contactPhones)
    .where(eq(contactPhones.contactId,contactId));

  return c.json({
    success:true,
    data:result
  });
});

roleRoutes.put("/:id", async(c)=>{
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const [role] = await db
    .update(roles)
    .set({
      name:body.name,
      description:body.description
    })
    .where(eq(roles.id,id))
    .returning();
  if(!role){
    return c.json({
      success:false,
      message:"Role not found"
    },404);
  }
  return c.json({
    success:true,
    data:role
  });
});

roleRoutes.delete("/:id", async(c)=>{
  const id = Number(c.req.param("id"));
  await db
    .delete(contactEmails)
    .where(eq(contactEmails.contactId,id));
  await db
    .delete(contactPhones)
    .where(eq(contactPhones.contactId,id));
  const [contact] = await db
    .delete(roles)
    .where(eq(roles.id,id))
    .returning();

  if(!contact){
    return c.json({
      success:false,
      message:"Contact not found"
    },404);
  }
  return c.json({
    success:true,
    message:"Deleted successfully"
  });
});
export default roleRoutes;