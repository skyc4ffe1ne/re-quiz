
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function GET(req: NextRequest) {
    try {

        const { user } = await validateRequest();
        if (!user) throw new Error("Unauthorized");


        const pathName = req.nextUrl.pathname;


        const getQuizName = pathName.match(/(?<=\/quiz\/)[^\/]+/);


        const getQuiz = await prisma.quiz.findFirst({
            where: {
                name: {
                    equals: getQuizName[0],
                },
            },
            select: {
                id: true,
                userId: true
            }
        });



        if (!getQuiz) {
            return {
                error: "Quiz doesn't exist"
            }
        }

        if (getQuiz.userId !== user.id) throw new Error("Unauthorized");


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
