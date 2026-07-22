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

export default app;