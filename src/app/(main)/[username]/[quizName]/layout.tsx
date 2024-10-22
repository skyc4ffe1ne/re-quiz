import { QuizProvider } from "./QuizProvider";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QuizProvider>
            <div className="w-full">{children}</div>
        </QuizProvider>
    )
}
