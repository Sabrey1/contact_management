// import { Hono } from "hono";
// import { eq } from "drizzle-orm";
// import { rateLimiter } from "hono-rate-limiter";
// import { db } from "../db/db";
// import {
//   contacts,
//   contactEmails,
//   contactPhones,
// } from "../db/schema";


// const contactRoutes = new Hono();
// // =========================
// // GET ALL CONTACTS
// // =========================


// // const contactLimiter = rateLimiter({
// //   windowMs: 30 * 1000, // 30 seconds
// //   limit: 5, // max 5 requests
// //   keyGenerator: (c) => {
// //     return c.req.header("cf-connecting-ip") || "unknown";
// //   },
// // });

// const contactLimiter = rateLimiter({
//   windowMs: 60 * 1000,
//   limit: 5,
//   keyGenerator: (c) => {
//     return c.req.header("cf-connecting-ip") || "unknown";
//   },
// });
// const contact_phones = rateLimiter({
//   windowMs: 60 * 1000,
//   limit: 5,
//   keyGenerator: (c) => {
//     return c.req.header("cf-connecting-ip") || "unknown";
//   },
// });

// // Apply to all routes inside contactRoutes
// // contactRoutes.use("*", contactLimiter);

// contactRoutes.get("/contacts",contactLimiter, async (c) => {
//   const result = await db.query.contacts.findMany({
//     with: {
//       emails: true,
//       phones: true,
//     },
//   });
//   return c.json({
//     success:true,
//     data:result
//   });
// });

// // =========================
// // GET ONE CONTACT
// // =========================
// contactRoutes.get("/contacts/:id", async (c)=>{
//   const id = Number(c.req.param("id"));
//   const result = await db.query.contacts.findFirst({
//     where:eq(contacts.id,id),
//     with:{
//       emails:true,
//       phones:true,
//     }
//   });
//   if(!result){
//     return c.json({
//       success:false,
//       message:"Contact not found"
//     },404);
//   }
//   return c.json({
//     success:true,
//     data:result
//   });
// });

// // =========================
// // CREATE CONTACT
// // =========================
// contactRoutes.post("/contacts/", async(c)=>{
//   const body = await c.req.json();
//   const [contact] = await db
//     .insert(contacts)
//     .values( body )
//     .returning();
//   // insert emails
//   if(body.emails?.length){
//     await db.insert(contactEmails)
//     .values(
//       body.emails.map((item:any)=>({
//         contactId:contact.id,
//         email:item.email,
//         type:item.type
//       }))
//     );
//   }
//   // insert phones
//   if(body.phones?.length){
//     await db.insert(contactPhones)
//     .values(
//       body.phones.map((item:any)=>({
//         contactId:contact.id,
//         phone:item.phone,
//         type:item.type
//       }))
//     );
//   }

//   return c.json({
//     success:true,
//     data:contact
//   },201);

// });
// // =========================
// // ADD EMAIL TO CONTACT
// // =========================
// contactRoutes.post("/contacts/:id/emails", async(c)=>{
//   const contactId = Number(c.req.param("id"));
//   const body = await c.req.json();

//   const [email] = await db
//     .insert(contactEmails)
//     .values({
//       contactId,
//       email:body.email,
//       type:body.type
//     })
//     .returning();

//   return c.json({
//     success:true,
//     data:email
//   },201);
// });

// // =========================
// // ADD PHONE TO CONTACT
// // =========================
// contactRoutes.post("/contacts/:id/phones", async(c)=>{
//   const contactId = Number(c.req.param("id"));
//   const body = await c.req.json();
//   const [phone] = await db
//     .insert(contactPhones)
//     .values({
//       contactId,
//       phone:body.phone,
//       type:body.type
//     })
//     .returning();

//   return c.json({
//     success:true,
//     data:phone
//   },201);
// });

// // =========================
// // GET CONTACT EMAILS
// // =========================
// contactRoutes.get("/contacts/:id/emails", async(c)=>{
//   const contactId = Number(c.req.param("id"));
//   const result = await db
//     .select()
//     .from(contactEmails)
//     .where(eq(contactEmails.contactId,contactId));

//   return c.json({
//     success:true,
//     data:result
//   });
// });

// // =========================
// // GET CONTACT PHONES
// // =========================
// contactRoutes.get("/contacts/:id/phones", async(c)=>{

//   const contactId = Number(c.req.param("id"));

//   const result = await db
//     .select()
//     .from(contactPhones)
//     .where(eq(contactPhones.contactId,contactId));

//   return c.json({
//     success:true,
//     data:result
//   });
// });

// // =========================
// // UPDATE CONTACT
// // =========================
// contactRoutes.put("/contacts/:id", async(c)=>{
//   const id = Number(c.req.param("id"));
//   const body = await c.req.json();

//   const [contact] = await db
//     .update(contacts)
//     .set({
//       firstName:body.firstName,
//       lastName:body.lastName,
//       company:body.company
//     })
//     .where(eq(contacts.id,id))
//     .returning();
//   if(!contact){
//     return c.json({
//       success:false,
//       message:"Contact not found"
//     },404);
//   }
//   return c.json({
//     success:true,
//     data:contact
//   });
// });

// // =========================
// // DELETE CONTACT
// // =========================
// contactRoutes.delete("/contacts/:id", async(c)=>{
//   const id = Number(c.req.param("id"));
//   await db
//     .delete(contactEmails)
//     .where(eq(contactEmails.contactId,id));
//   await db
//     .delete(contactPhones)
//     .where(eq(contactPhones.contactId,id));
//   const [contact] = await db
//     .delete(contacts)
//     .where(eq(contacts.id,id))
//     .returning();

//   if(!contact){
//     return c.json({
//       success:false,
//       message:"Contact not found"
//     },404);
//   }
//   return c.json({
//     success:true,
//     message:"Deleted successfully"
//   });
// });
// export default contactRoutes;


import { Hono } from "hono";
import { eq } from "drizzle-orm";

import {
  contacts,
  contactEmails,
  contactPhones
} from "../db/schema";

import { getDB } from "../db/db";


type Bindings = {
  DB: IDBDatabase;
};


const contactRoutes = new Hono<{
  Bindings: Bindings;
}>();

const requestCounts = new Map<string, { count: number; resetAt: number }>();

const contactLimiter = async (c: any, next: any) => {
  const key = c.req.header("cf-connecting-ip") || "unknown";
  const now = Date.now();
  const entry = requestCounts.get(key);

  if (entry && entry.resetAt > now) {
    if (entry.count >= 5) {
      return c.json({
        success: false,
        message: "Too many requests"
      }, 429);
    }

    entry.count += 1;
  } else {
    requestCounts.set(key, {
      count: 1,
      resetAt: now + 60_000,
    });
  }

  await next();
};

contactRoutes.post("/", contactLimiter, async(c)=>{

  const db = getDB(c.env);


  const body = await c.req.json();


  const [contact] = await db
    .insert(contacts)
    .values({
      firstName:body.firstName,
      lastName:body.lastName,
      company:body.company
    })
    .returning();



  if(body.emails?.length){

    await db.insert(contactEmails)
    .values(
      body.emails.map((item:any)=>({
        contactId:contact.id,
        email:item.email,
        type:item.type
      }))
    );

  }



  if(body.phones?.length){

    await db.insert(contactPhones)
    .values(
      body.phones.map((item:any)=>({
        contactId:contact.id,
        phone:item.phone,
        type:item.type
      }))
    );

  }



  return c.json({
    success:true,
    data:contact
  });

});


export default contactRoutes;