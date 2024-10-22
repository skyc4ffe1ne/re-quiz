"use server";
import { getQuiz } from "./action";
import { validateRequest } from "@/auth";

import { AllQuizValues } from "@/lib/types";

import QuizsAll from "./QuizsAll";
import QuizEmpty from "./QuizEmpty";
import QuizSidebar from "./QuizSidebar";

export default async function Page(
    props: {
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }
) {
    const searchParams = await props.searchParams;
    const quizs = await getQuiz();

    const { user } = await validateRequest()


    return (
        <div className="w-full min-h-screen">


            <div className="flex border-t">
                <QuizSidebar searchParams={searchParams} />
                <div className="flex-1">
                    {quizs.length ? (
                        quizs.map((quiz: AllQuizValues) => (
                            <QuizsAll
                                key={quiz.id}
                                quizName={quiz.name}
                                linkName={user?.username}
                                description={quiz.description}
                            />
                        ))
                    ) : (
                        <QuizEmpty />
                    )}
                </div>
            </div>
        </div>
    );
}
