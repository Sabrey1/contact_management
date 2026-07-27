import { Hono } from "hono";
import { serve } from "@hono/node-server";

import contactRoutes from "./routes/contacts";
import roleRoutes from "./routes/role";
import userRoutes from "./routes/user";

const app = new Hono();

app.route("/api/contacts", contactRoutes);
app.route("/api/role", roleRoutes);
app.route("/api/user", userRoutes);

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("API running at http://localhost:3000");


// import { Hono } from "hono";
// import contactRoutes from "./routes/contacts";

// import type { D1Database } from "@cloudflare/workers-types";


// type Bindings = {
//   DB: D1Database;
// };


// const app = new Hono<{
//   Bindings: Bindings;
// }>();


// app.get("/api/hello", (c)=>{

//   return c.json({
//     success:true,
//     message:"Contact API running"
//   });

// });

// import { Hono } from "hono";
// import contactRoutes from "./routes/contacts";

// import type { D1Database } from "@cloudflare/workers-types";


// type Bindings = {
//   DB: D1Database;
// };


// const app = new Hono<{
//   Bindings: Bindings;
// }>();


// app.get("/api/hello", (c)=>{

//   return c.json({
//     success:true,
//     message:"Contact API running"
//   });

// });


// app.route(
//   "/api/contacts",
//   contactRoutes
// );


// export default app;
// app.route(
//   "/api/contacts",
//   contactRoutes
// );


// export default app;