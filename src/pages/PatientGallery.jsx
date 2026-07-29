import React from "react";
import Hero from "../components/ui/Hero.jsx";
import Section from "../components/ui/Section.jsx";
import Button from "../components/ui/Button.jsx";

export default function PatientGallery() {
  return (
    <div>
      <Hero eyebrow="Patient Resources" title="Patient Gallery" subtitle="A look at real results from our practice." />
      <Section tone="white">
        <div className="max-w-xl mx-auto text-center bg-breathlight/60 border border-breath/20 rounded-3xl p-12">
          <div className="w-14 h-14 rounded-2xl bg-white border border-breath/30 text-breath flex items-center justify-center mx-auto mb-6">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          <h2 className="font-display text-2xl text-ink mb-3">Patient results gallery coming soon</h2>
          <p className="text-ink/60 leading-relaxed mb-8">
            We're collecting approved before-and-after photos from our patients to share here. Out of respect for
            patient privacy, this section only goes live once media has been reviewed and approved for publication.
          </p>
          <Button to="/reviews" variant="outline">See Patient Reviews Instead</Button>
        </div>
      </Section>
    </div>
  );
}
