// src/app/page.tsx
import { TopNav } from "@/components/nav/TopNav";
import { RsvpForm } from "@/components/rsvp/RsvpForm";

export default function HomePage() {
  return (
    <>
      <div id="top" />
      <TopNav />

      <main className="mx-auto w-full max-w-6xl px-6 pt-28">
        {/* HERO */}
        <section className="flex min-h-[70vh] flex-col items-center justify-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            Confirmação de presença aberta
          </div>

          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-tight md:text-7xl">
            Meu aniversário de 40 anos!
            <br />
            <span className="text-violet-400">Sua presença importa.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base text-white/60 md:text-lg">
            Dia 21 de fevereiro. Um encontro pra celebrar, brindar e criar boas
            memórias juntos.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#rsvp"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Confirmar presença
            </a>

            <a
              href="#detalhes"
              className="text-sm text-white/60 transition hover:text-white"
            >
              Ver detalhes →
            </a>
          </div>
        </section>

        {/* DETALHES */}
        <section id="detalhes" className="scroll-mt-28 py-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-10">
            <h2 className="text-2xl font-semibold md:text-3xl">Detalhes</h2>
            <p className="mt-2 text-white/60">
              Tudo o que você precisa saber pra chegar e só ser feliz.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <InfoCard label="📅 Data" value="21 de fevereiro" />
              <InfoCard label="🕗 Horário" value="12:00" />
              <InfoCard
                label="📍 Local"
                value="To The Sea - Rua Haddock Lobo, 351 - Jardim Bela Vista, Santo André"
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#rsvp"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Confirmar presença
              </a>

              {/* GOOGLE MAPS */}
              <a
                href="https://www.google.com/maps/place/TO+THE+SEA/@-23.6605103,-46.538252,17z/data=!4m6!3m5!1s0x94ce42f3af358829:0xa9bf534fc913e256!8m2!3d-23.660661!4d-46.5383361!16s%2Fg%2F11b86xzvjs?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
              >
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section id="rsvp" className="scroll-mt-28 py-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-10">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Confirmar presença
            </h2>
            <p className="mt-2 text-white/60">
              Leva menos de 1 minuto. Prometo não colocar CAPTCHA 😄
            </p>

            <RsvpForm />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-28 py-16 pb-24">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-10">
            <h2 className="text-2xl font-semibold md:text-3xl">FAQ</h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <FaqCard
                q="O que vai ter pra comer?"
                a="Entradas de boteco e uma bela feijoada saborosa com guarnições de primeira."
              />
              <FaqCard
                q="E de bebida?"
                a="Água, refrigerante, suco, cerveja e caipirinha."
              />
              <FaqCard
                q="Tem valet?"
                a="Não tem, mas dá pra parar o carro tranquilo no local."
              />
              <FaqCard
                q="Você vai tocar aquelas músicas de louco?"
                a="SIMMM! E NINGUÉM VAI ME IMPEDIR!!!"
              />
              <FaqCard
                q="Devo levar presente?"
                a="Aceito meias e cuecas... a Priscila agradece!"
              />
              <FaqCard
                q="Até que horas vai o evento?"
                a="Até as 18h, então chegue cedo, ok!!!"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <div className="text-xs text-white/60">{label}</div>
      <div className="mt-2 text-sm font-medium text-white">{value}</div>
    </div>
  );
}

function FaqCard({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
      <div className="text-sm font-semibold text-white">{q}</div>
      <div className="mt-2 text-sm text-white/60">{a}</div>
    </div>
  );
}
