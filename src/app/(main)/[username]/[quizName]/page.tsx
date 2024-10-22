import { isAuthor } from "./isAuthor";


import CarouselQuizName from "./CarouselQuizName";
import HeaderQuizName from "./HeaderQuizName";
export default async function Page(props: { params: Promise<{ username: string, quizName: string }> }) {
    const params = await props.params;

    const checkAuthor = await isAuthor(params)

    return (
        <div className="mx-auto max-w-6xl">
            <HeaderQuizName checkAuthor={checkAuthor} />
            <CarouselQuizName />
        </div>
    );
}
