import { Suspense } from "react";
import { PostForm } from "@/components/post-form";
import { PostList, PostListSkeleton } from "@/components/post-list";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900">Посты</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Список из JSONPlaceholder (Server Component) и форма создания
          поста через Server Action с валидацией Zod.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-3 text-sm font-medium text-neutral-700">
          Новый пост
        </h2>
        <PostForm />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium text-neutral-700">
          Все посты
        </h2>
        <Suspense fallback={<PostListSkeleton />}>
          <PostList />
        </Suspense>
      </section>
    </main>
  );
}
