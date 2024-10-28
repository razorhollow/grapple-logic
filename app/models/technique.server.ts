import type { User, Technique } from "@prisma/client";

import { prisma } from "~/db.server";

// async function getDailySchedule({
//     userId,
//     date,
//     }: {
//     userId: User["id"];
//     date: Date;
//     }) {

// })

export function createTechnique({
    name,
    description,
    category,
    videoLink,
    lastIntroduced,
    userId,
}: Pick<Technique, "category" | "name" | "description" | "lastIntroduced" | "userId" | "videoLink"> & {
    userId: User["id"];
}) {
    return prisma.technique.create({
        data: {
            name,
            description,
            category,
            videoLink,
            lastIntroduced,
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });
}

export function getSchedule(
    userId: User["id"],
    lastClassDate: Date,
    lastWeek: Date,
    twoWeeks: Date,
    oneMonth: Date,
    twoMonths: Date
) {
    const shortenedLast = lastClassDate.toISOString().split('T')[0];
    const shortenedWeek = lastWeek.toISOString().split('T')[0];
    const shortenedTwoWeeks = twoWeeks.toISOString().split('T')[0];
    const shortenedOneMonth = oneMonth.toISOString().split('T')[0];
    const shortenedTwoMonths = twoMonths.toISOString().split('T')[0];

    return prisma.technique.findMany({
        where: {
            userId,
            OR: [
                {lastIntroduced: {equals: new Date(shortenedLast)}},
                {lastIntroduced: {equals: new Date(shortenedWeek)}},
                {lastIntroduced: {equals: new Date(shortenedTwoWeeks)}},
                {lastIntroduced: {equals: new Date(shortenedOneMonth)}},
                {lastIntroduced: {equals: new Date(shortenedTwoMonths)}},
            ]
        },

        select: { id: true, name: true, category: true, description: true, videoLink: true, lastIntroduced: true },
        orderBy: { lastIntroduced: "desc" },
    });
}

//create a function that gets all unique categories from the techniques table
export function getCategories() {
    return prisma.technique.findMany({
        select: { category: true },
        distinct: ['category'],
    });
}

export function getTechnique({
    id,
    userId,
}: Pick<Technique, "id"> & {
    userId: User["id"];
}) {
    return prisma.technique.findFirst({
        where: {
            id: id,
            userId,
        },
    });
}

//create a function that updates a technique's lastIntroduced date given the technique id, user id, and new date
export function recycleTechnique({
    id,
    userId,
    lastIntroduced,
}: Pick<Technique, "id" | "lastIntroduced"> & {
    userId: User["id"];
}) {
    return prisma.technique.update({
        where: {
            id,
            userId,
        },
        data: {
            lastIntroduced,
        },
    });
}

