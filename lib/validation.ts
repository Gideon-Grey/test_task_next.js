import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Заголовок должен быть не короче 3 символов")
    .max(120, "Заголовок должен быть не длиннее 120 символов"),
  body: z
    .string()
    .trim()
    .min(10, "Текст поста должен быть не короче 10 символов")
    .max(2000, "Текст поста должен быть не длиннее 2000 символов"),
  authorName: z
    .string()
    .trim()
    .min(2, "Имя автора должно быть не короче 2 символов")
    .max(60, "Имя автора должно быть не длиннее 60 символов"),
});

export type PostInput = z.infer<typeof postSchema>;
