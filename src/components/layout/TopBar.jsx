import React from "react";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="hidden sm:flex items-center justify-between bg-ink text-paper/80 text-xs px-6 lg:px-10 py-2">
      <div className="flex items-center gap-5">
        <a
          href="tel:2562346353"
          className="hover:text-white flex items-center gap-1.5"
        >
          <PhoneIcon /> 256-234-6353
        </a>

        <span className="text-paper/30">|</span>

        <span>
          Alexander City &amp; Auburn/Opelika, AL
        </span>
      </div>

      <div className="flex items-center gap-5">
        <Link to="/referral-portal" className="hover:text-white">
          Referring Providers
        </Link>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}