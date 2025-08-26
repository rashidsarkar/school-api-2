import { z } from "zod";

const createCustomerSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
    phone: z.string({
      required_error: "Phone number is required",
    }),
  }),
});
const updateCustomerSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    phone: z.string().optional(),
  }),
});

export const customerValidation = {
  createCustomerSchema,
  updateCustomerSchema,
};
