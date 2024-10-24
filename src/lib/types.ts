export type PreviewQuizValues = {
    id: string;
    correctAnswer: number;
    quizId: string;
    text: string;
    answers: string[];
};

export type AllQuizValues = {
    id: string;
    name: string;
    description: string;
    userId: string;
    createdAt: Date;
};

export type QuizAllProps = {
    linkName: string;
    description: string;
    quizName: string;
};
