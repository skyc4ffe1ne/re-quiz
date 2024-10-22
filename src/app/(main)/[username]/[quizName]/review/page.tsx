"use client"

import { useQuiz } from "../QuizProvider"

export default function page() {

    const { state } = useQuiz()

    console.log(state)

    return (
        <div className="border">
            {state.wrongAnswers.length > 0 ? (
                state.wrongAnswers.map((el) => (
                    <div key={el.id}>
                        <h3>{el.text}</h3>
                        <h4>Correct answer</h4>
                        <p> {el.answers[el.correctAnswer]} </p>
                        <h3>Your answer</h3>
                        <p> {el.answers[el.selectedAnswer] ?? "No answer"}  </p>
                    </div>
                ))
            ) : null}
        </div>
    )
}
