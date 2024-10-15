"use server";

import prisma from "@/lib/prisma";

import { validateRequest } from "@/auth";
import { generateIdFromEntropySize } from "lucia";

import { questionSchema } from "@/lib/validation";

import { headers } from "next/headers";

export async function createQuestion(questions: FormData) {
  const headersList = headers();
  const referer = headersList.get("referer");

  if (!referer) throw new Error("Create ur own quiz");

  const getNameQuiz = referer.match(/(?<=quiz\/).+/);

  if (!getNameQuiz) throw new Error("Something went wrong");

  try {
    const { error, ...other } = questionSchema.safeParse({
      questionQuiz: questions.get("questionQuiz"),
      correctAnswer: questions.get("correctAnswer"),
      answer0: questions.get("answer0"),
      answer1: questions.get("answer1"),
      answer2: questions.get("answer2") ?? undefined,
      answer3: questions.get("answer3") ?? undefined,
    });

    if (error) {
      console.error(error);
      throw new Error("validation failed");
    }

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
      other.data?.answer0,
      other.data?.answer1,
      other.data?.answer2,
      other.data?.answer3,
    ];

    const filterUndefinedAnswers = answersArr.filter((el) => el !== undefined);

    const newQuestion = await prisma.question.create({
      data: {
        id: questionId,
        quizId: findQuiz.id,
        text: other.data.questionQuiz,
        answers: JSON.stringify(filterUndefinedAnswers),
        correctAnswer: other.data.correctAnswer,
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
