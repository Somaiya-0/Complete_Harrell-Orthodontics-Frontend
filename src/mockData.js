// REAL content only, sourced directly from the client's own docs:
// - Clinic_Website_All_Draft_new_project.docx (revision instructions)
// - Website_design_DentaCORE_VER_4_0.docx (page copy, forms, referral directory)
// - Uploaded images (verified individually -- see ASSET_AUDIT.md at project root)
//
// Anything the client did not provide (staff bios, review quotes, testimonial
// transcripts, some form PDFs) is intentionally left OUT rather than invented.
// See ASSET_AUDIT.md for the full list of what's still missing from the client.

export const mockNav = [
  {
    id: 0,
    label: "About",
    order: 0,
    pages: [
      { id: 0.1, title: "Meet Dr. Harrell", path: "/team" },
      { id: 0.2, title: "Our Technology", path: "/technology" },
      { id: 0.3, title: "Why Choose Us", path: "/why-choose-us" },
    ],
  },
  {
    id: 1,
    label: "Orthodontics",
    order: 1,
    pages: [
      { id: 1, title: "Orthodontics & Dento-facial Orthopedics, Ages 4–6", slug: "orthodontics-ages-4-6" },
      { id: 2, title: "Orthodontics & Dento-facial Orthopedics, Ages 7–11", slug: "orthodontics-ages-7-11" },
      { id: 3, title: "Orthodontics, Teens (12+)", slug: "orthodontics-teens" },
      { id: 4, title: "Orthodontics, Adults (18+)", slug: "orthodontics-adult" },
      { id: 4.1, title: "Treatments", slug: "orthodontic-treatments" },
    ],
  },
  {
    id: 2,
    label: "Airway & Sleep",
    order: 2,
    pages: [
      // Myofunctional Therapy & Other Therapies hidden from nav per client
      // review 8-12-2026 -- practice doesn't offer this treatment, refers
      // out instead. Page/route kept, just not linked, per instruction not
      // to actually delete anything.
      // { id: 5, title: "Myofunctional Therapy & Other Therapies", slug: "myofunctional-therapy" },
      { id: 6, title: "Sleep, Breathing & Airway Disorders", slug: "sleep-airway-disorders" },
      { id: 7, title: "Airway Diagnostics", slug: "airway-diagnostics" },
      {id: 7.1,title: "Airway Therapies",slug: "airway-therapies"},
    ],
  },
  {
    id: 3,
    label: "TMJ",
    order: 3,
    pages: [
      { id: 8, title: "TMJ Disorders (Jaw Dysfunction)", slug: "tmj-disorders" },
      { id: 8.1, title: "TMJ Treatments", path: "/learn/tmj-disorders#tmj-treatments" },
    ],
  },
  {
    id: 4,
    label: "Patient Resources",
    order: 4,
    pages: [
      { id: 9, title: "New Patient Form", path: "/patient-forms" },
      // Gallery hidden from nav per client review 8-10-2026 (#17 "GALLERY
      // DELETE THIS") -- page/route kept, just not linked, per instruction
      // not to actually delete anything.
      // { id: 10, title: "Patient Gallery", path: "/patient-gallery" },
      { id: 11, title: "Testimonials / Reviews", path: "/reviews" },
    ],
  },
];

