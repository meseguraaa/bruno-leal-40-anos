// src/lib/actions/rsvp.ts
"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

function up(v: unknown) {
  return String(v ?? "")
    .trim()
    .toUpperCase();
}

const CreateRegistrationSchema = z.object({
  holderName: z.string().min(2),
  holderPhone: z.string().min(6),
  attendance: z.enum(["YES", "NO"]),
  qty: z.number().int().min(0).max(10),
  companions: z
    .array(
      z.object({
        name: z.string().min(1),
        phone: z.string().optional().default(""),
      })
    )
    .default([]),
});

export type RsvpActionState =
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function createRsvpAction(
  _prev: RsvpActionState,
  formData: FormData
): Promise<RsvpActionState> {
  try {
    const attendance = up(formData.get("attendance"));
    const qtyRaw = Number(formData.get("qty") ?? 0);
    const qty = Number.isFinite(qtyRaw) ? Math.trunc(qtyRaw) : 0;

    const companionsCount = Math.max(0, qty - 1);
    const companions = Array.from({ length: companionsCount }).map((_, i) => ({
      name: up(formData.get(`companion_${i}_name`)),
      phone: up(formData.get(`companion_${i}_phone`)),
    }));

    const input = CreateRegistrationSchema.parse({
      holderName: up(formData.get("name")),
      holderPhone: up(formData.get("phone")),
      attendance: attendance === "YES" ? "YES" : "NO",
      qty: attendance === "YES" ? qty : 0,
      companions: attendance === "YES" ? companions : [],
    });

    // Se a pessoa marcar "NÃO", hoje seu schema não tem onde guardar essa resposta.
    // Então, por enquanto, a gente não persiste e só retorna ok.
    if (input.attendance === "NO") {
      return { ok: true, message: "Tudo certo. Obrigado por avisar! 🙏" };
    }

    // Monta lista de guests: titular + acompanhantes
    const guestsToCreate = [
      {
        name: input.holderName,
        phone: input.holderPhone, // titular tem telefone
        role: "HOLDER" as const,
      },
      ...input.companions.map((c) => ({
        name: c.name,
        phone: c.phone || null, // convidados extras podem não ter
        role: "GUEST" as const,
      })),
    ];

    // Como holderPhone é UNIQUE, vamos fazer UPSERT:
    // - se já existe registro com esse telefone: atualiza nome, apaga guests antigos e recria
    // - se não existe: cria tudo
    await prisma.$transaction(async (tx) => {
      const existing = await tx.registration.findUnique({
        where: { holderPhone: input.holderPhone },
        select: { id: true },
      });

      if (!existing) {
        await tx.registration.create({
          data: {
            holderName: input.holderName,
            holderPhone: input.holderPhone,
            guests: {
              create: guestsToCreate,
            },
          },
        });
        return;
      }

      // Atualiza o Registration e substitui o grupo de Guests
      await tx.guest.deleteMany({
        where: { registrationId: existing.id },
      });

      await tx.registration.update({
        where: { holderPhone: input.holderPhone },
        data: {
          holderName: input.holderName,
          guests: {
            create: guestsToCreate,
          },
        },
      });
    });

    return { ok: true, message: "Presença confirmada! 🎉" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { ok: false, message: "Confira os campos e tente novamente." };
    }
    return { ok: false, message: "Erro ao enviar. Tente novamente." };
  }
}
