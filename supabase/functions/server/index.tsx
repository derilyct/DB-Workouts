import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-b20622c7/health", (c) => {
  return c.json({ status: "ok" });
});

// --- Auth routes ---

// Sign in: POST { username, password }
app.post("/make-server-b20622c7/auth/signin", async (c) => {
  try {
    const { username, password } = await c.req.json();
    if (!username || !password) {
      return c.json({ error: "Username and password are required." }, 400);
    }
    const userKey = `user:${username.toLowerCase()}`;
    const user = await kv.get(userKey);
    if (!user) {
      return c.json({ error: "No account exists. Please create one." }, 404);
    }
    if (user.password !== password) {
      return c.json({ error: "No account exists. Please create one." }, 401);
    }
    return c.json({ status: "ok", username: user.username });
  } catch (err) {
    console.log("Error during sign in:", err);
    return c.json({ error: `Sign in failed: ${err}` }, 500);
  }
});

// Create account: POST { username, password }
app.post("/make-server-b20622c7/auth/create", async (c) => {
  try {
    const { username, password } = await c.req.json();
    if (!username || !password) {
      return c.json({ error: "Username and password are required." }, 400);
    }
    const userKey = `user:${username.toLowerCase()}`;
    const existing = await kv.get(userKey);
    if (existing) {
      return c.json({ error: "That login already exists." }, 409);
    }
    await kv.set(userKey, { username: username.toLowerCase(), password });
    return c.json({ status: "ok", username: username.toLowerCase() });
  } catch (err) {
    console.log("Error creating account:", err);
    return c.json({ error: `Account creation failed: ${err}` }, 500);
  }
});

// --- Per-user workout data helpers ---
function userKeys(username: string) {
  const prefix = `data:${username}:`;
  return {
    previous: `${prefix}previous`,
    names: `${prefix}names`,
    tabNames: `${prefix}tab-names`,
    tabs: `${prefix}tabs-structure`,
  };
}

// GET all workout data for a user
app.get("/make-server-b20622c7/workout-data", async (c) => {
  try {
    const username = c.req.query("user");
    if (!username) {
      return c.json({ error: "Missing user query param" }, 400);
    }
    const keys = userKeys(username);
    const [previousValues, exerciseNames, tabNames, tabsStructure] = await Promise.all([
      kv.get(keys.previous),
      kv.get(keys.names),
      kv.get(keys.tabNames),
      kv.get(keys.tabs),
    ]);
    return c.json({
      previousValues: previousValues ?? null,
      exerciseNames: exerciseNames ?? null,
      tabNames: tabNames ?? null,
      tabsStructure: tabsStructure ?? null,
    });
  } catch (err) {
    console.log("Error fetching workout data:", err);
    return c.json({ error: `Failed to fetch workout data: ${err}` }, 500);
  }
});

// PUT save previous values
app.put("/make-server-b20622c7/workout-data/previous", async (c) => {
  try {
    const body = await c.req.json();
    const username = c.req.query("user");
    if (!username) return c.json({ error: "Missing user query param" }, 400);
    const keys = userKeys(username);
    await kv.set(keys.previous, body.previousValues);
    return c.json({ status: "ok" });
  } catch (err) {
    console.log("Error saving previous values:", err);
    return c.json({ error: `Failed to save previous values: ${err}` }, 500);
  }
});

// PUT save exercise names
app.put("/make-server-b20622c7/workout-data/names", async (c) => {
  try {
    const body = await c.req.json();
    const username = c.req.query("user");
    if (!username) return c.json({ error: "Missing user query param" }, 400);
    const keys = userKeys(username);
    await kv.set(keys.names, body.exerciseNames);
    return c.json({ status: "ok" });
  } catch (err) {
    console.log("Error saving exercise names:", err);
    return c.json({ error: `Failed to save exercise names: ${err}` }, 500);
  }
});

// PUT save tab names
app.put("/make-server-b20622c7/workout-data/tab-names", async (c) => {
  try {
    const body = await c.req.json();
    const username = c.req.query("user");
    if (!username) return c.json({ error: "Missing user query param" }, 400);
    const keys = userKeys(username);
    await kv.set(keys.tabNames, body.tabNames);
    return c.json({ status: "ok" });
  } catch (err) {
    console.log("Error saving tab names:", err);
    return c.json({ error: `Failed to save tab names: ${err}` }, 500);
  }
});

// PUT save tabs structure
app.put("/make-server-b20622c7/workout-data/tabs-structure", async (c) => {
  try {
    const body = await c.req.json();
    const username = c.req.query("user");
    if (!username) return c.json({ error: "Missing user query param" }, 400);
    const keys = userKeys(username);
    await kv.set(keys.tabs, body.tabsStructure);
    return c.json({ status: "ok" });
  } catch (err) {
    console.log("Error saving tabs structure:", err);
    return c.json({ error: `Failed to save tabs structure: ${err}` }, 500);
  }
});

// PUT save all workout data at once (bulk save)
app.put("/make-server-b20622c7/workout-data", async (c) => {
  try {
    const body = await c.req.json();
    const username = c.req.query("user");
    if (!username) return c.json({ error: "Missing user query param" }, 400);
    const uKeys = userKeys(username);
    const keys: string[] = [];
    const values: any[] = [];

    if (body.previousValues !== undefined) {
      keys.push(uKeys.previous);
      values.push(body.previousValues);
    }
    if (body.exerciseNames !== undefined) {
      keys.push(uKeys.names);
      values.push(body.exerciseNames);
    }
    if (body.tabNames !== undefined) {
      keys.push(uKeys.tabNames);
      values.push(body.tabNames);
    }
    if (body.tabsStructure !== undefined) {
      keys.push(uKeys.tabs);
      values.push(body.tabsStructure);
    }

    if (keys.length > 0) {
      await kv.mset(keys, values);
    }
    return c.json({ status: "ok" });
  } catch (err) {
    console.log("Error saving workout data:", err);
    return c.json({ error: `Failed to save workout data: ${err}` }, 500);
  }
});

Deno.serve(app.fetch);
