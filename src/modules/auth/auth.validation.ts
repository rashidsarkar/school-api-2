import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6).max(100),
  }),
});

export const authValidation = {
  loginValidationSchema,
};
