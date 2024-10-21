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

import { useReducer } from "react";
import Answers from "./Answers";

const initialState = {
    answers: [],
    selectedAnswers: {}
};

type ACTIONTYPE = {
    type: "choosedAnswer";
    payload: { idx: number; id: string };
};

function reducer(state: typeof initialState, action: ACTIONTYPE) {
    const { idx: answerChoosed, id: answerId } = action.payload;

    switch (action.type) {
        case "choosedAnswer":
            let getIndex: undefined | number;
            if (state.answers.length) {
                getIndex = state.answers.findIndex((el) => el.answerId === answerId);
            }

            if (getIndex !== -1 && getIndex !== undefined) {
                return {
                    ...state,
                    answers: state.answers.map((el, index) =>
                        index === getIndex
                            ? {
                                ...el,
                                answerChoosed:
                                    answerId === el.answerId ? answerChoosed : el.answerChoosed,
                            }
                            : el,
                    ),
                    selectedAnswers: { ...state.selectedAnswers, [answerId]: answerChoosed }
                };
            }
            return {
                ...state,
                answers: [
                    ...state.answers,
                    {
                        answerChoosed,
                        answerId,
                    },
                ],
                selectedAnswers: { ...state.selectedAnswers, [answerId]: answerChoosed }
            };
    }
}

export default function CarouselQuizName() {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log("state", state);
    const pathname = usePathname();

    const { data, isPending } = useQuery({
        queryKey: ["quiz-preview"],
        queryFn: () => getQuestions(pathname),
    });

    if (isPending) return <SkeletonQuiz type="big" />;

    return (
        <div className="mt-10 flex w-full items-center justify-center">
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
                                                dispatch={dispatch}
                                                state={state}
                                                answer={answer}
                                            />
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}{" "}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
