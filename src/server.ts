import config from "./config/default.ts";
import type { RouterContext } from "./deps.ts";
import { Application, oakCors, Router } from "./deps.ts";
import appRouter from "./routes/index.ts";
import logRequest from "./middleware/logger.ts";

const app = new Application();
const router = new Router();

// Health checker
router.get<string>("/api/healthz", (ctx: RouterContext<string>) => {
  ctx.response.status = 200;
  ctx.response.body = {
    status: "success",
    message: "Welcome to Deno",
  };
});

app.use(logRequest);

app.use(oakCors({
  origin: /^.+localhost:(3000|3001)$/, // FIXME what is that magical number for?
  optionsSuccessStatus: 200,
}));
appRouter.init(app);
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ port, secure }) => {
  console.info(
    `🚀 Server started on ${secure ? "https://" : "http://"}localhost:${port}`,
  );
});

const port = config.port;
app.listen({ port });
