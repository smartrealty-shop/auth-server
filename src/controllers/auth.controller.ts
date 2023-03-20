import type { RouterContext } from "../deps.ts";
import type { LoginUserInput } from "../schema/user.schema.ts";
import { comparePasswords } from "../utils/password.ts";
import { signJwt } from "../utils/jwt.ts";
import config from "../config/default.ts";
import db from "../utils/connectDB.ts";

interface UserResponse {
  id: string;
  email: string;
  password: string;
}

export const loginUserController = async (
  { request, response, cookies }: RouterContext<string>,
) => {
  try {
    const { email, password }: LoginUserInput = await request.body().value;

    const res = await db.queryObject<
      UserResponse
    >`SELECT id, email, password FROM users WHERE email = ${email}`;
    db.release();

    if (
      res.rowCount != 1 ||
      !(await comparePasswords(password, res.rows[0].password))
    ) {
      response.status = 401;
      response.body = {
        status: "fail",
        message: "Invalid email or password",
      };
      return;
    }

    const user = res.rows[0];

    const token = await signJwt({
      userId: String(user.id),
      expiresIn: config.jwtExpiresIn,
      secretKey: config.jwtSecret,
    });
    cookies.set("token", token, {
      expires: new Date(Date.now() + config.jwtExpiresIn * 60 * 1000),
      // maxAge: config.jwtExpiresIn * 60,
      httpOnly: true,
      secure: false,
    });

    response.status = 200;
    response.body = { status: "success", token };
  } catch (error) {
    response.status = 500;
    response.body = { status: "error", message: error.message };
    return;
  }
};

const logoutController = ({ response, cookies }: RouterContext<string>) => {
  cookies.set("token", "", {
    httpOnly: true,
    secure: false,
  });

  response.status = 200;
  response.body = { status: "success" };
};

export default { loginUserController, logoutController };
