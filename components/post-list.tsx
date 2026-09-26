import type { Post } from "@/lib/types";

async function getPosts(): Promise<Post[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=12",
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to load posts: ${res.status}`);
  }

  return res.json();
}

export async function PostList() {
  const posts = await getPosts();

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {posts.map((post) => (
        <li
          key={post.id}
          className="rounded-lg border border-neutral-200 p-4"
        >
          <p className="text-xs text-neutral-500">
            #{post.id} · автор {post.userId}
          </p>
          <h3 className="mt-1 line-clamp-2 font-medium capitalize">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-neutral-600">
            {post.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function PostListSkeleton() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <li
          key={i}
          className="h-28 animate-pulse rounded-lg border border-neutral-200 bg-neutral-100"
        />
      ))}
    </ul>
  );
}
