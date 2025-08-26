import { z } from "zod";

const createClassSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Class name is required",
    }),
    section: z.string({
      required_error: "Section is required",
    }),
  }),
});

const updateClassSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    section: z.string().optional(),
  }),
});

export const classValidation = {
  createClassSchema,
  updateClassSchema,
};
