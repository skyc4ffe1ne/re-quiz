"use client"
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

import SkeletonPreviewQuiz from "./settings/SkeletonPreviewQuiz";

export default function CarouselQuizName() {

    const pathname = usePathname();
    const { data, isPending } = useQuery({
        queryKey: ["quiz-preview"],
        queryFn: () => getQuestions(pathname),
    });


    if (isPending) return <SkeletonPreviewQuiz />

    return (

        <div className="flex w-full items-center justify-center mt-10">
            <Carousel className="w-5/6 mx-auto">
                <CarouselContent>
                    {data.map((el: PreviewQuizValues) => (
                        <CarouselItem key={el.id}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-medium pb-4"> {el.text} </h3>
                                        {el.answers.map((answer, idx) => (
                                            <Button
                                                variant="outline"
                                                key={idx}
                                                className="w-full justify-start mb-2 font-normal text-base"
                                            >
                                                {" "}
                                                {answer}{" "}
                                            </Button>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}  </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

    )
}
