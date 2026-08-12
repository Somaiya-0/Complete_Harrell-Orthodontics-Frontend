import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { api } from "../api/client.js";
import { withFallback } from "../api/withFallback.js";
import { mockPages } from "../mockData.js";

import Hero from "../components/ui/Hero.jsx";
import Section from "../components/ui/Section.jsx";
import FeatureCard from "../components/ui/FeatureCard.jsx";
import FormCard from "../components/ui/FormCard.jsx";
import CTA from "../components/ui/CTA.jsx";

const TREATMENT_ICON = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M9 12l2 2 4-4" />
    <circle cx="12" cy="12" r="9" />
  </svg>
);


// Convert heading into URL-friendly anchor
function slugifyHeading(heading) {
  return (heading || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}


export default function ContentPage() {
  const { slug } = useParams();
  const location = useLocation();

  const [page, setPage] = useState(null);
  const [notFound, setNotFound] = useState(false);


  // Load page data
  useEffect(() => {
    setPage(null);
    setNotFound(false);

    withFallback(
      () => api.get(`/pages/${slug}/`),
      mockPages[slug] || null
    ).then((data) => {
      if (data) {
        setPage(data);
      } else {
        setNotFound(true);
      }
    });

  }, [slug]);


  // Handle URL hash scrolling
  useEffect(() => {
    if (!page) return;

    if (location.hash) {
      const id = location.hash.replace("#", "");

      setTimeout(() => {
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 200);
    }

  }, [location.hash, page]);


  if (notFound) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="text-ink/60 mb-3">
          This page hasn't been published yet.
        </p>

        <Link 
          to="/" 
          className="text-breath font-medium"
        >
          Back home
        </Link>
      </div>
    );
  }


  if (!page) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-ink/40">
        Loading…
      </div>
    );
  }


  return (
    <div>

      <Hero
        eyebrow="Our Services"
        title={page.title}
        subtitle={page.short_description}
        image={page.hero_image}
      />


      <Section containerClassName="max-w-3xl">

        <div className="space-y-10">

          {(page.sections || []).map((s) => (

            <section
              key={s.id}
              id={
                s.anchor 
                || (s.heading ? slugifyHeading(s.heading) : undefined)
              }
              className="scroll-mt-24"
            >

              {s.heading && (
                <h2 className="font-display text-xl mb-3 text-ink">
                  {s.heading}
                </h2>
              )}



              {s.kind === "rich_text" && (
                <p className="text-ink/75 leading-relaxed whitespace-pre-line">
                  {s.body}
                </p>
              )}



              {s.kind === "image" && s.image && (
                <img
                  src={s.image}
                  alt={s.heading || ""}
                  className="rounded-2xl w-full"
                />
              )}



              {s.kind === "video_embed" && s.video_url && (
                <a
                  href={s.video_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-breath font-medium"
                >
                  Watch video →
                </a>
              )}



              {s.kind === "stat_callout" && (
                <div className="
                  bg-breathlight 
                  border 
                  border-breath/30 
                  rounded-2xl 
                  p-5 
                  text-ink 
                  font-medium 
                  leading-relaxed
                ">
                  {s.body}
                </div>
              )}




              {s.kind === "treatment_cards" && (

                <div className="
                  grid 
                  sm:grid-cols-2 
                  gap-4
                ">

                  {(s.items || []).map((item) => (

                    <FeatureCard
                      key={item.title}
                      icon={TREATMENT_ICON}
                      title={item.title}
                    >
                      {item.body}
                    </FeatureCard>

                  ))}

                </div>

              )}




              {s.kind === "cta" && s.cta_url && (

                <a
                  href={s.cta_url}
                  className="
                    inline-block 
                    bg-breath 
                    text-white 
                    px-6 
                    py-3 
                    rounded-pill 
                    font-semibold
                  "
                >
                  {s.cta_label || "Learn more"}
                </a>

              )}


            </section>

          ))}

        </div>




        {/* {page.forms?.length > 0 && (

          <div className="mt-12">

            <h2 className="font-display text-xl mb-4 text-ink">
              Related Forms
            </h2>


            <div className="
              grid 
              sm:grid-cols-2 
              gap-3
            ">

              {page.forms.map((f) => (

                <FormCard
                  key={f.id}
                  name={f.name}
                  to={f.to}
                  note={f.note}
                />

              ))}

            </div>

          </div>

        )} */}


      </Section>



      <Section tone="mist">
        <CTA />
      </Section>


    </div>
  );
}