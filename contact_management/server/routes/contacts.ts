// // // import { Hono } from "hono";
// // // import { drizzle } from "drizzle-orm/d1";
// // // import { eq } from "drizzle-orm";

// // // import type { D1Database } from "@cloudflare/workers-types";


// // // import { db } from "../db/db";
// // // import { contacts } from "../db/schema";

// // // type Bindings = {
// // //   DB: D1Database;
// // // };

// // // const contactRoutes = new Hono<{
// // //   Bindings: Bindings;
// // // }>();

// // // // GET /api/contacts
// // // contactRoutes.get("/", async (c) => {
// // //   const db = drizzle(c.env.DB);

// // //   const result = await db
// // //     .select()
// // //     .from(contacts);

// // //   return c.json({
// // //     success: true,
// // //     data: result,
// // //   });
// // // });

// // // // GET /api/contacts/:id
// // // contactRoutes.get("/:id", async (c) => {
// // //   const id = Number(c.req.param("id"));

// // //   const db = drizzle(c.env.DB);

// // //   const result = await db
// // //     .select()
// // //     .from(contacts)
// // //     .where(eq(contacts.id, id))
// // //     .limit(1);

// // //   if (result.length === 0) {
// // //     return c.json(
// // //       {
// // //         success: false,
// // //         message: "Contact not found",
// // //       },
// // //       404
// // //     );
// // //   }

// // //   return c.json({
// // //     success: true,
// // //     data: result[0],
// // //   });
// // // });

// // // // POST /api/contacts
// // // // contactRoutes.post("/", async (c) => {
// // // //   const body = await c.req.json();

// // // //   const db = drizzle(c.env.DB);

// // // //   const result = await db
// // // //     .insert(contacts)
// // // //     .values({
// // // //       firstName: body.firstName,
// // // //       lastName: body.lastName,
// // // //       email: body.email,
// // // //       phone: body.phone,
// // // //       company: body.company,
// // // //     })
// // // //     .returning();

// // // //   return c.json(
// // // //     {
// // // //       success: true,
// // // //       message: "Contact created successfully",
// // // //       data: result[0],
// // // //     },
// // // //     201
// // // //   );
// // // // });

// // // contactRoutes.post("/", async (c) => {
// // //   const body = await c.req.json();

// // //   const result = await db
// // //     .insert(contacts)
// // //     .values({
// // //       firstName: body.firstName,
// // //       lastName: body.lastName,
// // //       email: body.email,
// // //       phone: body.phone,
// // //       company: body.company,
// // //     })
// // //     .returning();

// // //   return c.json(
// // //     {
// // //       success: true,
// // //       message: "Contact created successfully",
// // //       data: result[0],
// // //     },
// // //     201
// // //   );
// // // });

// // // // PUT /api/contacts/:id
// // // contactRoutes.put("/:id", async (c) => {
// // //   const id = Number(c.req.param("id"));

// // //   const body = await c.req.json();

// // //   const db = drizzle(c.env.DB);

// // //   const result = await db
// // //     .update(contacts)
// // //     .set({
// // //       firstName: body.firstName,
// // //       lastName: body.lastName,
// // //       email: body.email,
// // //       phone: body.phone,
// // //       company: body.company,
// // //     })
// // //     .where(eq(contacts.id, id))
// // //     .returning();

// // //   if (result.length === 0) {
// // //     return c.json(
// // //       {
// // //         success: false,
// // //         message: "Contact not found",
// // //       },
// // //       404
// // //     );
// // //   }

// // //   return c.json({
// // //     success: true,
// // //     message: "Contact updated successfully",
// // //     data: result[0],
// // //   });
// // // });

// // // // DELETE /api/contacts/:id
// // // contactRoutes.delete("/:id", async (c) => {
// // //   const id = Number(c.req.param("id"));

// // //   const db = drizzle(c.env.DB);

// // //   const result = await db
// // //     .delete(contacts)
// // //     .where(eq(contacts.id, id))
// // //     .returning();

// // //   if (result.length === 0) {
// // //     return c.json(
// // //       {
// // //         success: false,
// // //         message: "Contact not found",
// // //       },
// // //       404
// // //     );
// // //   }

// // //   return c.json({
// // //     success: true,
// // //     message: "Contact deleted successfully",
// // //   });
// // // });

// // // export default contactRoutes;

// // import { Hono } from "hono";
// // import { eq } from "drizzle-orm";

// // import { db } from "../db/db";
// // import { contacts, contactEmails, contactPhones } from "../db/schema";

// // const contactRoutes = new Hono();

// // contactRoutes.post("/", async (c) => {
// //   const body = await c.req.json();

// //   const result = await db
// //     .insert(contacts)
// //     .values(body)
// //     .returning();

// //       const contactId = result[0].id; 


// //   // insert emails
// //   if (body.emails?.length) {

// //     await db.insert(contactEmails)
// //       .values(
// //         body.emails.map((item:any)=>({
// //           contactId,
// //           email:item.email,
// //           type:item.type,
// //         }))
// //       );

// //   }


// //   // insert phones
// //   if (body.phones?.length) {

// //     await db.insert(contactPhones)
// //       .values(
// //         body.phones.map((item:any)=>({
// //           contactId,
// //           phone:item.phone,
// //           type:item.type,
// //         }))
// //       );

// //   }

// //   return c.json({
// //     success: true,
// //     data: result[0],
// //   }, 201);
// // });


// // // contactRoutes.get("/", async (c) => {
// // //   const result = await db
// // //     .select()
// // //     .from(contacts);

// // //   return c.json({
// // //     success: true,
// // //     data: result,
// // //   });
// // // });

// // contactRoutes.get("/", async (c) => {

// //   const result = await db.query.contacts.findMany({
// //     with: {
// //       emails: true,
// //       phones: true,
// //     },
// //   });


// //   return c.json({
// //     success: true,
// //     data: result,
// //   });
// // });


// // export default contactRoutes;


// import { Hono } from "hono";
// import { eq } from "drizzle-orm";

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
// contactRoutes.get("/", async (c) => {

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
// contactRoutes.get("/:id", async (c)=>{

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
// contactRoutes.post("/", async(c)=>{
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
// contactRoutes.post("/:id/emails", async(c)=>{


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
// contactRoutes.post("/:id/phones", async(c)=>{


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
// contactRoutes.get("/:id/emails", async(c)=>{


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
// contactRoutes.get("/:id/phones", async(c)=>{


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
// contactRoutes.put("/:id", async(c)=>{


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
// contactRoutes.delete("/:id", async(c)=>{


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


contactRoutes.post("/", async(c)=>{

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