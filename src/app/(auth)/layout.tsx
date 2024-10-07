export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="max-w-6xl flex justify-center items-center">
            {children}
        </main>
    );
}