export const mockPages = {
  "orthodontic-treatments": {
    title: "Orthodontic Treatments",
    short_description: "The appliances and therapies we use to treat crowding, narrow jaws, and bite problems -- chosen by age, growth, and airway impact.",
    hero_image: "/images/dr-harrell-clinical-photo.png",
    sections: [
      {
        id: 1, kind: "rich_text", heading: "Choosing the right treatment",
        body: "Which of these we recommend depends on age, remaining growth, and what 3D imaging shows about the bones, teeth, and airway. Our office favors non-extraction, expansion-based therapies wherever the supporting bone allows, since keeping the arches wide tends to support the airway as well as the bite.",
      },
      {
        id: 2, kind: "treatment_cards", heading: "Treatments",
        items: [
          { title: "Braces", body: "Traditional fixed metal or ceramic braces for comprehensive tooth and bite correction." },
          { title: "Invisible Aligners", body: "A series of clear, removable aligner trays, each one moving the teeth incrementally toward the final result." },
          { title: "Expansion Therapy", body: "Gently widens narrow upper and lower jaws while growth is still active, creating room for teeth and supporting the airway." },
          { title: "RPE / MARPE / SARPE", body: "Rapid, mini-implant-assisted, or surgically-assisted palatal expansion -- used as growth allows, including in adults whose jaw growth has already completed." },
          { title: "E-Arches", body: "A fixed expansion-arch appliance used to widen the dental arch and guide erupting teeth into a broader, more stable position." },
          { title: "MyoBrace", body: "A removable myofunctional trainer appliance that encourages proper tongue posture, nasal breathing, and jaw development in growing children." },
          { title: "Healthy Start", body: "A removable pediatric appliance system aimed at guiding jaw growth and correcting habits like mouth breathing early, while growth potential is highest." },
        ],
      },
      {
        id: 3, kind: "rich_text", heading: "Learn more by age group",
        body: "For which of these therapies typically applies at each stage, see Early Orthodontics (Ages 4-6), Growing Children (Ages 7-11), Teen Orthodontics, and Adult Orthodontics.",
      },
    ],
    forms: [],
  },
  "orthodontics-ages-4-6": {
    title: "Orthodontics & Dento-facial Orthopedics, Ages 4–6",
    short_description: "Why should my child be seen by an orthodontist at age 4?",
    hero_image: "/images/dr-harrell-clinical-photo.png",
    sections: [
      {
        id: 1, kind: "rich_text", heading: "\"Fix before 6\"",
        body: "Most orthodontists do not see children before age 7, after the 1st permanent molars and the upper and lower incisors have erupted. But research shows facial growth is already well underway by then: by age 5, about 50-60% of facial growth has already occurred; by age 8, about 75-80%; by age 12-13, 90%+ is complete. \"Watchfully waiting\" to see if a child will grow out of a problem does not work -- they will not grow out of it.",
      },
      {
        id: 2, kind: "rich_text", heading: "The clubbed-foot analogy",
        body: "Physicians treat clubbed feet at birth, not later, because growth during that window is rapid and can remold the anatomy. Waiting until the legs fully develop means major treatment is needed and the underlying deformity is still present. The same principle applies to jaw and airway development.",
      },
      {
        id: 3, kind: "rich_text", heading: "What we evaluate",
        body: "At ages 4-6 we evaluate the structure of the bones and teeth and how they relate to the airway, breathing, and the TM joints -- usually with ultra-low-dose 3D imaging revealing the \"anatomic truth.\" Enlarged tonsils and adenoids, allergic rhinitis, and nasal obstruction can all lead to mouth breathing instead of normal nose breathing. If narrow bony arches and crowding are present, expansion therapy may be indicated -- the earlier this is done, the easier the treatment, because of the growth still available.",
      },
      {
        id: 4, kind: "stat_callout",
        body: "Dr. Harrell is a Board-Certified Orthodontist (American Board of Orthodontics). Our office focuses on airway- and TMJ-friendly orthodontics, and likes to see patients as early as 4-7 years old, when we can have the greatest positive effect on growth and development.",
      },
      {
        id: 5, kind: "rich_text", heading: "Learn more",
        body: "The Children's Airway First Foundation (CAFF) -- childrensairwayfirst.org -- has a mission to educate parents and clinicians on children's airway health and airway management, including their \"Fix Before 6\" campaign.",
      },
      {
        id: 6, kind: "treatment_cards", heading: "Treatments",
        items: [
          { title: "Expansion Therapy", body: "Gently widens narrow upper and lower jaws while growth is still active, creating room for teeth and supporting the airway." },
          { title: "Growth Guidance", body: "Monitoring and guiding jaw growth direction during the years it can still be influenced, rather than correcting it later." },
          { title: "Early Intervention", body: "Addressing crossbite, crowding, or mouth-breathing patterns as soon as they're identified, per the \"fix before 6\" philosophy." },
        ],
      },
    ],
    forms: [
      { id: 1, name: "DW Ortho" }, { id: 2, name: "C-GASP", to: "/patient-forms?tab=cgasp" }, { id: 3, name: "PSQ" }, { id: 4, name: "BEARS" },
      { id: 5, name: "Consent Forms (CBCT, Model Release, Informed Consent for Treatment)" },
      { id: 6, name: "INF: Early Dx & Tx" },
    ],
  },
  "orthodontics-ages-7-11": {
    title: "Orthodontics & Dento-facial Orthopedics, Ages 7-11",
    short_description: "Why should my child be seen before all the permanent teeth come in?",
    hero_image: "/images/scanner-patient-3600.png",
    sections: [
      {
        id: 1, kind: "rich_text", heading: "The AAO recommendation, and why we look earlier",
        body: "The American Association of Orthodontists (AAO) recommends a child see an orthodontist by age 7, after the 1st permanent molars and upper/lower incisors erupt. There is still good growth potential after age 6, so the second-best time to have a child evaluated is just before they lose all their primary teeth -- between 7 and 11.",
      },
      {
        id: 2, kind: "rich_text", heading: "Why not wait until the teen years?",
        body: "Waiting until the \"orthodontic age\" of 12-13 often means permanent teeth need to be extracted, which keeps the dental arches narrow -- leaving less room for the tongue and possibly affecting the airway, the TMJs, and sleep.",
      },
      {
        id: 3, kind: "stat_callout",
        body: "Dr. Harrell is a Board-Certified Orthodontist (American Board of Orthodontics), focused on airway- and TMJ-friendly orthodontics using the latest 3D technology.",
      },
      {
        id: 4, kind: "treatment_cards", heading: "Treatments",
        items: [
          { title: "Expansion Therapy", body: "Widening narrow upper and lower jaws while growth potential remains, creating room for the permanent teeth and supporting the airway." },
          { title: "Growth Guidance", body: "Monitoring and guiding jaw growth direction while it can still be influenced, before the primary teeth are lost." },
          { title: "Non-Extraction Philosophy", body: "Favoring expansion and guided growth over extracting permanent teeth later, so the dental arches stay wide enough to support the tongue and airway." },
        ],
      },
    ],
    forms: [
      { id: 1, name: "DW Ortho" }, { id: 2, name: "C-GASP", to: "/patient-forms?tab=cgasp" }, { id: 3, name: "SDIS" }, { id: 4, name: "PSQ" },
      { id: 5, name: "BEARS" }, { id: 6, name: "Info: Adolescent Dx & Tx" },
      { id: 7, name: "Consent Forms (CBCT, Model Release, Informed Consent for Treatment)" },
    ],
  },
  "orthodontics-teens": {
    title: "Orthodontics, Teens",
    short_description: "Traditional orthodontic treatment around age 12-13.",
    hero_image: "/images/dr-harrell-clinical-photo.png",
    sections: [
      {
        id: 1, kind: "rich_text", heading: "More than a beautiful smile",
        body: "Braces have been the norm for over 100 years, traditionally viewed as being about a beautiful smile, balanced faces, healthy gums, and TMJ stability. Airway connections to orthodontics actually date back over 100 years too -- even Dr. Edward H. Angle, the father of modern orthodontics, wrote and lectured on the connection. It was lost to history until the last decade, when medical and dental colleagues began researching it again.",
      },
      {
        id: 2, kind: "rich_text", heading: "Our approach to extraction",
        body: "Our office focuses on non-extraction therapies where possible, keeping dental/skeletal arches as wide as bone boundaries allow to help airway function. Non-extraction \"at all costs\" isn't always possible -- teeth can't move into thin air outside the bony boundaries -- so careful evaluation, best done with 3D CBCT imaging, guides the decision. Airway and sleep-disordered breathing issues are best evaluated by a sleep physician, ENT, or otolaryngologist, since they're a medical issue with some dental/orthodontic solutions.",
      },
      {
        id: 3, kind: "treatment_cards", heading: "Treatments",
        items: [
          { title: "Braces", body: "Traditional metal or ceramic braces for comprehensive tooth and bite correction." },
          { title: "Clear Aligner Treatment", body: "Our leading clear aligner system, for patients who prefer a removable, low-visibility option." },
          { title: "Non-Extraction Philosophy", body: "Wherever the supporting bone allows, we favor expanding and guiding growth over removing permanent teeth." },
        ],
      },
    ],
    forms: [
      { id: 1, name: "DW Ortho" }, { id: 2, name: "C-GASP (up to 12)", to: "/patient-forms?tab=cgasp" }, { id: 3, name: "SDIS" }, { id: 4, name: "BEARS" },
      { id: 5, name: "Info: Teen Ortho" }, { id: 6, name: "Extraction vs. Non-Extraction" },
      { id: 7, name: "Consent Forms (CBCT, Model Release, Informed Consent for Treatment)" },
    ],
  },
  "orthodontics-adult": {
    title: "Orthodontics, Adults (18+)",
    short_description: "It's not too late -- treatment options for adults.",
    hero_image: "/images/dr-harrell-headshot.png",
    sections: [
      {
        id: 1, kind: "rich_text", heading: "Adult treatment options",
        body: "Adult therapies include braces (clear or totally invisible), invisible aligner therapy, and surgical orthodontic therapies to aid boney expansion, correct jaw discrepancies, treat TMJ issues, and treat obstructive sleep apnea. As with younger patients, we still favor non-extraction therapy where the supporting bone and gums allow it, using 3D CBCT imaging to guide decisions.",
      },
      {
        id: 2, kind: "treatment_cards", heading: "Treatments",
        items: [
          { title: "Braces", body: "Traditional fixed braces for comprehensive adult correction." },
          { title: "Clear Aligner Treatment", body: "Our leading clear aligner system -- a discreet option for working adults." },
          { title: "Surgical Orthodontics: RPE / MARPE / SARPE", body: "Rapid, mini-implant-assisted, or surgically-assisted palatal expansion for adults whose jaw growth has already completed." },
        ],
      },
    ],
    forms: [
      { id: 1, name: "DW Ortho" }, { id: 2, name: "Info: Adult Ortho" },
      { id: 3, name: "Consent Forms (CBCT, Model Release, Informed Consent for Treatment)" },
    ],
  },
  "myofunctional-therapy": {
    title: "Myofunctional Therapy & Other Therapies",
    short_description: "Retraining the muscles of the face, mouth, and tongue for proper function and facial development.",
    hero_image: "/images/scanner-patient-3600.png",
    sections: [
      {
        id: 1, kind: "rich_text", heading: "What myofunctional therapy treats",
        body: "Myofunctional therapy (MFT / OMFT) focuses on retraining the muscles of the face, mouth, and tongue for proper function and facial development. A Speech-Language Pathologist (SLP) diagnoses and treats a broader range of disorders affecting communication, voice, and swallowing.",
      },
      {
        id: 2, kind: "rich_text", heading: "Collaborating providers",
        body: "Nicole Goldfarb, MA, CCC-SLP, COM (San Diego Center for Speech Therapy -- does TeleMed services). Airway Circle (airwaycircle.com). Renata Nehme, RDH (does TeleMed services). Lauren Hughes, SLP, of Expressions Pediatric Therapy in Birmingham, AL. For tongue-tie release: Richard Baxter, DMD, of the Alabama Tongue Tie Center in Pelham, AL (a pediatric dentist).",
      },
    ],
    forms: [],
  },
  "sleep-airway-disorders": {
    title: "Sleep, Breathing & Airway Disorders",
    short_description: "In children and adults.",
    hero_image: "/images/book-cover.png",
    sections: [
      {
        id: 1, kind: "rich_text", heading: "If you've already had a sleep study",
        body: "If you or your child has had a sleep study, please fax it to our office, or have your doctor fax the results, or email it to Jessica.drharrell@gmail.com.",
      },
      {
        id: 2, kind: "rich_text", heading: "Understanding Sleep Disordered Breathing (SDB)",
        body: "SDB -- more accurately, Breathing Disorders of Sleep, since the breathing disturbs sleep, not the other way around -- can cause problems well beyond nighttime snoring. Obstructive Sleep Apnea (OSA) is the most common SDB issue, usually diagnosed by clinical exam and screening, and if needed, an in-lab Sleep Study (Polysomnogram, PSG). The Apnea-Hypopnea Index (AHI) is the gold-standard measure: Apnea is when breathing stops for 10+ seconds with an oxygen drop of 3-4% or more; Hypopnea is shallow breathing with a similar oxygen drop. These combine to produce the AHI, which classifies severity as Normal, Mild, Moderate, or Severe.",
      },
      {
        id: 3, kind: "rich_text", heading: "Featured book",
        body: "Dr. Harrell is the lead editor of \"Sleep, Craniofacial Form, and Airway Function Disorders: An Interdisciplinary approach to Assessment, Diagnosis, Management, and Prevention,\" in press with Springer Publishing for 2026-2027, co-edited with Dr. David Gozal, MD (Dean, Joan C. Edwards School of Medicine, Marshall University) and Dr. David McIntosh, MBBS, FRACS, PhD (pediatric ENT, Australia).",
      },
      {
        id: 4, kind: "cta", heading: "Airway Breathing Academy",
        body: "Co-founder of Airway Breathing Academy",
        cta_url: "http://www.AirwayBreathingAcademy.com",
        cta_label: "Visit Airway Breathing Academy →",
      },

    ],
    forms: [
      { id: 1, name: "DW OSA (Child)" }, { id: 2, name: "Child C-GASP", to: "/patient-forms?tab=cgasp" }, { id: 3, name: "SDIS" },
      { id: 4, name: "Info: Child SDB" }, { id: 5, name: "DW OSA (Adult)" }, { id: 6, name: "Epworth", to: "/patient-forms?tab=epworth" },
      { id: 7, name: "STOP-BANG", to: "/patient-forms?tab=stopbang" }, { id: 8, name: "Info: Adult SDB" },
      { id: 9, name: "Physician Written Order" }, { id: 10, name: "CPAP Intolerant Form", to: "/patient-forms?tab=cpap" },
      { id: 11, name: "Consent Forms (CBCT, Model Release, Informed Consent for Treatment)" },
    ],
  },




"airway-therapies": {
  title: "Airway Therapies",
  short_description: "Treatment approaches for improving breathing, airway function, and sleep-related breathing disorders.",
  hero_image: "/images/scanner-patient-3600.png",

  sections: [
    {
      id: 1,
      kind: "rich_text",
      heading: "Therapies for Children",
      body: "Treatment options for children are focused on improving airway development, nasal breathing, and healthy growth patterns."
    },

    {
      id: 2,
      kind: "treatment_cards",
      heading: "Child Airway Therapies",
      items: [
        {
          title: "Expansion Therapy",
          body: "Widening a narrow palate can increase nasal volume and support easier nasal breathing."
        },
        {
          title: "Nasal / Septum / Turbinate Therapy",
          body: "Coordinated with ENT colleagues to address nasal obstruction contributing to mouth breathing."
        },
        {
          title: "T&A (Tonsil & Adenoid) Coordination",
          body: "Coordination with ENT providers when enlarged tonsils or adenoids affect breathing."
        }
      ]
    },

    {
      id: 3,
      kind: "rich_text",
      heading: "Therapies for Adults",
      body: "Adult airway therapies focus on reducing airway collapse and improving sleep breathing."
    },

    {
      id: 4,
      kind: "treatment_cards",
      heading: "Adult Airway Therapies",
      items: [
        {
          title: "Oral Appliance Therapy",
          body: "A custom mandibular advancement device used as a CPAP alternative."
        },
        {
          title: "MMA Surgery",
          body: "Maxillo-Mandibular Advancement coordinated with surgeons for severe cases."
        },
        {
          title: "CPAP Alternatives",
          body: "Options for patients who cannot tolerate CPAP therapy."
        }
      ]
    }
  ],

  forms: []
},



  "tmj-disorders": {
    title: "TMJ Disorders (Jaw Dysfunction)",
    short_description: "Temporomandibular Joint Disorders -- a dysfunction of the two jaw joints just in front of the ears.",
    hero_image: "/images/dr-harrell-headshot.png",
    sections: [
      {
        id: 1, kind: "rich_text", heading: "Why the TM joints are unique",
        body: "The two jaw joints (left and right) are connected by one bone, the mandible -- you cannot move one TMJ without moving the other. The teeth, at the other end of the mandible, complete the system. If the joints deteriorate (e.g. degenerative arthritis) or teeth are missing/malaligned, the whole system becomes unstable, affecting the joints, the teeth/bite, and even the airway space.",
      },
      {
        id: 2, kind: "rich_text", heading: "Splint / orthotic therapy",
        body: "A removable device, usually fitted over the lower teeth, worn full-time (except eating and brushing) for weeks or months to reduce overloading forces and inflammation -- similar to a cast or sling for a joint injury. As pain and dysfunction resolve, wear is tapered down, often to nighttime only.",
      },
      {
        id: 3, kind: "rich_text", heading: "InvisaTMJ(c) -- Dr. Harrell's patented approach",
        body: "Dr. Harrell holds a patent (patent pending) on using invisible aligner therapy -- InvisaTMJ(c) -- to control TMJ positioning while moving teeth to a more stable position. Harrell Orthodontics was first to use this therapy, which has proven effective long-term.",
      },
      {
        id: 4, kind: "rich_text", heading: "Jaw surgery, when needed",
        body: "Arthrocentesis (flushing the joints to reduce inflammation and scar tissue); Arthroscopic Surgery (camera-guided repair of disc/inflammation/scar tissue); Open Joint Surgery (for more extensive disc damage, usually confirmed by MRI first); Total Joint Replacement (when damage is extensive and conservative therapies have failed); and MMA Surgery (Maxillo-Mandibular Advancement, for severe jaw deformity, often used for patients with severe sleep apnea and a contributing skeletal/dental deformity).",
      },
      {
        id: 5, kind: "treatment_cards", heading: "TMJ Treatments",
        items: [
          { title: "Splint Therapy", body: "A removable orthotic worn to reduce overloading forces and inflammation -- the conservative first step for most patients." },
          { title: "InvisaTMJ\u00A9", body: "Dr. Harrell's patented use of invisible aligner therapy to control TMJ positioning while moving teeth to a more stable position." },
          { title: "Orthodontic TMJ Therapy", body: "Coordinating bite correction with joint stability, so the teeth and jaw joints move toward a stable relationship together." },
          { title: "Surgical Options", body: "Arthrocentesis, arthroscopic surgery, open joint surgery, total joint replacement, or MMA surgery -- reserved for cases that don't resolve with conservative care." },
        ],
      },
    ],
    forms: [
      { id: 1, name: "DW TMJ" }, { id: 2, name: "Info: TMJ" }, { id: 3, name: "TMJ Pain Sheet", to: "/patient-forms?tab=tmjpain" },
      { id: 4, name: "Epworth / STOP-BANG", to: "/patient-forms?tab=epworth" }, { id: 5, name: "InvisaTMJ(c) Consent (Patent)" },
      { id: 6, name: "Consent Forms (CBCT, Model Release, Informed Consent for Treatment)" },
      { id: 7, name: "TMJ Retrusive Bracing Splint" },
    ],
  },
  "airway-diagnostics": {
    title: "Airway Diagnostics",
    short_description: "The latest in 3D technology, to understand \"The Anatomic Truth.\"",
    hero_image: "/images/scanner-patient-3600.png",
    sections: [
      {
        id: 1, kind: "stat_callout",
        body: "We use the latest in 3D technology in order to understand \"The Anatomic Truth.\"",
      },
      {
        id: 2, kind: "rich_text", heading: "First in Alabama, first in the USA",
        body: "Our office is the FIRST in ALABAMA to have ConeBeam CT (CBCT) dental 3D X-ray imaging (i-cat.com) -- a very low radiation dose 3D image. Our office is the FIRST in the USA to combine CBCT imaging with true 3D facial imaging (3dmd.com).",
      },
      {
        id: 3, kind: "rich_text", heading: "Nasal airflow testing",
        body: "Our office is the FIRST in the USA to also combine nasal resistance testing: 4-Phase High Resolution Rhinomanometry (GM Instruments) to assess nasal resistance and nasal air flow; Acoustic Rhinometry to evaluate the structure of the nasal cavity (GM Instruments); and PNIF -- Peak Nasal Inspiratory Flow -- to measure inspiratory nasal flow (GM Instruments).",
      },
      {
        id: 4, kind: "rich_text", heading: "Why nasal airflow matters for orthodontics",
        body: "The nose and the upper jaw are ONE BONE, and a narrow upper jaw equals a narrow nasal cavity. It is necessary for children and adults to breathe through the nose for normal facial growth and development. Narrow jaws lead to crooked teeth and \"bad bites.\"",
      },
      {
        id: 5, kind: "rich_text", heading: "No messy impressions",
        body: "Our office also has 3D intraoral scanning (CareStream 3600), so we do not have to take messy impressions -- and 3D printing capability, to 3D print dental models in-office for making dental/orthodontic appliances. Our practice is the ONLY one in the USA to have all of this high technology in a private practice.",
      },
      {
        id: 6, kind: "rich_text", heading: "TeleMedicine",
        body: "TeleMedicine video conference visits are available by appointment. There is a charge for this time with the doctor.",
      },
    ],
    forms: [],
  },
};

