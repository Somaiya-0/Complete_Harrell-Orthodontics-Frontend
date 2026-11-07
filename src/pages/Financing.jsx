import React from "react";
import FinancingWidget from "../components/financing/FinancingWidget.jsx";
import Hero from "../components/ui/Hero.jsx";
import Section from "../components/ui/Section.jsx";

export default function Financing() {
  return (
    <div>
      <Hero eyebrow="Investing In Your Care" title="Financing" subtitle="Flexible ways to pay for your treatment, with Sunbit and Cherry as our featured partners." />
      <Section containerClassName="max-w-3xl">
        <FinancingWidget />
      </Section>
    </div>
  );
}
