import cx from "classnames";
import invariant from "tiny-invariant";

import { ActionFunction, redirect, json } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import type { Maybe, Optional } from "~/global.types";

import { createPost } from "~/models/post.server";
import { stringify } from "querystring";

type ActionData = Optional<{
  title: Maybe<string>;
  slug: Maybe<string>;
  markdown: Maybe<string>;
}>;

export const action: ActionFunction = async ({ request }) => {
  // TODO: remove me; fake delay to show loading/pending screen
  await new Promise((res) => setTimeout(res, 5000));
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: ActionData = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    markdown: markdown ? null : "Markdown is required",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof slug === "string", "slug must be a string");
  invariant(typeof markdown === "string", "markdown must be a string");

  await createPost({ title, slug, markdown });

  return redirect("/posts/admin");
};

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewPost() {
  const errors = useActionData();
  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

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
        />
      </p>
      <p className="text-right">
        <button
          type="submit"
          disabled={isCreating}
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          {isCreating ? "Creating post..." : "Create Post"}
        </button>
      </p>
    </Form>
  );
}
