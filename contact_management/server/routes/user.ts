import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { rateLimiter } from "hono-rate-limiter";
import { db } from "../db/db";
import {
  users,
  contactEmails,
  contactPhones

} from "../db/schema";


const userRoutes = new Hono();

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

// Apply to all routes inside userRoutes
// userRoutes.use("*", contactLimiter);

userRoutes.get("/",roleLimiter, async (c) => {
  const result = await db.query.users.findMany(
    {
      columns: {
        username: true,
        roleId: true,
      },
    }
  );
  return c.json({
    success:true,
    data:result
  });
});

userRoutes.get("/:id", async (c)=>{
  const id = Number(c.req.param("id"));
  const result = await db.query.users.findFirst({
    where:eq(users.id,id),
    
  });
  if(!result){
    return c.json({
      success:false,
      message:"User not found"
    },404);
  }
  return c.json({
    success:true,
    data:result
  });
});

userRoutes.post("/", async(c)=>{
  const body = await c.req.json();
  const [user] = await db
    .insert(users)
    .values( body )
    .returning();
   
  return c.json({
    success:true,
    data:user
  },201);
});

userRoutes.post("/:id/emails", async(c)=>{
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

userRoutes.post("/:id/phones", async(c)=>{
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

userRoutes.get("/:id/emails", async(c)=>{
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

userRoutes.get("/:id/phones", async(c)=>{

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

userRoutes.put("/:id", async(c)=>{
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const [role] = await db
    .update(users)
    .set({
      username:body.username,
      password:body.password,
    })
    .where(eq(users.id,id))
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

userRoutes.delete("/:id", async(c)=>{
  const id = Number(c.req.param("id"));
  await db
    .delete(contactEmails)
    .where(eq(contactEmails.contactId,id));
  await db
    .delete(contactPhones)
    .where(eq(contactPhones.contactId,id));
  const [contact] = await db
    .delete(users)
    .where(eq(users.id,id))
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
export default userRoutes;