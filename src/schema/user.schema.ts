import { z } from "../deps.ts";

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email or password"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Invalid email or password") // FIXME raise min to 8
      .max(32, "Password must be less than 32 characters"),
  }),
});

export type LoginUserInput = z.TypeOf<typeof loginUserSchema>["body"];
