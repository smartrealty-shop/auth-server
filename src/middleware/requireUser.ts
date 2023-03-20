import config from "../config/default.ts";
import type { Context } from "../deps.ts";
import db from "../utils/connectDB.ts";
import { verifyJwt } from "../utils/jwt.ts";

interface User {
  id: string;
}

const requireUser = async (ctx: Context, next: () => Promise<unknown>) => {
  try {
    const headers: Headers = ctx.request.headers;
    const authorization = headers.get("Authorization");
    const cookieToken = await ctx.cookies.get("token");
    let token;

    if (authorization) {
      token = authorization.split(" ")[1];
    } else if (cookieToken) {
      token = cookieToken;
    }

    if (!token) {
      ctx.response.status = 401;
      ctx.response.body = {
        status: "fail",
        message: "You are not logged in",
      };
      return;
    }

    const decoded = await verifyJwt(token, config.jwtSecret);

    // TODO add caching layer with Google Cloud Memorystore
    const res = await db
      .queryObject<User>`SELECT id FROM users WHERE id = ${decoded.sub}`;
    db.release();

    if (res.rowCount != 1) {
      ctx.response.status = 401;
      ctx.response.body = {
        status: "fail",
        message: "the user belonging to provided token is no longer exists",
      };
      return;
    }

    // TODO figure out what it means /shrug
    ctx.state["userId"] = res.rows[0].id;
    await next();
    delete ctx.state.userId;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = {
      status: "fail",
      message: error.message,
    };
  }
};

export default requireUser;
