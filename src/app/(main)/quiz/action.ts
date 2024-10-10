"use server";

import prisma from "@/lib/prisma";

import { validateRequest } from "@/auth";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { json } from "stream/consumers";

import { questionSchema, questionValues } from "@/lib/validation";

export async function createQuestion(questions: questionValues) {
  //Checkare query urlparams per non creare un'altro id al quiz
  try {
    console.log(questions);

    const questionQuiz = questions.get("questionQuiz");
    const correctAnswer = questions.get("correctAnswer");
    const answer0 = questions.get("answer0");
    const answer1 = questions.get("answer1");

    const quest = { questionQuiz, correctAnswer, answer0, answer1 };
    const {
      questionQuiz: question,
      correctAnswer: correct,
      answer0: answer,
      answer1: answer2,
    } = questionSchema.parse(quest);

    console.log(question);
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong. Please try again",
    };
  }
  //  signUpSchema.parse(questionQuiz, correctAnswers, answers);

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
