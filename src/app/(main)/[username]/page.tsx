"use server";

import Link from "next/link";
import { getQuiz } from "./action";

import { AllQuizValues } from "@/lib/types";
import QuizsAll from "./QuizsAll";
import QuizEmpty from "./QuizEmpty";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/auth";

export default async function Page() {
    const quizs = await getQuiz();

    const { user } = await validateRequest()

    return (
        <div className="w-full min-h-screen">
            <header className="w-full  my-2  flex justify-end py-2 px-4">
                <Button asChild>
                    <Link href="/new"> New quiz </Link>
                </Button>
            </header>

            <div>
                {quizs.length ? (
                    quizs.map((quiz: AllQuizValues) => (
                        <QuizsAll
                            key={quiz.id}
                            quizName={quiz.name}
                            linkName={user.username}
                            description={quiz.description}
                        />
                    ))
                ) : (
                    <QuizEmpty />
                )}
            </div>
        </div>
    );
}
