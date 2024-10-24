"use client"
import { createContext, useContext, useReducer } from "react";

const initialState = {
    answers: [],
    selectedAnswers: {},
    quizScore: {},
    wrongAnswers: []
};

type ACTIONTYPE =
    | {
        type: "choosedAnswer";
        payload: { idx: number; id: string; correctAnswer: number };
    }
    | {
        type: "finish";
        payload: { questionLength: number, originalQuestions: Array<object> };
    }
    | {
        type: "start";
        payload: null;
    }
    | {
        type: "review";
        payload: null;
    }
    ;
function reducer(state: typeof initialState, action: ACTIONTYPE) {

    switch (action.type) {
        case "choosedAnswer":

            const { idx: answerChoosed, id: answerId, correctAnswer } = action.payload;

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
                        correctAnswer,
                    },
                ],
                selectedAnswers: { ...state.selectedAnswers, [answerId]: answerChoosed }
            };
        case "finish":

            let correct = 1

            const finalScore = {
                correctAnswers: 0,
                correctAnswersId: []
            }


            for (let i = 0; i < state.answers.length; i++) {
                if (state.answers[i].answerChoosed === state.answers[i].correctAnswer) {
                    finalScore.correctAnswers = correct++
                    finalScore.correctAnswersId = [...finalScore.correctAnswersId, state.answers[i].answerId]
                }
            }

            return {
                ...state,
                quizScore: {
                    ...state.quizScore,
                    correctAnswer: finalScore.correctAnswers,
                    questionLength: action.payload.questionLength,
                    correctAnswersId: finalScore.correctAnswersId,
                    originalQuestions: action.payload.originalQuestions
                }
            }

        case "start":
            return {
                ...state,
                answers: initialState.answers,
                selectedAnswers: initialState.selectedAnswers,
                quizScore: initialState.quizScore,
                wrongAnswers: initialState.wrongAnswers
            }


        case "review":
            const getWrongAnswersId = state.quizScore.originalQuestions?.map((el) => {
                for (let i = 0; i < state.quizScore.correctAnswersId.length; i++) {
                    if (el.id === state.quizScore.correctAnswersId[i]) {
                        return undefined;
                    }
                }

                return { ...el, selectedAnswer: state.selectedAnswers[el.id] ?? null }
            }).filter((el) => el !== undefined)

            return {
                ...state,
                wrongAnswers: [...state.wrongAnswers, ...getWrongAnswersId]
            }

        default:
            throw new Error("Action doesn't exist")
    }
}



const QuizContext = createContext(initialState)


export function QuizProvider({ children }: Readonly<{
    children: React.ReactNode;
}>) {

    const [state, dispatch] = useReducer(reducer, initialState)


    return (
        <QuizContext.Provider value={{
            state,
            dispatch,
        }}>
            {children}
        </QuizContext.Provider>
    )
}



export function useQuiz() {
    const context = useContext(QuizContext)
    if (context === undefined) throw new Error("The context is used outside of the provider")
    return context
}


