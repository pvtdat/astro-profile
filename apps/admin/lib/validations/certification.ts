import { z } from "zod";

export const certificationSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  issuer: z.string().trim().min(1, "Issuer is required"),
  category: z.string().optional(),
  issue_date: z.string().optional(),
  credential_id: z.string().optional(),
  credential_url: z
    .string()
    .url("Enter a valid URL")
    .or(z.literal(""))
    .optional(),
  description: z.string().optional(),
  display_order: z.number().int("Display order must be an integer"),
  featured: z.boolean(),
  published: z.boolean(),
  image_url: z.string().optional(),
});

export type CertificationFormValues = z.infer<typeof certificationSchema>;
