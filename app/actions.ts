"use server";

import { randomInt } from "node:crypto";
import { revalidatePath } from "next/cache";
import { postSchema } from "@/lib/validation";
import type { Post } from "@/lib/types";

export type CreatePostState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"title" | "body" | "authorName", string[]>>;
  post?: Post;
};

export async function createPost(
  _prevState: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> {
  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    authorName: formData.get("authorName"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Проверьте поля формы",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const userId = randomInt(1, 11);

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        title: parsed.data.title,
        body: parsed.data.body,
        userId,
      }),
    });

    if (!res.ok) {
      throw new Error(`JSONPlaceholder responded with ${res.status}`);
    }

    const created = (await res.json()) as { id?: number };

    revalidatePath("/");

    return {
      status: "success",
      message: "Пост успешно создан",
      post: {
        title: parsed.data.title,
        body: parsed.data.body,
        authorName: parsed.data.authorName,
        userId,
        id: created.id ?? Date.now(),
      },
    };
  } catch (error) {
    console.error("createPost failed:", error);
    return {
      status: "error",
      message: "Не удалось создать пост. Попробуйте ещё раз.",
    };
  }
}
