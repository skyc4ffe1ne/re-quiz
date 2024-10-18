import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function GET(req: NextRequest) {
    try {

        const { user } = await validateRequest();
        if (!user) throw new Error("Unauthorized");


        const pathname = req.nextUrl.pathname;


        const getQuizName = pathname.match(/\/api\/[^\/]+\/([^\/]+)/)

        if (!getQuizName) throw new Error("Can't get quiz name")

        const getQuiz = await prisma.quiz.findFirst({
            where: {
                name: {
                    equals: getQuizName[1],
                },
            },
        });

        if (!getQuiz) {
            return {
                error: "Quiz doesn't exist"
            }
        }

        const getQuestions = await prisma.question.findMany({
            where: {
                quizId: {
                    equals: getQuiz?.id,
                },
            },
        });

        const parsedQuestions = getQuestions.map((question) => ({
            ...question,
            answers: JSON.parse(question.answers),
        }));

        return NextResponse.json(parsedQuestions);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
