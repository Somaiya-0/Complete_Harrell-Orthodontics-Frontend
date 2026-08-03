import Hero from "../components/ui/Hero.jsx";
import Section from "../components/ui/Section.jsx";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import TeamCard from "../components/ui/TeamCard.jsx";
import { mockTeam } from "../mockData.js";

export default function Team() {
  const team = mockTeam;

  const doctors = team.filter((m) => m.is_doctor);
  const staff = team.filter((m) => !m.is_doctor);

  return (
    <div>
      <Hero
        eyebrow="Meet The Team"
        title="Meet Dr. Harrell and our fabulous staff"
      />

      <Section tone="white">
        {doctors.map((m) => (
          <div
            key={m.id}
            className="grid md:grid-cols-[300px_1fr] gap-10 mb-4 bg-white border border-ink/10 rounded-3xl overflow-hidden shadow-card"
          >
            {m.photo && (
              <div className="relative w-full md:w-[300px] aspect-[3/4] bg-ink/5 shrink-0">
                <img
                  src={m.photo}
                  alt={m.name}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
            )}

            <div className="p-8 md:py-10 md:pr-10">
              <p className="font-display text-3xl text-ink mb-1">
                {m.name}
                {m.credentials ? `, ${m.credentials}` : ""}
              </p>

              <p className="text-breath font-semibold mb-6">
                {m.specialty || m.role_title}
              </p>

              <p className="text-ink/70 leading-relaxed whitespace-pre-line mb-6">
                {m.bio}
              </p>

              {m.education && (
                <div className="border-t border-ink/10 pt-5">
                  <p className="text-xs uppercase tracking-wide text-ink/40 font-semibold mb-2">
                    Education
                  </p>

                  <p className="text-sm text-ink/70 whitespace-pre-line leading-relaxed">
                    {m.education}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </Section>

      {staff.length > 0 && (
        <Section tone="mist">
          <SectionHeader
            eyebrow="Our Team"
            title="Staff"
            className="mb-8"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staff.map((m) => (
              <TeamCard key={m.id} member={m} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}