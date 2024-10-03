import type { User, Technique } from "@prisma/client";

import { prisma } from "~/db.server";

async function getDailySchedule({
    userId,
    date,
    }: {
    userId: User["id"];
    date: Date;
    }) {
        
})


export function getNoteListItems({ userId }: { userId: User["id"] }) {
    return prisma.note.findMany({
      where: { userId },
      select: { id: true, title: true },
      orderBy: { updatedAt: "desc" },
    });
  }