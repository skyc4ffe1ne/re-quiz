export default function BackgroundReview() {
    return (
        <div style={styles.backgroundMain}>
            <div style={styles.backgroundContent} />
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    backgroundMain: {
        width: "100vw",
        minHeight: "100vh",
        position: "fixed",
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        padding: "120px 24px 160px 24px",
        pointerEvents: "none",
    },
    backgroundContent: {
        zIndex: 3,
        width: "100%",
        maxWidth: "1300px",
        backgroundImage: `
                      radial-gradient(at 40% 0%, hsla(0, 0%, 0%, 1) 0px, transparent 50%),
                      radial-gradient(at 97% 0%, hsla(0, 100%, 50%, 1) 0px, transparent 50%),
                      radial-gradient(at 10% 50%, hsla(0, 100%, 50%, 1) 0px, transparent 50%),
                      radial-gradient(at 33% 50%, hsla(0, 0%, 0%, 1) 0px, transparent 50%),
                      radial-gradient(at 79% 53%, hsla(0, 0%, 0%, 1) 0px, transparent 50%)`,
        position: "absolute",
        height: "100%",
        filter: "blur(100px) saturate(150%)",
        top: "80px",
        opacity: 0,
    },
};
