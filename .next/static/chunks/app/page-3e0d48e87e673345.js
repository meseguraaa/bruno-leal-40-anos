(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [974],
  {
    3764: (e, t, a) => {
      Promise.resolve().then(a.bind(a, 4808));
    },
    4808: (e, t, a) => {
      "use strict";
      a.d(t, { RsvpForm: () => m });
      var s = a(5155),
        l = a(2115),
        n = a(9339);
      let r = (0, n.createServerReference)(
        "60ffabf774293b4c89356a513c877f036bbd33ecbc",
        n.callServer,
        void 0,
        n.findSourceMapURL,
        "createRsvpAction",
      );
      function i(e) {
        return e.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
      }
      function c(e) {
        return e.replace(/\D/g, "");
      }
      function d(e) {
        let t = String(e ?? "")
          .replace(/\D/g, "")
          .slice(0, 11);
        return t.length <= 2
          ? t
          : t.length <= 7
            ? `(${t.slice(0, 2)}) ${t.slice(2)}`
            : `(${t.slice(0, 2)}) ${t.slice(2, 7)}-${t.slice(7)}`;
      }
      let o = { ok: !1, message: "" };
      function m() {
        let e = (0, l.useRef)(null),
          [t, a] = (0, l.useState)(1),
          [n, m] = (0, l.useState)(""),
          u = (0, l.useMemo)(() => Math.max(0, t - 1), [t]),
          [p, h] = (0, l.useState)([]),
          [x, b, v] = (0, l.useActionState)(r, o);
        function f(e, t) {
          h((a) => {
            let s = [...a];
            return ((s[e] = { ...s[e], ...t }), s);
          });
        }
        ((0, l.useEffect)(() => {
          h((e) => {
            let t = [...e];
            if (t.length < u)
              for (; t.length < u; ) t.push({ name: "", phone: "" });
            else t.length > u && (t.length = u);
            return t;
          });
        }, [u]),
          (0, l.useEffect)(() => {
            x.ok && (e.current?.reset(), m(""), a(1), h([]));
          }, [x.ok]));
        let g =
          "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-violet-400 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed";
        return (0, s.jsxs)("form", {
          ref: e,
          action: b,
          className:
            "mt-8 grid gap-5 rounded-2xl border border-white/10 bg-black/30 p-5 md:grid-cols-2",
          children: [
            (0, s.jsx)("input", {
              type: "hidden",
              name: "attendance",
              value: "YES",
            }),
            x.message
              ? (0, s.jsx)("div", {
                  className: [
                    "md:col-span-2 rounded-2xl border p-4 text-sm",
                    x.ok
                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                      : "border-rose-400/20 bg-rose-400/10 text-rose-200",
                  ].join(" "),
                  children: x.message,
                })
              : null,
            (0, s.jsxs)("div", {
              className: "md:col-span-2",
              children: [
                (0, s.jsx)("label", {
                  className: "mb-1 block text-xs text-white/60",
                  children: "Nome",
                }),
                (0, s.jsx)("input", {
                  name: "name",
                  required: !0,
                  disabled: v,
                  placeholder: "Seu nome completo",
                  inputMode: "text",
                  onChange: (e) => {
                    e.currentTarget.value = i(e.currentTarget.value);
                  },
                  className: `${g} uppercase`,
                }),
              ],
            }),
            (0, s.jsxs)("div", {
              className: "md:col-span-2",
              children: [
                (0, s.jsx)("label", {
                  className: "mb-1 block text-xs text-white/60",
                  children: "WhatsApp (obrigat\xf3rio)",
                }),
                (0, s.jsx)("input", {
                  disabled: v,
                  inputMode: "numeric",
                  placeholder: "(11) 98765-4321",
                  value: d(n),
                  onChange: (e) => m(c(e.target.value)),
                  className: g,
                }),
                (0, s.jsx)("input", {
                  name: "phone",
                  type: "hidden",
                  value: n,
                }),
                (0, s.jsx)("p", {
                  className: "mt-2 text-xs text-white/40",
                  children:
                    "Usamos seu n\xfamero s\xf3 pra evitar duplicidade e, se precisar, falar com voc\xea.",
                }),
              ],
            }),
            (0, s.jsxs)("div", {
              className: "md:col-span-2",
              children: [
                (0, s.jsxs)("label", {
                  className: "mb-1 block text-xs text-white/60",
                  children: [
                    "Quantas pessoas?",
                    " ",
                    (0, s.jsx)("span", {
                      className: "text-white/40",
                      children: "(incluindo voc\xea)",
                    }),
                  ],
                }),
                (0, s.jsx)("input", {
                  name: "qty",
                  disabled: v,
                  type: "number",
                  min: 1,
                  max: 10,
                  value: t,
                  onChange: (e) => {
                    var t;
                    return a(
                      ((t = Number(e.target.value)),
                      Number.isNaN(t)
                        ? 1
                        : Math.max(1, Math.min(10, Math.trunc(t)))),
                    );
                  },
                  className: g,
                }),
              ],
            }),
            u > 0 &&
              (0, s.jsxs)("div", {
                className: "md:col-span-2",
                children: [
                  (0, s.jsxs)("div", {
                    className: "mt-2 flex items-center justify-between",
                    children: [
                      (0, s.jsxs)("h3", {
                        className: "text-sm font-semibold text-white",
                        children: ["Acompanhantes (", u, ")"],
                      }),
                      (0, s.jsx)("span", {
                        className: "text-xs text-white/40",
                        children: "Nome + WhatsApp (opcional)",
                      }),
                    ],
                  }),
                  (0, s.jsx)("div", {
                    className: "mt-4 grid gap-4",
                    children: p.map((e, t) =>
                      (0, s.jsxs)(
                        "div",
                        {
                          className:
                            "rounded-2xl border border-white/10 bg-black/25 p-4",
                          children: [
                            (0, s.jsxs)("div", {
                              className:
                                "mb-3 text-xs font-medium text-white/70",
                              children: ["Acompanhante ", t + 1],
                            }),
                            (0, s.jsxs)("div", {
                              className: "grid gap-3 md:grid-cols-2",
                              children: [
                                (0, s.jsxs)("div", {
                                  children: [
                                    (0, s.jsx)("label", {
                                      className:
                                        "mb-1 block text-xs text-white/60",
                                      children: "Nome",
                                    }),
                                    (0, s.jsx)("input", {
                                      name: `companion_${t}_name`,
                                      required: !0,
                                      disabled: v,
                                      value: e.name,
                                      inputMode: "text",
                                      onChange: (e) =>
                                        f(t, { name: i(e.target.value) }),
                                      placeholder: "Nome do acompanhante",
                                      className: `${g} uppercase`,
                                    }),
                                  ],
                                }),
                                (0, s.jsxs)("div", {
                                  children: [
                                    (0, s.jsx)("label", {
                                      className:
                                        "mb-1 block text-xs text-white/60",
                                      children: "WhatsApp (opcional)",
                                    }),
                                    (0, s.jsx)("input", {
                                      disabled: v,
                                      inputMode: "numeric",
                                      placeholder: "(11) 98765-4321",
                                      value: d(e.phone),
                                      onChange: (e) =>
                                        f(t, { phone: c(e.target.value) }),
                                      className: g,
                                    }),
                                    (0, s.jsx)("input", {
                                      name: `companion_${t}_phone`,
                                      type: "hidden",
                                      value: e.phone,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        },
                        t,
                      ),
                    ),
                  }),
                ],
              }),
            (0, s.jsx)("div", {
              className: "md:col-span-2 mt-2",
              children: (0, s.jsx)("button", {
                type: "submit",
                disabled: v,
                className:
                  "inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed",
                children: v ? "Enviando..." : "Confirmar presen\xe7a",
              }),
            }),
          ],
        });
      }
    },
    9339: (e, t, a) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var s = {
        callServer: function () {
          return n.callServer;
        },
        createServerReference: function () {
          return i.createServerReference;
        },
        findSourceMapURL: function () {
          return r.findSourceMapURL;
        },
      };
      for (var l in s)
        Object.defineProperty(t, l, { enumerable: !0, get: s[l] });
      let n = a(7304),
        r = a(4060),
        i = a(7197);
    },
  },
  (e) => {
    (e.O(0, [441, 794, 358], () => e((e.s = 3764))), (_N_E = e.O()));
  },
]);
