"use client";
export default function Login() {
  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <h1>Faça login com o Spotify</h1>
      <button
        onClick={handleLogin}
        style={{
          padding: "12px 32px",
          fontSize: "18px",
          borderRadius: "8px",
          background: "#1DB954",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          marginTop: "32px",
        }}
      >
        Login com Spotify
      </button>
    </div>
  );
}
