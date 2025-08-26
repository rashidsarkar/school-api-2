import { z } from "zod";

const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
    password_hash: z.string({
      required_error: "Password is required",
    }),
    role: z.enum(["ADMIN", "TEACHER", "STUDENT"], {
      required_error: "Role is required",
    }),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    password_hash: z.string().optional(),
    role: z.enum(["ADMIN", "TEACHER", "STUDENT"]).optional(),
  }),
});

export const userValidation = {
  createUserSchema,
  updateUserSchema,
};
