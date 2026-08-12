import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PatientIntakeForm from "../components/forms/PatientIntakeForm.jsx";
import EpworthForm from "../components/forms/EpworthForm.jsx";
import StopBangForm from "../components/forms/StopBangForm.jsx";
import TmjPainScaleForm from "../components/forms/TmjPainScaleForm.jsx";
import CpapIntoleranceForm from "../components/forms/CpapIntoleranceForm.jsx";
import CGaspForm from "../components/forms/CGaspForm.jsx";
import CommonSignsSymptomsForm from "../components/forms/CommonSignsSymptomsForm.jsx";
import Hero from "../components/ui/Hero.jsx";
import Section from "../components/ui/Section.jsx";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import PdfPreviewCard from "../components/ui/PdfPreviewCard.jsx";

// "New Patient Intake" renamed to "New Patient Form" per client review
// 8-10-2026 (#12/#17: "change INTAKE to NEW PATIENT FORM").
const TABS = [
  { key: "intake", label: "New Patient Form", el: <PatientIntakeForm /> },
  // { key: "cgasp", label: "C-GASP Screener", el: <CGaspForm /> },
  // { key: "signs", label: "Signs & Symptoms", el: <CommonSignsSymptomsForm /> },
  // { key: "epworth", label: "Epworth Scale", el: <EpworthForm /> },
  // { key: "stopbang", label: "STOP-BANG", el: <StopBangForm /> },
  // { key: "tmjpain", label: "TMJ Pain Scale", el: <TmjPainScaleForm /> },
  // { key: "cpap", label: "CPAP Intolerance", el: <CpapIntoleranceForm /> },
];

// Every named form from the client's materials. `previewImage` only points
// at a real scanned form we were actually given; `to` only points at a
// working digital form we actually built. Neither is guessed/faked.
// const FORM_LIBRARY = [
//   { category: "Orthodontic Forms", items: [
//     { name: "DW Ortho" },
//     { name: "C-GASP", previewImage: "/forms-reference/cgasp-screener.png", to: "/patient-forms?tab=cgasp", description: "Children's General Airway Screening Protocol (ages 2–12)" },
//     { name: "PSQ" },
//     { name: "BEARS" },
//   ]},
//   { category: "TMJ Forms", items: [
//     { name: "DW TMJ" },
//     { name: "TMJ Pain Scale", previewImage: "/forms-reference/tmj-pain-scale.png", to: "/patient-forms?tab=tmjpain" },
//   ]},
//   { category: "Sleep / Airway Forms", items: [
//     { name: "DW OSA" },
//     { name: "Common Signs & Symptoms", previewImage: "/forms-reference/common-signs-symptoms-yoon.png", to: "/patient-forms?tab=signs", description: "Sleep Disordered Breathing checklist" },
//     { name: "Epworth Sleepiness Scale", previewImage: "/forms-reference/epworth-sleepiness-scale.png", to: "/patient-forms?tab=epworth" },
//     { name: "STOP-BANG Questionnaire", previewImage: "/forms-reference/stop-bang-questionnaire.png", to: "/patient-forms?tab=stopbang" },
//     { name: "CPAP Intolerance Affidavit", previewImage: "/forms-reference/cpap-intolerance-affidavit.png", to: "/patient-forms?tab=cpap" },
//     { name: "Physician Written Order for OAT", previewImage: "/forms-reference/physician-written-order-oat.png", description: "Completed by your physician, not the patient" },
//   ]},
//   { category: "Consent Forms", items: [
//     { name: "CBCT Consent" },
//     { name: "Model Release" },
//     { name: "Informed Consent for Treatment" },
//   ]},
// ];

export default function PatientForms() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = TABS.some((t) => t.key === searchParams.get("tab")) ? searchParams.get("tab") : "intake";
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    const urlTab = searchParams.get("tab");
    if (urlTab && TABS.some((t) => t.key === urlTab) && urlTab !== tab) {
      setTab(urlTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function selectTab(key) {
    setTab(key);
    setSearchParams({ tab: key });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <Hero
        eyebrow="Patient Resources"
        title="Patient Forms"
        subtitle={'Orthodontics / TMJ / Sleep Apnea. Dates are typed as MM/DD/YYYY — no calendar scrolling.'}
      />

      <Section tone="white" containerClassName="max-w-3xl">
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => selectTab(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                tab === t.key ? "bg-breath text-white border-breath" : "border-ink/20 text-ink/70 hover:border-ink/40"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {/* Where submissions go (client review 8-10-2026 #12: "be sure where
            does this go when someone submits"): New Patient Form posts to
            POST /api/patients/submit/ (backend/apps/patients/urls.py),
            reviewed by staff under Office Portal > Intake Forms
            (IntakeForms.jsx). The clinical scales (C-GASP, Signs &
            Symptoms, Epworth, STOP-BANG, TMJ Pain, CPAP Intolerance) post
            to POST /api/clinical-forms/submit/ via submitClinicalForm.js,
            reviewed under Office Portal > Clinical Forms
            (ManageClinicalForms.jsx). Both fall back to local state only
            if the Django API isn't reachable. */}
        {TABS.find((t) => t.key === tab)?.el}
      </Section>

      {/* "Reference Library" section hidden per client review 8-10-2026
          (#12 "Reference Library delete this section") -- kept in code,
          not deleted, per instruction. */}
      {/* <Section tone="mist">
        <SectionHeader eyebrow="Forms Library" title="Every Patient Form, In One Place" subtitle="Forms with a preview and a Fill Out Online link are ready to complete now. The rest are provided at your visit." className="mb-10" />
        <div className="space-y-10">
          {FORM_LIBRARY.map((group) => (
            <div key={group.category}>
              <p className="text-xs uppercase tracking-wide text-ink/40 font-semibold mb-3">{group.category}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.items.map((item) => (
                  <PdfPreviewCard key={item.name} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section> */}
    </div>
  );
}
