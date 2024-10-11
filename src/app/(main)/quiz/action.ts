"use server";

import prisma from "@/lib/prisma";

import { validateRequest } from "@/auth";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";

import { questionSchema, questionValues } from "@/lib/validation";

export async function createQuestion(questions: FormData) {
  //Checkare query urlparams per non creare un'altro id al quiz
  try {
    const { error, ...other } = questionSchema.safeParse({
      questionQuiz: questions.get("questionQuiz"),
      correctAnswer: questions.get("correctAnswer"),
      answer0: questions.get("answer0"),
      answer1: questions.get("answer1"),
    });

    if (error) {
      throw new Error("validate failed");
    }

    const { user } = await validateRequest();

    console.log(user);
    const quizId = generateIdFromEntropySize(10);
    await prisma.quiz.create({
      data: {
        id: quizId,
        userId: user.id,
      },
    });

    const questionId = generateIdFromEntropySize(10);
    //:TODO
    //Gestire bene questo, o non crea il modello question nel db (se ne hai 2 pusha 2.)
    const answersArr = [
      other.data?.answer0,
      other.data?.answer1,
      //     other.data?.answer2,
      //    other.data?.answer3,
    ];
    await prisma.question.create({
      data: {
        id: questionId,
        quizId,
        text: other.data?.questionQuiz,
        answers: JSON.stringify(answersArr),
        correctAnswer: other.data?.correctAnswer,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong. Please try again",
    };
  }

  //  const { user } = await validateRequest();
  //
  //  if (!user) {
  //    return redirect("/");
  //  }
  //
  //  const quizId = generateIdFromEntropySize(10);
  //  await prisma.quiz.create({
  //    data: {
  //      id: quizId,
  //      userId: user.id,
  //    },
  //  });
  //
  //  const questionId = generateIdFromEntropySize(10);
  //  await prisma.question.create({
  //    id: questionId,
  //    quizId,
  //    text: questionQuiz,
  //    answers: json(answers),
  //    correctAnswer,
  //})
}
