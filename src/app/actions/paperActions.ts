"use server"

import { PrismaClient } from "../../generated/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const admins = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim());
  return admins.includes(email);
}

export async function getPapers({ includeDrafts = false }: { includeDrafts?: boolean } = {}) {
  return await prisma.paper.findMany({
    where: includeDrafts ? {} : { isDraft: false },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPaperById(id: number) {
  return await prisma.paper.findUnique({ where: { id } });
}

export async function createPaper({
  title,
  author,
  category,
  tags,
  content,
  isDraft = false,
}: {
  title: string;
  author: string;
  category: string;
  tags: string;
  content: string;
  isDraft?: boolean;
}) {
  const session = await getServerSession();
  if (!isAdmin(session?.user?.email)) {
    throw new Error("管理者のみ投稿可能です");
  }
  const paper = await prisma.paper.create({
    data: { title, author, category, tags, content, isDraft },
  });
  revalidatePath("/papers");
  return paper;
}

export async function updatePaper({
  id,
  title,
  author,
  category,
  tags,
  content,
  isDraft = false,
}: {
  id: number;
  title: string;
  author: string;
  category: string;
  tags: string;
  content: string;
  isDraft?: boolean;
}) {
  const session = await getServerSession();
  if (!isAdmin(session?.user?.email)) {
    throw new Error("管理者のみ編集可能です");
  }
  const paper = await prisma.paper.update({
    where: { id },
    data: { title, author, category, tags, content, isDraft },
  });
  revalidatePath("/papers");
  return paper;
}

export async function deletePaper(id: number) {
  const session = await getServerSession();
  if (!isAdmin(session?.user?.email)) {
    throw new Error("管理者のみ削除可能です");
  }
  await prisma.paper.delete({ where: { id } });
  revalidatePath("/papers");
} 