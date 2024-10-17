export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full flex justify-center items-center min-h-screen">
            {children}
        </main>
    );
}
