import React from "react";
import Hero from "../components/ui/Hero.jsx";
import Section from "../components/ui/Section.jsx";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import FeatureCard from "../components/ui/FeatureCard.jsx";
import CTA from "../components/ui/CTA.jsx";

const REASONS = [
  { title: "Board-Certified Orthodontist", body: "Dr. Harrell is a Board-Certified Orthodontist (American Board of Orthodontics), holding one of the profession's highest voluntary credentials." },
  { title: "Advanced 3D Imaging", body: "First in Alabama with CBCT, and first in the USA to combine it with 3D facial imaging -- seeing the full picture before treatment begins." },
  { title: "Airway-Focused Approach", body: "Every treatment plan considers breathing and airway function alongside the bite -- not teeth in isolation." },
  { title: "TMJ Expertise", body: "Decades of experience diagnosing and treating TMJ disorders, from conservative splint therapy through surgical coordination." },
  { title: "Personalized Treatment", body: "Non-extraction philosophy where possible, guided by real 3D data rather than one-size-fits-all protocols." },
  { title: "Four Decades of Experience", body: "Practicing since 1975, with ongoing teaching at UAB and lecturing to doctors internationally." },
];

const ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" />
  </svg>
);

export default function WhyChooseUs() {
  return (
    <div>
      <Hero eyebrow="About Our Practice" title="Why patients and referring providers choose Harrell Orthodontics" subtitle="Four decades of airway-focused, evidence-based orthodontic and TMJ care in Alexander City and Auburn/Opelika, Alabama." />
      <Section>
        <SectionHeader eyebrow="Why Choose Us" title="Built on Expertise, Technology & Trust" align="center" className="mx-auto mb-12" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((r) => (
            <FeatureCard key={r.title} icon={ICON} title={r.title}>{r.body}</FeatureCard>
          ))}
        </div>
      </Section>
      <Section tone="mist">
        <CTA subtitle="Have questions before your first visit? Our team is happy to help." />
      </Section>
    </div>
  );
}
