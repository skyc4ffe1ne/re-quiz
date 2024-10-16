export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full border flex justify-center items-center min-h-screen">
            {children}
        </main>
    );
}
