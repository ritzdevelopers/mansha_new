"use client";

/**
 * Must stay self-contained: Next.js prerenders /_global-error without the
 * root layout. No CSS modules, next/font, or providers here — those trigger
 * "Expected workStore to be initialized" on Next 16 production builds.
 */
export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf8f5",
          color: "#111111",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          role="alert"
          style={{
            width: "100%",
            maxWidth: 440,
            padding: 24,
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 500 }}>
            Something went wrong
          </h1>
          <p style={{ margin: "12px 0 0", color: "#515151", lineHeight: 1.6 }}>
            Please refresh the page or try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 24,
              padding: "12px 24px",
              border: 0,
              borderRadius: 8,
              background: "#652A27",
              color: "#ffffff",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
