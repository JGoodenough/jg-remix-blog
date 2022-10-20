import type { Post } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Post } from "@prisma/client";

export async function getPosts() {
  return prisma.post.findMany();
}

export async function getPost(slug?: string) {
  return prisma.post.findFirst({ where: { slug } });
}

export async function createPost(
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return prisma.post.create({ data: post });
}

export async function updatePost(
  post: Partial<Pick<Post, "slug" | "title" | "markdown">>
) {
  return prisma.post.update({ where: { slug: post.slug }, data: post });
}

export async function deletePost(slug?: string) {
  return prisma.post.delete({ where: { slug } });
}
