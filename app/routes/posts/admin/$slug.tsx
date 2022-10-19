import cx from "classnames";
import invariant from "tiny-invariant";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import type { Maybe, Optional } from "~/global.types";
import type { Post } from "~/models/post.server";
import { getPost, updatePost, deletePost } from "~/models/post.server";

type ActionData = Optional<{
  title: Maybe<string>;
  slug: Maybe<string>;
  markdown: Maybe<string>;
}>;

export const action: ActionFunction = async ({ request, params }) => {
  // TODO: Remove timeout
  setTimeout(() => {}, 3000);
  const formData = await request.formData();

  const formIntent = formData.get("formIntent");

  if ("delete" === formIntent) {
    const slug = params?.slug;
    invariant(typeof slug === "string", "slug is required");

    await deletePost(slug);
  } else {
    const title = formData.get("title");
    const markdown = formData.get("markdown");
    const slug = formData.get("slug");

    const errors: ActionData = {
      title: title ? null : "Title is required",
      slug: slug ? null : "Slug is required",
      markdown: markdown ? null : "Markdown is required",
    };

    const hasErrors = Object.values(errors).some(
      (errorMessage) => errorMessage
    );

    if (hasErrors) {
      return json<ActionData>(errors);
    }

    invariant(typeof title === "string", "title must be a string");
    invariant(typeof slug === "string", "slug must be a string");
    invariant(typeof markdown === "string", "markdown must be a string");

    await updatePost({ title, slug, markdown });
  }

  return redirect("/posts/admin");
};

type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  return json<LoaderData>({ post });
};

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function UpdatePost() {
  const { post } = useLoaderData();

  const errors = useActionData();
  const transition = useTransition();
  const isSubmitting = Boolean(transition.submission);

  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          {errors?.title ? (
            <em className="text-red-600">{errors.title}</em>
          ) : null}
          <input
            type="text"
            name="title"
            className={cx(inputClassName, {
              "border-2 border-red-600": errors?.title,
            })}
            defaultValue={post?.title}
          />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          {errors?.slug ? (
            <em className="text-red-600">{errors.slug}</em>
          ) : null}
          <input
            className={cx(inputClassName, {
              "border-2 border-red-600": errors?.slug,
            })}
            type="text"
            name="slug"
            defaultValue={post?.slug}
          />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        {errors?.markdown ? (
          <em className="text-red-600">{errors.markdown}</em>
        ) : null}
        <br />
        <textarea
          className={cx(inputClassName, "font-mono", {
            "border-2 border-red-600": errors?.markdown,
          })}
          id="markdown"
          rows={20}
          name="markdown"
          defaultValue={post?.markdown}
        />
      </p>
      <div className="flex justify-between">
        <Form method="delete">
          <button
            type="submit"
            name="formIntent"
            disabled={isSubmitting}
            className="rounded bg-red-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
            value="delete"
          >
            {isSubmitting ? "Deleting post..." : "Delete"}
          </button>
        </Form>
        <button
          type="submit"
          name="formIntent"
          value="update"
          disabled={isSubmitting}
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          {isSubmitting ? "Updating post..." : "Update Post"}
        </button>
      </div>
    </Form>
  );
}
