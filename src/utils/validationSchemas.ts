import { z } from "zod";

export const LoginSchema = z.object({
    email: z.email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

export const ProjectSchema = z.object({
    title: z.string()
        .min(4, "Tilte must contain at least 4 characters")
        .max(100, "Title should be less than 100 characters"),
    content: z.string()
        .min(8, "content must contain at least 8 characters")
        .max(200, "content should be less than 200 characters"),
});

export const SkillCategorySchema = z.object({
    name: z.string()
        .min(3, "Tilte must contain at least 3 characters")
        .max(100, "Title should be less than 100 characters"),
})

export const SkillSchema = z.object({
    name: z.string()
        .min(3, "Tilte must contain at least 3 characters")
        .max(100, "Title should be less than 100 characters"),
})