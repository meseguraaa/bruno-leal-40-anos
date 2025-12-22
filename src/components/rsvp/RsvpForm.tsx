// src/components/rsvp/RsvpForm.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useActionState } from "react";
import { createRsvpAction, type RsvpActionState } from "@/lib/actions/rsvp";

type Companion = {
  name: string;
  phone: string; // guardamos só dígitos
};

function clampInt(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, Math.trunc(value)));
}

function onlyNameChars(value: string) {
  return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function maskPhone(value?: string) {
  const digits = String(value ?? "")
    .replace(/\D/g, "")
    .slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const initialState: RsvpActionState = { ok: false, message: "" };

export function RsvpForm() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [qty, setQty] = useState<number>(1);

  // telefone do titular (guardamos só dígitos)
  const [holderPhone, setHolderPhone] = useState<string>("");

  const companionCount = useMemo(() => Math.max(0, qty - 1), [qty]);
  const [companions, setCompanions] = useState<Companion[]>([]);

  const [state, action, pending] = useActionState(
    createRsvpAction,
    initialState,
  );

  // Keep companions array length in sync
  useEffect(() => {
    setCompanions((prev) => {
      const next = [...prev];

      if (next.length < companionCount) {
        while (next.length < companionCount) next.push({ name: "", phone: "" });
      } else if (next.length > companionCount) {
        next.length = companionCount;
      }

      return next;
    });
  }, [companionCount]);

  function updateCompanion(index: number, patch: Partial<Companion>) {
    setCompanions((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...patch };
      return next;
    });
  }

  // ✅ Ajuste 1: reset automático ao salvar
  useEffect(() => {
    if (!state.ok) return;

    // reseta inputs não-controlados (ex: name)
    formRef.current?.reset();

    // reseta states controlados
    setHolderPhone("");
    setQty(1);
    setCompanions([]);
  }, [state.ok]);

  const fieldClass =
    "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-violet-400 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <form
      ref={formRef}
      action={action}
      className="mt-8 grid gap-5 rounded-2xl border border-white/10 bg-black/30 p-5 md:grid-cols-2"
    >
      {/* Always YES */}
      <input type="hidden" name="attendance" value="YES" />

      {/* Feedback */}
      {state.message ? (
        <div
          className={[
            "md:col-span-2 rounded-2xl border p-4 text-sm",
            state.ok
              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
              : "border-rose-400/20 bg-rose-400/10 text-rose-200",
          ].join(" ")}
        >
          {state.message}
        </div>
      ) : null}

      {/* Nome (holder) */}
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-white/60">Nome</label>
        <input
          name="name"
          required
          disabled={pending}
          placeholder="Seu nome completo"
          inputMode="text"
          onChange={(e) => {
            e.currentTarget.value = onlyNameChars(e.currentTarget.value);
          }}
          className={`${fieldClass} uppercase`}
        />
      </div>

      {/* WhatsApp (holder) */}
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-white/60">
          WhatsApp (obrigatório)
        </label>

        {/* VISUAL mascarado */}
        <input
          disabled={pending}
          inputMode="numeric"
          placeholder="(11) 98765-4321"
          value={maskPhone(holderPhone)}
          onChange={(e) => setHolderPhone(onlyDigits(e.target.value))}
          className={fieldClass}
        />

        {/* VALOR REAL (só dígitos) enviado na action */}
        <input name="phone" type="hidden" value={holderPhone} />
      </div>

      {/* Quantidade */}
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-white/60">
          Quantas pessoas?{" "}
          <span className="text-white/40">(incluindo você)</span>
        </label>

        {/* Stepper */}
        <div className="mt-2 flex items-center gap-3">
          <button
            type="button"
            disabled={pending || qty <= 1}
            onClick={() => setQty((q) => clampInt(q - 1, 1, 10))}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-white/80 hover:bg-black/55 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Diminuir quantidade"
          >
            -
          </button>

          <div className="flex h-12 flex-1 items-center justify-center rounded-xl border border-white/10 bg-black/40 px-4 text-base font-semibold text-white">
            {qty}
          </div>

          <button
            type="button"
            disabled={pending || qty >= 10}
            onClick={() => setQty((q) => clampInt(q + 1, 1, 10))}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-white/80 hover:bg-black/55 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Aumentar quantidade"
          >
            +
          </button>
        </div>

        {/* Valor real enviado na action */}
        <input name="qty" type="hidden" value={qty} />
      </div>

      {/* Companion fields */}
      {companionCount > 0 && (
        <div className="md:col-span-2">
          <div className="mt-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Acompanhantes ({companionCount})
            </h3>
          </div>

          <div className="mt-4 grid gap-4">
            {companions.map((c, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-black/25 p-4"
              >
                <div className="mb-3 text-xs font-medium text-white/70">
                  Acompanhante {idx + 1}
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs text-white/60">
                      Nome
                    </label>
                    <input
                      name={`companion_${idx}_name`}
                      required
                      disabled={pending}
                      value={c.name}
                      inputMode="text"
                      onChange={(e) =>
                        updateCompanion(idx, {
                          name: onlyNameChars(e.target.value),
                        })
                      }
                      placeholder="Nome do acompanhante"
                      className={`${fieldClass} uppercase`}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-white/60">
                      WhatsApp
                    </label>

                    {/* VISUAL mascarado */}
                    <input
                      disabled={pending}
                      inputMode="numeric"
                      placeholder="(11) 98765-4321"
                      value={maskPhone(c.phone)}
                      onChange={(e) =>
                        updateCompanion(idx, {
                          phone: onlyDigits(e.target.value),
                        })
                      }
                      className={fieldClass}
                    />

                    {/* VALOR REAL enviado */}
                    <input
                      name={`companion_${idx}_phone`}
                      type="hidden"
                      value={c.phone}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      <div className="md:col-span-2 mt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {pending ? "Enviando..." : "Confirmar presença"}
        </button>
      </div>
    </form>
  );
}
