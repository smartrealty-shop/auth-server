import type { Context } from "../deps.ts";

const logRequest = async (ctx: Context, next: () => Promise<unknown>) => {
  await next();

  console.log(
    `${ctx.request.method} (${ctx.response.status}) -- ${ctx.request.url.pathname}${ctx.request.url.search}`,
  );
};

export default logRequest;