export const mockPagesList = Object.entries(mockPages).map(([slug, p]) => ({
  id: slug,
  slug,
  title: p.title,
  short_description: p.short_description,
  hero_image: p.hero_image,
  is_published: true,
}));

// ---- Team --------------------------------------------------------------
// Only Dr. Harrell is named with real bio detail in the client's docs.
// Front-desk/clinical staff members exist but were NOT given to us with
// names, titles, or photos -- so we do not invent generic staff cards.
// See ASSET_AUDIT.md.
export const mockTeam = [
  {
    id: 1,
    name: "William (Bill) E. Harrell, Jr.",
    role_title: "Founder & Orthodontist",
    credentials: "DMD",
    specialty: "Board-Certified Orthodontist (ABO); Certified in Dental Sleep Medicine",
    photo: "/images/dr-harrell-team-photo.jpg",
    is_doctor: true,
    bio: "Dr. Harrell is married to Joyce (Jay) Harrell. They have 2 children, William (Bill) III, and Tatum Harrell Schroeder and 2 grandchildren Will and Sara Tatum Schroeder.\n\nDr. William (Bill) Harrell is originally from Columbus, GA. He graduated from the University of Alabama in Tuscaloosa with a double major in Chemistry and Math and a minor in Biology, then graduated from the UAB School of Dentistry in Birmingham in 1975 with his Doctor of Dental Medicine (DMD). He completed his orthodontic residency at the University of Pennsylvania School of Dental Medicine in Philadelphia in 1977.\n\nHe is in private orthodontic practice in Alexander City, Alabama, and is a Board-Certified Orthodontist (ABO). Dr. Harrell is the first orthodontic private practice in Alabama to have ConeBeam CT (CBCT) and the first in the USA to combine both ConeBeam CT (CBCT) and 3D facial imaging.\n\nDr. Harrell is presently writing and will be the lead Editor of a textbook, \"Sleep, Craniofacial Form, and Airway Function Disorders: An Interdisciplinary approach to Assessment, Diagnosis, Management, and Prevention,\" in press with Springer Publishing for 2026-2027.\n\nTeaching: Dr. Harrell is a Professor at the University of Alabama at Birmingham, Orthodontic Department, where he teaches and lectures on Cone Beam CT imaging, airway, and TMJ disorders to doctors from all over the world. He publishes scientific articles, chapters, and books on these subjects.",
    education: "DMD -- University of Alabama at Birmingham School of Dentistry (1975)\nOrthodontic Residency -- University of Pennsylvania School of Dental Medicine (1977)\nBS, Chemistry & Math (minor Biology) -- University of Alabama, Tuscaloosa",
  },
  {
    id: 2, name: "Tori", role_title: "Staff", specialty: "", photo: null, is_doctor: false,
    // bio: "", education: "", pending_note: "Named in the client's team list -- photo, title, and bio not yet provided.",
  },
  {
    id: 3, name: "Jessica", role_title: "Staff", specialty: "", photo: null, is_doctor: false,
    // bio: "", education: "", pending_note: "Named in the client's team list -- photo, title, and bio not yet provided. (Also the office's patient-forms contact: Jessica.drharrell@gmail.com)",
  },
  {
    id: 4, name: "Haley", role_title: "Staff", specialty: "", photo: null, is_doctor: false,
    // bio: "", education: "", pending_note: "Named in the client's team list -- photo, title, and bio not yet provided.",
  },
  {
    id: 5, name: "Bill", role_title: "Staff", specialty: "", photo: null, is_doctor: false,
    // bio: "", education: "", pending_note: "Added to Team page per client review 8-10-2026 -- photo and bio not yet provided.",
  },
];


