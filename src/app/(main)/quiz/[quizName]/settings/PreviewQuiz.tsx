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
import SkeletonPreviewQuiz from "./SkeletonPreviewQuiz";
import EmptyPreviewQuiz from "./EmptyPreviewQuiz";

export default function PreviewQuiz() {
  const pathname = usePathname();

  const { data, isPending, status } = useQuery({
    queryKey: ["quiz-preview"],
    queryFn: () => getQuestions(pathname),
  });

  if (isPending) return <SkeletonPreviewQuiz />;
  if (status === "success" && !data.length) return <EmptyPreviewQuiz />;

  return (
    <div className="mx-auto radius-xl px-4 mt-10 w-1/2">
      <h3 className="text-lg tracking-tight text-primary mb-3">
        Preview quiz{" "}
      </h3>
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
                        className="w-full justify-start mb-2 font-normal text-base whitespace-normal h-auto text-left"
                      >
                        {" "}
                        {answer}{" "}
                      </Button>
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
    </div>
  );
}
