import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.get("/", serveStatic({ path: "../../mkchat/web/pages/home/index.html" }));
app.get("/chat", serveStatic({ path: "../../mkchat/web/pages/chat/index.html" }));

app.use("/static/*", serveStatic({ root: "../../mkchat/web" }));

export default {
    port: 4000,
    fetch: app.fetch
};
