import type { RouterContext } from "../deps.ts";
import db from "../utils/connectDB.ts";

interface UserWithRole {
  id: string;
  email: string;
  name: string;
  role: string;
}

// TODO implement cache read
const getMeController = async ({ state, response }: RouterContext<string>) => {
  try {
    const res = await db.queryObject<
      UserWithRole
    >`SELECT u.id, u.email, u.name, r.slug as role
    FROM users u
             LEFT JOIN user_roles r ON u.user_role_id = r.id
    WHERE enabled = true
      AND u.id = ${state.userId};`;
    db.release();

    if (res.rowCount != 1) {
      response.status = 401;
      response.body = {
        status: "fail",
        message: "the user belonging to provided token is no longer exists",
      };
      return;
    }

    response.status = 200;
    response.body = {
      status: "success",
      "x-hasura-role": res.rows[0].role,
      "x-hasura-id": res.rows[0].id,
      "cache-control": "max-age=20",
    };
  } catch (error) {
    response.status = 500;
    response.body = {
      status: "fail",
      message: error.message,
    };
    return;
  }
};

export default { getMeController };
