// import { Hono } from "hono";

// const app = new Hono();

// app.get("/api/hello", (c) => {
//   return c.json({
//     message: "Hello from Hono1",
//   });
// });

// export default app;

import { Hono } from "hono";

import contactRoutes from "./routes/contacts";
import { D1Database } from "@cloudflare/workers-types";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{
  Bindings: Bindings;
}>();

app.get("/api/hello", (c) => {
  return c.json({
    success: true,
    message: "Contact Management API is running",
  });
});



app.route("/api/contacts", contactRoutes);

//frontend route
app.get("*", async (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});
export default app;