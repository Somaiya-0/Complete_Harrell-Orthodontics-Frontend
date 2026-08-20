import React from "react";
import Hero from "../components/ui/Hero.jsx";
import Section from "../components/ui/Section.jsx";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import FeatureCard from "../components/ui/FeatureCard.jsx";
import CTA from "../components/ui/CTA.jsx";

const ICONS = {
  cbct: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18" strokeWidth="1" opacity="0.6" />
    </svg>
  ),
  face: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="9" r="4" /><path d="M4 21c0-4 3.5-6.5 8-6.5s8 2.5 8 6.5" />
    </svg>
  ),
  nose: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 3v7a3 3 0 0 0 3 3 3 3 0 0 0 3-3V3" /><path d="M6 13a6 6 0 0 0 12 0" />
    </svg>
  ),
  scan: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9h16M9 4v16" strokeWidth="1" opacity="0.6" />
    </svg>
  ),
};

export default function Technology() {
  return (
    <div>
      <Hero
  eyebrow="Our Technology"
  title="The latest in 3D technology, to understand “The Anatomic Truth.”"
  subtitle="Our office is the first in Alabama with ConeBeam CT (CBCT) imaging, and the first in the USA to combine it with 3D facial imaging and full nasal-airflow diagnostics."
  image="/images/dr-harrell-clinical-photo.png"
/>

      <Section>
        <SectionHeader eyebrow="Diagnostic Technology" title="Four Pillars of Airway-Focused Imaging" align="center" className="mx-auto mb-12" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <FeatureCard icon={ICONS.cbct} title="CBCT 3D Imaging">
            First in Alabama to offer ConeBeam CT -- a very low radiation dose 3D X-ray that evaluates teeth, bones, TMJ, airway, and sinuses in one scan.
          </FeatureCard>
          <FeatureCard icon={ICONS.face} title="3D Facial Imaging">
            First in the USA to combine CBCT with true 3D facial imaging (3dMD), giving a complete picture of facial growth alongside the bite and airway.
          </FeatureCard>
          <FeatureCard icon={ICONS.nose} title="Nasal Function Testing">
            4-Phase High Resolution Rhinomanometry, Acoustic Rhinometry, and PNIF (Peak Nasal Inspiratory Flow) assess nasal resistance and airflow directly.
          </FeatureCard>
          <FeatureCard icon={ICONS.scan} title="Digital Dentistry">
            CareStream 3600 intraoral scanning means no messy impressions, plus in-office 3D printing to produce dental/orthodontic appliances.
          </FeatureCard>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeader
              eyebrow="Why It Matters"
              title="The nose and upper jaw are one bone."
              subtitle={'A narrow upper jaw means a narrow nasal cavity. Nasal breathing is necessary for normal facial growth and development in children and adults -- narrow jaws lead to crooked teeth and "bad bites." Understanding this relationship, not just the teeth, is what "The Anatomic Truth" means to us.'}
            />
          </div>
          <img src="/images/dr-harrell-clinical-photo.png" alt="CareStream 3600 intraoral scanning in use at our office" className="rounded-3xl shadow-lifted w-full h-72 object-cover" />
        </div>
      </Section>

      <Section tone="mist">
        <CTA
          eyebrow="See It For Yourself"
          title="Experience airway-focused diagnostics, first-hand."
          subtitle="Schedule a visit to see how CBCT, 3D facial imaging, and nasal airflow testing come together in your treatment plan."
        />
      </Section>
    </div>
  );
}
