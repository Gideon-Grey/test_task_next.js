"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createPost, type CreatePostState } from "@/app/actions";
import type { Post } from "@/lib/types";

const initialCreatePostState: CreatePostState = { status: "idle" };

export function PostForm() {
  const [state, formAction, pending] = useActionState(
    createPost,
    initialCreatePostState,
  );
  const [localPosts, setLocalPosts] = useState<Post[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const lastHandledState = useRef(initialCreatePostState);

  useEffect(() => {
    if (
      state.status === "success" &&
      state.post &&
      state !== lastHandledState.current
    ) {
      lastHandledState.current = state;
      setLocalPosts((prev) => [state.post as Post, ...prev]);
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="space-y-6">
      <form
        ref={formRef}
        action={formAction}
        className="space-y-4 rounded-lg border border-neutral-200 p-5"
        noValidate
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Заголовок
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="О чём пост"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
            aria-invalid={Boolean(state.errors?.title)}
          />
          {state.errors?.title && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.title[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium">
            Текст
          </label>
          <textarea
            id="body"
            name="body"
            rows={4}
            placeholder="Содержание поста"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
            aria-invalid={Boolean(state.errors?.body)}
          />
          {state.errors?.body && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.body[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="authorName" className="block text-sm font-medium">
            Имя автора
          </label>
          <input
            id="authorName"
            name="authorName"
            type="text"
            placeholder="Как вас зовут"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
            aria-invalid={Boolean(state.errors?.authorName)}
          />
          {state.errors?.authorName && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.authorName[0]}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
          >
            {pending ? "Отправка…" : "Создать пост"}
          </button>
          {state.status === "success" && (
            <p className="text-sm text-green-700">{state.message}</p>
          )}
          {state.status === "error" && !state.errors && state.message && (
            <p className="text-sm text-red-600">{state.message}</p>
          )}
        </div>
      </form>

      {localPosts.length > 0 && (
        <div>
          <p className="text-sm text-neutral-500">
            Новые посты
          </p>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2">
            {localPosts.map((post, index) => (
              <li
                key={`${post.id}-${index}`}
                className="rounded-lg border border-dashed border-neutral-300 p-4"
              >
                <p className="text-xs text-neutral-500">
                  черновик · {post.authorName}
                </p>
                <h3 className="mt-1 font-medium capitalize">{post.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
