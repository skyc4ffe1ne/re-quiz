import { validateRequest } from "@/auth";

import prisma from "@/lib/prisma";
import { AllQuizValues } from "@/lib/types";

export async function getQuiz(): Promise<AllQuizValues[] | { error: string }> {
  try {
    const { user } = await validateRequest();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const takeQuizs = prisma.quiz.findMany({
      where: {
        userId: {
          equals: user.id,
        },
      },
    });

    if (!takeQuizs) {
      return {
        error: "You dont have any quiz",
      };
    }

    return takeQuizs;
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong!",
    };
  }
}
