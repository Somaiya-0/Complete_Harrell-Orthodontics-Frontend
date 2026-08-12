import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function TopBar() {
  return (
    <motion.div
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="hidden sm:flex items-center justify-between bg-blue-700 text-white text-xs px-6 lg:px-10 py-2 gap-4"
    >
      <div className="flex items-center gap-4 lg:gap-5 min-w-0">
        <span className="hidden md:flex items-center gap-1.5 whitespace-nowrap">
          <PinIcon /> 5030 US Highway 280 Suite D Alexander City, AL 35010
        </span>

        <span className="hidden lg:inline text-white/30">|</span>

        <a
          href="mailto:Jessica.drharrell@gmail.com"
          className="hidden md:flex items-center gap-1.5 hover:text-white/80 whitespace-nowrap"
        >
          <MailIcon /> Jessica.drharrell@gmail.com
        </a>

        <span className="hidden md:inline text-white/30">|</span>

        <a
          href="tel:2562346353"
          className="flex items-center gap-1.5 hover:text-white/80 whitespace-nowrap"
        >
          <PhoneIcon /> (256) 234-6353
        </a>

        <span className="text-white/30">|</span>

        <a
          href="tel:2564962439"
          className="flex items-center gap-1.5 font-semibold hover:text-white/80 whitespace-nowrap"
        >
          <PhoneIcon /> Emergency: (256) 496-2439
        </a>
      </div>

      <div className="flex items-center gap-4 lg:gap-5 shrink-0">
        {/* <span className="hidden xl:inline whitespace-nowrap">
          Alexander City &amp; Auburn/Opelika, AL
        </span> */}

        <span className="hidden xl:inline text-white/30">|</span>

        {/* Hidden per client review 8-10-2026 (#22 "REFERRAL PROVIDER
            REMOVE THIS") -- portal route kept working, just unlinked. */}
        {/* <Link to="/referral-portal" className="hover:text-white/80 whitespace-nowrap">
          Referring Providers
        </Link> */}

        <span className="hidden lg:inline text-white/30">|</span>

        <div className="hidden lg:flex items-center gap-2.5">
          {/* <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
          >
            <FacebookIcon />
          </a> */}
          <a
            href="https://x.com/DrBillHarrell"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
          >
            <XIcon />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
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

function FacebookIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-8.5H16l.4-3.2h-2.9V7.3c0-.9.3-1.6 1.6-1.6H16.5V2.8C16.2 2.8 15.1 2.7 13.9 2.7c-2.5 0-4.2 1.5-4.2 4.3v2.3H7v3.2h2.7V21h3.8z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.24 2H21l-6.4 7.3L22.3 22h-6.6l-5.2-6.8L4.5 22H1.7l6.9-7.9L1 2h6.7l4.7 6.2L18.24 2zm-1.15 18h1.8L7.02 3.9H5.1L17.09 20z" />
    </svg>
  );
}
