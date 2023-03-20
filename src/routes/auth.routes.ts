import authController from "../controllers/auth.controller.ts";
import { Router } from "../deps.ts";
import requireUser from "../middleware/requireUser.ts";
import validate from "../middleware/validate.ts";
import { loginUserSchema } from "../schema/user.schema.ts";

const router = new Router();

// User routes
router
  .post<string>(
    "/login",
    validate(loginUserSchema),
    authController.loginUserController,
  );

router
  .get<string>("/logout", requireUser, authController.logoutController);

export default router;
