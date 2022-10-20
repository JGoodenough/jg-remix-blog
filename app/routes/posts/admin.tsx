import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useTransition } from "@remix-run/react";
import type { Post } from "@prisma/client";
import { getPosts } from "~/models/post.server";
import { requireUser } from "~/session.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireUser(request);

  return json({ posts: await getPosts() });
};

export default function AdminIndex() {
  const { posts } = useLoaderData();
  const transition = useTransition();

  if (transition.submission) {
    const newPost = Object.fromEntries(transition.submission.formData);
    const hasNewPost = posts.find((post: Post) => post.slug === newPost.slug);
    if (!hasNewPost) {
      posts.push(Object.fromEntries(transition.submission.formData));
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">Blog Admin</h1>
      <div className="grid grid-cols-4 gap-6">
        <nav className="col-span-4 md:col-span-1">
          <ul>
            {posts.map((post: Post, index: number) => (
              <li key={index}>
                <Link to={post.slug} className="text-blue-600 underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="col-span-4 md:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
