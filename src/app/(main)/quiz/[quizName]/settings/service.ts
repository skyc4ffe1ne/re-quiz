export async function getQuestions(currentPath: string) {
    try {

        const getNameQuiz = currentPath.match(/(?<=\/quiz\/)[^\/]+/);
        const res = await fetch(`http://localhost:3000/api/quiz/${getNameQuiz[0]}`);
        if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);
        const json = await res.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}
