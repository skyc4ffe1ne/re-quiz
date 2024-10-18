"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { quizSchema, quizValues } from "@/lib/validation";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export async function createQuiz(values: quizValues) {
    try {
        const { quizName, description } = quizSchema.parse(values);

        const { user } = await validateRequest();

        if (!user) {
            throw new Error("Unauthorized");
        }

        const quizId = generateIdFromEntropySize(10);
        await prisma.quiz.create({
            data: {
                id: quizId,
                userId: user.id,
                name: quizName,
                description: description,
            },
        });

        return redirect(`/${user.username}/${quizName}/settings`);
    } catch (error) {
        console.error(error);
        if (isRedirectError(error)) throw error;
        return {
            error: "Something went wrong",
        };
    }
}
