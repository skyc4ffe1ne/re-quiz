"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { useQuery } from "@tanstack/react-query";

import { usePathname } from "next/navigation";
import { getQuestions } from "./service";
import { PreviewQuizValues } from "@/lib/types";
import SkeletonQuiz from "@/components/SkeletonQuiz";

import Answers from "./Answers";
import { useQuiz } from "./QuizProvider";
import Link from "next/link";

export default function CarouselQuizName() {
    const { dispatch } = useQuiz();

    const pathname = usePathname();

    const { data, isPending, isFetching } = useQuery({
        queryKey: ["quiz-preview"],
        queryFn: () => getQuestions(pathname),
    });

    //  if (isPending) return <SkeletonQuiz type="big" />;
    if (isFetching) return <SkeletonQuiz type="big" />

    return (
        <div className="mt-10 flex w-full flex-col items-center justify-center">
            <Carousel className="mx-auto w-5/6">
                <CarouselContent>
                    {data.map((el: PreviewQuizValues) => (
                        <CarouselItem key={el.id}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="pb-4 text-xl font-medium"> {el.text} </h3>
                                        {el.answers.map((answer, idx) => (
                                            <Answers
                                                id={el.id}
                                                idx={idx}
                                                key={idx}
                                                answer={answer}
                                                correctAnswer={el.correctAnswer}
                                            />
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <Link href={`${pathname}/end`}>
                <Button
                    className="mt-20"
                    onClick={() => {
                        dispatch({
                            type: "finish",
                            status: "end",
                            payload: {
                                questionLength: data.length,
                                originalQuestions: data,
                            },
                        });
                    }}
                >
                    {" "}
                    Submit{" "}
                </Button>
            </Link>
        </div>
    );
}
