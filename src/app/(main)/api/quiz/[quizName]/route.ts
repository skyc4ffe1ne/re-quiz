import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const pathName = req.nextUrl.pathname;

    const getQuizName = pathName.match(/(?<=quiz\/).+/);

    const getQuiz = await prisma.quiz.findFirst({
      where: {
        name: {
          equals: getQuizName[0],
        },
      },
    });

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
