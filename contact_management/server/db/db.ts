// // import Database from "better-sqlite3";
// // import { drizzle } from "drizzle-orm/better-sqlite3";

// // const sqlite = new Database("./sqlite.db");

// // export const db = drizzle(sqlite);

// import Database from "better-sqlite3";
// import { drizzle } from "drizzle-orm/better-sqlite3";

// import * as schema from "./schema";

// const sqlite = new Database("sqlite.db");

// export const db = drizzle(sqlite, {
//   schema,
// });


import { drizzle } from "drizzle-orm/d1";

export function getDB(env:any){
  return drizzle(env.DB);
}