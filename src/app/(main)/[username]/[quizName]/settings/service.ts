export async function getQuestionsSetting(currentPath: string) {
    try {
        console.log(currentPath)
        const res = await fetch(`http://localhost:3000/api${currentPath}`);
        if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);

        const json = await res.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}
