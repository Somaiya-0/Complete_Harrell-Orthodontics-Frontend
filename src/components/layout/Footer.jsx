import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/90 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <p className="font-display text-lg mb-2">Harrell Orthodontics</p>
          <p className="text-paper/60">Alexander City &amp; Auburn/Opelika, Alabama</p>
          <p className="mt-3">Office / Text: 256-234-6353</p>
          <p>Emergency line / Text: 256-496-2439</p>
          <p>Fax: 256-329-4335</p>
        </div>
        <div>
          <p className="font-semibold mb-2">Care</p>
          <ul className="space-y-1 text-paper/70">
            <li><Link to="/patient-forms">Patient Forms</Link></li>
            <li><Link to="/financing">Financing</Link></li>
            <li><Link to="/videos">Videos</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Practice</p>
          <ul className="space-y-1 text-paper/70">
            <li><Link to="/team">Meet the Team</Link></li>
            <li><Link to="/publications">Publications &amp; Lectures</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/referral-portal">Referring Providers</Link></li>

            <li><Link to="/office-portal/login">Stuff</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Contact</p>
          <ul className="space-y-1 text-paper/70">
            <li>Jessica.drharrell@gmail.com</li>
            <li><Link to="/contact">Get in touch</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-paper/40 pb-6">
        © {new Date().getFullYear()} Harrell Orthodontics. Healthy Airway. Healthy Life.
      </div>
    </footer>
  );
}
