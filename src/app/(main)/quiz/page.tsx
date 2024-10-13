"use server";

import Link from "next/link";
import { getQuiz } from "./action";

export default async function Page() {
  const quizs = await getQuiz();

  return (
    <div className="w-full border  min-h-screen bg-primary">
      <header className="w-full bg-secondary my-2">
        <Link href="/quiz/new"> Create quiz </Link>
      </header>

      <div className="flex flex-col gap-5">
        {quizs.map((quiz) => (
          <div key={quiz.id} className="border-t">
            <Link
              href={`/quiz/${quiz.name}`}
              className="mb-2 text-lg tracking-tight font-normal text-primary-foreground hover:underline underline-offset-4"
            >
              {quiz.name}{" "}
            </Link>
            <p className="text-muted-foreground"> {quiz.description} </p>
          </div>
        ))}
      </div>
    </div>
  );
}