// ---- Videos -------------------------------------------------------------
// Titles/topics are the client's real listed video assets. We do NOT have
// the actual video files or transcripts, so no caption/testimonial text is
// invented. Per client review 8-12-2026: the id 3/4 name labels were
// swapped (Madison Hamlett's video was captioned "Karen Treadwell", and
// Karen Treadwell's video just said "Patient Testimonial") -- corrected.
export const mockVideos = [
  { id: 1, title: "Scout T -- Orthodontic Patient", category: "patient_testimonial", video_url: "https://www.youtube.com/embed/A8PYIms1sq0", thumbnail: null },
  { id: 2, title: "Mary B -- TMJ Patient", category: "patient_testimonial", video_url: "https://www.youtube.com/embed/jMvgAnllcww", thumbnail: null },
  { id: 3, title: "Maggie and mom H -- Early Treatment Case", category: "patient_testimonial", video_url: "https://www.youtube.com/embed/CYk1AdwVWto", thumbnail: null },
  { id: 4, title: "Karen T -- Sleep Patient", category: "patient_testimonial", video_url: "https://www.youtube.com/embed/JvXYlGdvuqQ", thumbnail: null },
];

// ---- Financing -----------------------------------------------------------
// Cherry is explicitly instructed to be primary/largest/first. Copy is the
// client's actual widget copy; no invented taglines for the others.
export const mockFinancing = [
  {
    id: 1, kind: "cherry", display_name: "Cherry", is_primary: true,
    tagline: "Buy Now, Pay Later -- monthly payments designed for you.",
    learn_more_url: "https://pay.withcherry.com/harrell-orthodontics",
  },
  { id: 2, kind: "credit_cards", display_name: "Credit Cards", is_primary: false, tagline: "", learn_more_url: "" },
  { id: 3, kind: "hsa", display_name: "Health Savings Accounts (HSA)", is_primary: false, tagline: "", learn_more_url: "" },
  { id: 4, kind: "health_financing_direct", display_name: "Health Financing Direct", is_primary: false, tagline: "", learn_more_url: "https://gohfd.com/" },
  { id: 5, kind: "carecredit", display_name: "CareCredit", is_primary: false, tagline: "", learn_more_url: "https://www.carecredit.com/go/RWH396/" },
];
// Note: OAC (a financing option present in earlier drafts) has been removed per the client's final requirements.

