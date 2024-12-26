'use server';

import db from '@/lib/db';
import type { Guestbook } from '@/types/guestbook';

export const getGuestbookEntries = async () => {
  const entries = await db.guestbook.findMany({
    include: {
      user: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  return (entries ?? []).map((entry) => ({
    id: entry.id.toString(),
    body: entry.body,
    createdAt: entry.created_at.toISOString(),
    user: {
      id: entry.user?.id!,
      name: entry.user?.name!,
      email: entry.user?.email!,
      image: entry.user?.image!,
    },
  })) satisfies Guestbook[];
};

export const addGuestbookEntry = async ({
  userId,
  message,
}: {
  userId: string;
  message: string;
}) => {
  await db.guestbook.create({
    data: {
      body: message,
      userId,
    },
  });
};

export const findEntryById = async (id: number) => {
  return await db.guestbook.findFirst({
    where: { id },
    select: { id: true, body: true, created_at: true, user: true },
  });
};

export const deleteEntry = async (id: number) => {
  await db.guestbook.delete({ where: { id } });
};
