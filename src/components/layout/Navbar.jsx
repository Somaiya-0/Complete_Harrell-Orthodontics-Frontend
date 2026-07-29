import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { api } from "../../api/client.js";
import { withFallback } from "../../api/withFallback.js";
import { mockNav } from "../../mockData.js";
import TopBar from "./TopBar.jsx";

const STATIC_LINKS = [
  { to: "/videos", label: "Videos" },
  { to: "/publications", label: "Publications" },
  { to: "/financing", label: "Financing" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [nav, setNav] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
  withFallback(() => api.get("/pages/nav/"), mockNav)
    .then((response) => {
      const data = response?.results ?? response;

      setNav(data?.length ? data : mockNav);
    });
}, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openWithDelay(id) {
    clearTimeout(closeTimer.current);
    setOpenMenu(id);
  }
  function closeWithDelay() {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  }

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <div
        className={`bg-white/95 backdrop-blur border-b transition-shadow ${
          scrolled ? "shadow-[0_2px_16px_rgba(18,35,59,0.08)] border-transparent" : "border-ink/10"
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-10 h-[70px]">
          {/* Logo -- flush to the left edge */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <BreathMark />
            <span className="leading-tight">
              <span className="block font-display text-[17px] tracking-tight text-ink">Harrell Orthodontics</span>
              <span className="block text-[11px] text-breath font-medium tracking-wide">Airway &middot; TMJ &middot; Sleep</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 text-[14px] font-medium">
            {nav.map((cat) => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => openWithDelay(cat.id)}
                onMouseLeave={closeWithDelay}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-ink/75 hover:text-ink hover:bg-ink/[0.03] ${
                    openMenu === cat.id ? "text-ink bg-ink/[0.03]" : ""
                  }`}
                >
                  {cat.label}
                  <Chevron open={openMenu === cat.id} />
                </button>
                {cat.pages?.length > 0 && openMenu === cat.id && (
                  <div className="absolute left-0 top-full pt-2 w-72">
                    <div className="bg-white shadow-xl rounded-xl border border-ink/10 p-2">
                      {cat.pages.map((p) => (
                        <Link
                          key={p.id}
                          to={p.path || `/learn/${p.slug}`}
                          className="block px-3 py-2.5 rounded-lg hover:bg-breathlight text-ink/75 hover:text-ink text-[13px]"
                        >
                          {p.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {STATIC_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md hover:bg-ink/[0.03] ${isActive ? "text-breath" : "text-ink/75 hover:text-ink"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/patient-forms"
              className="hidden lg:inline-block bg-breath text-white text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-breath/90 transition-colors"
            >
              New Patient Form
            </Link>
            <button
              className="lg:hidden text-ink p-2 -mr-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 h-[70px] border-b border-ink/10">
              <span className="font-display text-ink">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="text-ink/50 p-2" aria-label="Close menu">
                <CloseIcon />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 py-4 text-[15px]">
              {nav.map((cat) => (
                <div key={cat.id} className="mb-4">
                  <p className="text-xs uppercase tracking-wide text-ink/40 font-semibold mb-1.5">{cat.label}</p>
                  {cat.pages?.map((p) => (
                    <Link
                      key={p.id}
                      to={p.path || `/learn/${p.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-ink/80"
                    >
                      {p.title}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="h-px bg-ink/10 my-3" />
              {STATIC_LINKS.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block py-2 text-ink/80">
                  {l.label}
                </Link>
              ))}
              <Link to="/reviews" onClick={() => setMobileOpen(false)} className="block py-2 text-ink/80">Reviews</Link>
              <Link to="/referral-portal" onClick={() => setMobileOpen(false)} className="block py-2 text-ink/80">Referring Providers</Link>
            </nav>
            <div className="px-5 py-4 border-t border-ink/10">
              <Link
                to="/patient-forms"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-breath text-white font-semibold px-5 py-3 rounded-full"
              >
                New Patient Form
              </Link>
              <a href="tel:2562346353" className="block text-center mt-3 text-ink/70 text-sm">
                Or call 256-234-6353
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function BreathMark() {
  return (
    <svg width="30" height="22" viewBox="0 0 60 30" className="breath-animate shrink-0">
      <path d="M0 15 Q7 2 14 15 T28 15 T42 15 T56 15" className="breath-line" strokeDasharray="4 4" />
    </svg>
  );
}

function Chevron({ open }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      className={`transition-transform ${open ? "rotate-180" : ""}`}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