// ---- Publications --------------------------------------------------------
export const mockFeaturedBook = {
  title: "Sleep, Craniofacial Form, and Airway Function Disorders: An Interdisciplinary approach to Assessment, Diagnosis, Management, and Prevention",
  publisher: "Springer Publishing", expected: "2026-2027",
  editors: "William E. Harrell Jr., DMD; David Gozal, MD; David McIntosh, MBBS, FRACS, PhD",
  co_authors: 34, chapters: 44,
  cover_image: "/images/book-cover-harrell-textbook.jpeg",
  cover_note: "Book cover placeholder used until the client's final cover is available.",
  // Title confirmed by client review 8-10-2026 -- the earlier working title
  // and the conflicting-titles note that used to live here are no longer
  // needed now that Dr. Harrell has confirmed the title above.
  co_editors_note:
    "In addition to Dr. Harrell being the main Editor and Co-author of this medical textbook, the two other Co-Editors are:\n\n" +
    "Dr. David Gozal, MD a pediatric pulmonologist, Dean of the Joan Edwards Medical School at Marshall University. He is the most prolific author in the world on Sleep Disorders, especially in children.\n\n" +
    "Dr. David McIntosh a world renown pediatric ENT in Australia and has written many books and he and Dr. Harrell have started The Airway Breathing Academy (training.airwaybreathingacademy.com), a platform for parents, patients, and professionals to educate themselves on the importance of airway, breathing, and sleep.",
};

