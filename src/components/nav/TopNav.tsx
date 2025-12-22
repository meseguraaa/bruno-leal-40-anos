// src/components/nav/TopNav.tsx
export function TopNav() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-6xl justify-center px-4">
        <div className="flex w-full items-center justify-between rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_18px_60px_rgba(0,0,0,0.55)]">
          {/* Brand */}
          <a
            href="#top"
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold tracking-wide text-white/90 hover:text-white transition"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_18px_rgba(124,58,237,0.9)]" />
            BRUNO
            <span className="text-violet-400">LEAL</span>
          </a>

          {/* Links (hidden on small) */}
          <nav className="hidden items-center gap-1 sm:flex">
            <NavLink href="#top">Home</NavLink>
            <NavLink href="#detalhes">Detalhes</NavLink>
            <NavLink href="#rsvp">Presença</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
          </nav>

          {/* CTA */}
          <a
            href="#rsvp"
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
          >
            Confirmar presença
          </a>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: Readonly<{
  href: string;
  children: React.ReactNode;
}>) {
  return (
    <a
      href={href}
      className="rounded-full px-3 py-2 text-xs font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
    >
      {children}
    </a>
  );
}
