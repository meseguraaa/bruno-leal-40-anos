// src/app/convidados/page.tsx
import { prisma } from "@/lib/prisma";

// 🔁 Atualiza automaticamente a cada 5 segundos
export const revalidate = 5;

export const metadata = {
  title: "Convidados confirmados",
  robots: { index: false, follow: false },
};

export default async function ConvidadosPage() {
  const guests = await prisma.guest.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: [{ name: "asc" }],
  });

  const total = guests.length;

  return (
    <main className="mx-auto w-full max-w-4xl px-6 pt-16 pb-24">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/80 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          Lista de confirmados
        </div>

        <h1 className="text-balance text-3xl font-semibold leading-tight md:text-5xl">
          Convidados confirmados
          <br />
          <span className="text-violet-400">{total} pessoa(s)</span>
        </h1>

        <p className="mt-4 max-w-2xl text-pretty text-sm text-white/60 md:text-base">
          Atualiza automaticamente. Ordem alfabética. Sem frescura.
        </p>

        <div className="mt-8 space-y-2">
          {guests.map((g, idx) => (
            <div
              key={g.id}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 p-4"
            >
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white/70">
                {idx + 1}
              </span>
              <div className="text-sm font-medium text-white">{g.name}</div>
            </div>
          ))}

          {guests.length === 0 && (
            <div className="text-white/60">Ainda ninguém confirmou.</div>
          )}
        </div>
      </section>
    </main>
  );
}