export const mockBookChapters = [
  { id: 1, title: "Chapter in -- Jacobson", authors: "William E. Harrell, Jr., DMD", cover_image: "/images/book-chapter-jacobson.jpeg" },
  { id: 2, title: "Chapter in -- CBCT (Springer)", authors: "William E. Harrell, Jr., DMD", cover_image: "/images/book-chapter-cbct-springer.png" },
  { id: 3, title: "Chapter in -- Essentials in Orthodontics", authors: "William E. Harrell, Jr., DMD", cover_image: "/images/book-chapter-essentials-ortho.jpeg" },
];

// export const mockProfessionalTextbooks = [
//   { id: 1, title: "Pediatric Sleep Medicine: Mechanisms and Comprehensive Guide to Clinical Evaluation and Management", authors: "SpringerLink", cover_image: "/images/professional-pediatric-sleep-medicine.jpeg" },
//   { id: 2, title: "A Clinical Outline of Temporomandibular Joint Diagnosis and Treatment", authors: "William B. Farrar, William L. McCarty", cover_image: "/images/professional-tmj-farrar-mccarty.jpeg" },
//   { id: 3, title: "Specialty Imaging: Temporomandibular Joint and Sleep-Disordered Breathing", authors: "Dania Tamimi, BDS, DMSc", cover_image: "/images/professional-specialty-imaging-tamimi.jpeg" },
// ];


