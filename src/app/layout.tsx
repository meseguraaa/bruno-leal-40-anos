// src/app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css"; // mantenha esse caminho (o que funcionou aí)
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bruno Leal | 40 anos",
  description: "Confirmação de presença",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-dvh bg-black text-white antialiased">
        {/* Background */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          {/* Photo base */}
          <div className="absolute inset-0">
            <Image
              src="/me.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Darken base slightly (LESS than before to not kill the glow) */}
            <div className="absolute inset-0 bg-black/35" />
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(900px_650px_at_50%_25%,rgba(0,0,0,0.05),rgba(0,0,0,0.78))]" />
          </div>

          {/* Glows (forced blend + big blur) */}
          <div className="absolute inset-0">
            <div
              className="absolute -top-40 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full blur-3xl opacity-80"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(124,58,237,0.95), transparent 60%)",
                mixBlendMode: "screen",
              }}
            />
            <div
              className="absolute -left-48 top-10 h-[520px] w-[520px] rounded-full blur-3xl opacity-65"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.85), transparent 60%)",
                mixBlendMode: "screen",
              }}
            />
            <div
              className="absolute -right-48 bottom-10 h-[520px] w-[520px] rounded-full blur-3xl opacity-55"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(236,72,153,0.75), transparent 60%)",
                mixBlendMode: "screen",
              }}
            />
          </div>

          {/* Stars/texture (more visible) */}
          <div className="absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-size-[26px_26px]" />
        </div>

        <div className="relative flex min-h-dvh flex-col">{children}</div>
      </body>
    </html>
  );
}
