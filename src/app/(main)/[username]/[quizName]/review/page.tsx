"use client"

import { Check, X } from "lucide-react"
import { useQuiz } from "../QuizProvider"

export default function page() {

    const { state } = useQuiz()


    //    const stateWrongAnswers = [
    //        {
    //            answers: ['Creiamo un server', 'Creiamo una server action'],
    //            author: "fxf3irjfougljejf",
    //            correctAnswer: 1,
    //            id: "7guanmg4uulhholf",
    //            quizId: "iao2irtrnkkhbjzw",
    //            selectedAnswer: 0,
    //            text: "Cosa succede se inseriamo \"use server\" ?",
    //        }
    //    ]


    return (
        <div className="flex flex-col justify-center items-center my-20 gap-10">
            {state.wrongAnswers.length > 0 ? (
                state.wrongAnswers.map((el, idx) => (
                    <div key={el.id} className="border border-cardReviewBorder p-8 rounded-md w-2/3 bg-cardReview backdrop-blur">
                        <header className="flex gap-2">
                            <span className="text-xs text-muted-foreground tracking-wider"> {idx < 9 ? "0" + (idx + 1) : idx + 1}</span>
                            <h1 className="text-3xl font-medium tracking-tight mb-10">{el.text}</h1>
                        </header>
                        <div className="mb-8 flex gap-4 bg-green-400/10 px-3 py-1 items-center justify-between rounded-lg">
                            <p className="text-lg tracking-tight font-medium text-green-400"> {el.answers[el.correctAnswer]} </p>
                            <div className="flex items-center gap-2 w-fit rounded-full px-3 py-1">
                                <h4 className="leading-6 font-semibold text-xs text-green-400">Correct answer</h4>
                                <Check className="stroke-green-400" size={16} />
                            </div>
                        </div>

                        <div className="flex gap-4 bg-red-400/10 px-3 py-1 items-center justify-between rounded-lg">
                            <p className="text-lg tracking-tight font-medium text-red-400"> {el.answers[el.selectedAnswer] ?? "No answer"}  </p>
                            <div className="flex items-center gap-2 w-fit rounded-full px-3 py-1">
                                <h4 className="leading-6 font-semibold text-xs text-red-400">Your answer</h4>
                                <X className="stroke-red-400" size={16} />
                            </div>
                        </div>

                    </div>
                ))
            ) : null}
        </div>
    )
}