export const mockProfessionalTextbooks = [
  {
    id: 1,
    title: "Pediatric Sleep Medicine: Mechanisms and Comprehensive Guide to Clinical Evaluation and Management",
    authors: "Springer Publishing",
    cover_image: "/images/professional-pediatric-sleep-medicine.jpeg",
    url: "https://link.springer.com/",
  },
  {
    id: 2,
    title: "A Clinical Outline of Temporomandibular Joint Diagnosis and Treatment",
    authors: "William B. Farrar, William L. McCarty",
    cover_image: "/images/professional-tmj-farrar-mccarty.jpeg",
    url: "https://www.amazon.com/s?k=A+Clinical+Outline+of+Temporomandibular+Joint+Diagnosis+and+Treatment",
  },
  {
    id: 3,
    title: "Specialty Imaging: Temporomandibular Joint and Sleep-Disordered Breathing",
    authors: "Dania Tamimi",
    cover_image: "/images/professional-specialty-imaging-tamimi.jpeg",
    url: "https://www.amazon.com/s?k=Specialty+Imaging+Temporomandibular+Joint+Sleep+Disordered+Breathing",
  },
];

// export const mockSuggestedReading = [
//   { id: 1, title: "Snored to Death: Are You Dying in Your Sleep?", authors: "Dr. David McIntosh, PhD", cover_image: "/images/reading-snored-to-death.jpeg" },
//   { id: 2, title: "Don't Ignore the Snore", authors: "David McIntosh, MBBS, FRACS, PhD", cover_image: "/images/reading-dont-ignore-the-snore.jpeg" },
//   { id: 3, title: "Sleep Disordered Breathing: A Parent's Guide", authors: "David McIntosh", cover_image: "/images/reading-sdb-parents-guide.jpeg" },
//   { id: 4, title: "Breathe, Sleep, Thrive", authors: "Shreen Lim", cover_image: "/images/reading-breathe-sleep-thrive.jpeg" },
//   { id: 5, title: "Sleep Wrecked Kids: Helping Parents Raise Happy, Healthy Kids, One Sleep at a Time", authors: "Sharon Moore", cover_image: "/images/reading-sleep-wrecked-kids.jpeg" },
//   { id: 6, title: "The Very Stuffy Nose", authors: "Kelly Richardson (Two Penny Publishing, 2022)", cover_image: "/images/reading-very-stuffy-nose.jpeg" },
//   { id: 7, title: "Breath: The New Science of a Lost Art", authors: "James Nestor", cover_image: "/images/reading-breath-james-nestor.jpeg" },
//   { id: 8, title: "Gasp!: Airway Health -- The Hidden Path to Wellness", authors: "Dr. Michael Gelb, Dr. Howard Hindin", cover_image: "/images/reading-gasp-airway-health.jpeg" },
//   { id: 9, title: "Putting Sleep Problems to Bed", authors: "Lisa Medalie, David Gozal", cover_image: "/images/reading-putting-sleep-problems-to-bed.jpeg" },
// ];

export const mockSuggestedReading = [
  {
    id: 1,
    title: "Snored to Death: Are You Dying in Your Sleep?",
    authors: "Dr. David McIntosh",
    cover_image: "/images/reading-snored-to-death.jpeg",
    url: "https://www.amazon.com/s?k=Snored+to+Death+David+McIntosh",
  },
  {
    id: 2,
    title: "Don't Ignore the Snore: Over 100 Scientists Explain Why",
    authors: "Dr. David McIntosh",
    cover_image: "/images/reading-dont-ignore-the-snore.jpeg",
    url: "https://www.amazon.com/s?k=Dont+Ignore+the+Snore+David+McIntosh",
  },
  {
    id: 3,
    title: "Sleep Disordered Breathing: A Parent's Guide",
    authors: "Dr. David McIntosh",
    cover_image: "/images/reading-sdb-parents-guide.jpeg",
    url: "https://www.amazon.com/s?k=Sleep+Disordered+Breathing+A+Parents+Guide",
  },
  {
    id: 4,
    title: "Breathe, Sleep, Thrive",
    authors: "Shereen Lim",
    cover_image: "/images/reading-breathe-sleep-thrive.jpeg",
    url: "https://www.amazon.com/s?k=Breathe+Sleep+Thrive+Shereen+Lim",
  },
  {
    id: 5,
    title: "Sleep Wrecked Kids",
    authors: "Sharon Moore",
    cover_image: "/images/reading-sleep-wrecked-kids.jpeg",
    url: "https://www.amazon.com/s?k=Sleep+Wrecked+Kids+Sharon+Moore",
  },
  {
    id: 6,
    title: "The Very Stuffy Nose",
    authors: "Kelley Richardson",
    cover_image: "/images/reading-very-stuffy-nose.jpeg",
    url: "https://www.amazon.com/s?k=The+Very+Stuffy+Nose+Kelley+Richardson",
  },
  {
    id: 7,
    title: "Breath: The New Science of a Lost Art",
    authors: "James Nestor",
    cover_image: "/images/reading-breath-james-nestor.jpeg",
    url: "https://www.amazon.com/s?k=Breath+James+Nestor",
  },
  {
    id: 8,
    title: "Gasp!: Airway Health - The Hidden Path To Wellness",
    authors: "Dr. Michael Gelb, Dr. Howard Hindin",
    cover_image: "/images/reading-gasp-airway-health.jpeg",
    url: "https://www.amazon.com/s?k=Gasp+Airway+Health",
  },
  {
    id: 9,
    title: "Putting Sleep Problems to Bed",
    authors: "Lisa Medalie, David Gozal",
    cover_image: "/images/reading-putting-sleep-problems-to-bed.jpeg",
    url: "https://www.amazon.com/s?k=Putting+Sleep+Problems+to+Bed",
  },
];

