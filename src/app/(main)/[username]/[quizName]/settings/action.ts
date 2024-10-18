"use server";

import prisma from "@/lib/prisma";

import { validateRequest } from "@/auth";
import { generateIdFromEntropySize } from "lucia";

import { questionSchema, questionValues } from "@/lib/validation";

import { headers } from "next/headers";

export async function createQuestion(questions: questionValues) {
    const headersList = headers();
    const referer = headersList.get("referer");

    if (!referer) throw new Error("Create ur own quiz");

    try {
        const getNameQuiz = referer.match(/[^\/]+(?=\/settings)/);


        if (!getNameQuiz) throw new Error("Can't get quiz name");

        const { questionQuiz, correctAnswer, ...other } = questionSchema.parse(questions)

        const { user } = await validateRequest();

        if (!user) throw new Error("Unauthorized");

        const findQuiz = await prisma.quiz.findFirst({
            where: {
                name: {
                    equals: getNameQuiz[0],
                },
            },
        });

        if (!findQuiz) throw new Error("Create ur own quiz");

        const questionId = generateIdFromEntropySize(10);

        const answersArr = [
            other.answer0,
            other.answer1,
            other.answer2,
            other.answer3,
        ];

        const filterUndefinedAnswers = answersArr.filter((el) => el !== undefined);

        const newQuestion = await prisma.question.create({
            data: {
                id: questionId,
                quizId: findQuiz.id,
                text: questionQuiz,
                answers: JSON.stringify(filterUndefinedAnswers),
                correctAnswer: correctAnswer,
            },
        });

        const parsedQuestion = {
            ...newQuestion,
            answers: JSON.parse(newQuestion.answers),
        };

        return parsedQuestion;
    } catch (error) {
        console.error(error);
        return {
            error: "Something went wrong. Please try again",
        };
    }
}