export const mockPublications = [
  { id: 1, title: "Published articles (full list at drwilliamharrell.academia.edu)", kind: "article", authors: "William E. Harrell, Jr., DMD", year: null },
  { id: 2, title: "Patent -- InvisaTMJ\u00A9 (Invisible aligner TMJ therapy) -- Patent Pending", kind: "patent", authors: "William E. Harrell, Jr., DMD", year: null },
];

export const mockEvents = []; // No specific dated lectures/events were provided yet.

// ---- Referral directory (real, named) ------------------------------------
// From the client's "REFERRALS by me to other HC providers" list.
// Only names/specialties/affiliations given were provided -- no emails were
// supplied in the docs, so email fields are intentionally left blank.
export const mockProviders = [
  { id: 1, name: "Dr. Christopher Hope, MD", specialty: "Sleep Physician", location: "" },
  { id: 2, name: "Dr. Tony McLeod, MD", specialty: "ENT", location: "" },
  { id: 3, name: "Dr. Bill Blythe, MD", specialty: "ENT (Styles / Whatley)", location: "" },
  { id: 4, name: "Dr. Mike Koslin, DMD", specialty: "Oral Surgeon -- TMJ, MMA", location: "" },
  { id: 5, name: "Dr. Patrick Lewis, MD, DMD", specialty: "Oral Surgeon -- MMA, Sleep", location: "" },
  { id: 6, name: "Dr. Brittany Maten, DMD", specialty: "Periodontist", location: "" },
  { id: 7, name: "Dr. TJ Fuqua", specialty: "Oral & Facial Surgery", location: "OFS Auburn" },
  { id: 8, name: "Dr. Ken Zouhary", specialty: "Oral & Facial Surgery", location: "OFS Auburn" },
  { id: 9, name: "Dr. Brannon Heape", specialty: "Oral & Facial Surgery", location: "OFS Auburn" },
  { id: 10, name: "Dr. Chelsea Johnson", specialty: "Oral & Facial Surgery", location: "OFS Auburn" },
  { id: 11, name: "Dr. Richard Baxter, DMD", specialty: "Pediatric Dentist -- Tongue Tie Release", location: "Alabama Tongue Tie Center, Pelham, AL" },
  { id: 12, name: "Renata Nehme, RDH, OMFT", specialty: "Myofunctional Therapy", location: "Savannah, GA" },
  { id: 13, name: "Lauren Hughes, SLP, OMFT", specialty: "Myofunctional Therapy / Speech-Language Pathology", location: "Birmingham, AL" },
  { id: 14, name: "Dr. Sally & Brooks Lamberth, DMD", specialty: "General Dentist", location: "Alexander City, AL" },
  { id: 15, name: "Dr. Wendy Holder, DMD", specialty: "General Dentist", location: "Alexander City, AL" },
  { id: 16, name: "Dr. James Leonard, DMD", specialty: "General Dentist", location: "Alexander City, AL" },
  { id: 17, name: "Dr. Wiggins, DMD", specialty: "General Dentist", location: "Alexander City, AL" },
  { id: 18, name: "Dr. George Hardy, DMD", specialty: "General Dentist", location: "Alexander City, AL" },
  { id: 19, name: "Dr. Joni Price, DMD", specialty: "General Dentist", location: "Alexander City, AL" },
  { id: 20, name: "Sarrell", specialty: "Dental Practice", location: "Alexander City, AL" },
  { id: 21, name: "Dr. Jim Phillips, DMD", specialty: "General Dentist", location: "Auburn/Opelika, AL" },
  { id: 22, name: "Dr. Stephanie Stephens", specialty: "General Dentist", location: "Auburn/Opelika, AL" },
  { id: 23, name: "Dr. Jose Reynolds, DMD", specialty: "General Dentist", location: "Auburn/Opelika, AL" },
  { id: 24, name: "Dr. Karen Davidson", specialty: "Colleague / Co-author", location: "" },
  { id: 25, name: "Dr. David McIntosh", specialty: "Pediatric ENT", location: "Australia" },
  { id: 26, name: "Dr. David Gozal, MD", specialty: "Sleep Medicine -- Dean, Joan C. Edwards School of Medicine", location: "Marshall University" },
  { id: 27, name: "Dr. Jerry Simmons, MD", specialty: "Sleep Medicine", location: "" },
  { id: 28, name: "Dr. Steve Carstensen, DDS", specialty: "Dental Sleep Medicine", location: "" },
  { id: 29, name: "Dr. Audrey Yoon, DDS", specialty: "Colleague / Co-author (C-GASP)", location: "" },
];

// ---- Dashboard (staff) demo data ------------------------------------------
// These remain EMPTY (not fabricated placeholder rows) -- the practice
// doesn't have real patient/appointment records in this system yet.
export const mockPatients = [];
export const mockAppointments = [];
export const mockIntakeSubmissions = [];
export const mockReferrals = [];
export const mockDashboardStats = {
  total_patients: 0,
  active_patients: 0,
  appointments_today: 0,
  new_intake_forms_week: 0,
  unreviewed_intake_forms: 0,
  pending_referrals: 0,
  appointment_status_breakdown: { requested: 0, confirmed: 0, completed: 0, cancelled: 0, no_show: 0 },
};
