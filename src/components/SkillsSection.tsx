import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Monitor, Server, type LucideIcon } from "lucide-react";

import TagSphere, { type Accent } from "@/components/ui/TagSphere";
import { useLang } from "@/lib/i18n";
import { copy } from "@/lib/portfolio-copy";

type SkillGroup = {
  key: string;
  label: string; // language-neutral (Backend / Frontend / DevOps)
  icon: LucideIcon;
  items: string[];
};

// The user's skills, organised into the same three buckets as the reference
// section (Backend / Frontend / DevOps). DevOps doubles as the "tooling,
// automation & ways of working" catch-all.
const skillGroups: SkillGroup[] = [
  {
    key: "frontend",
    label: "Frontend",
    icon: Monitor,
    items: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Framer Motion",
      "Figma",
      "Dashboards",
    ],
  },
  {
    key: "backend",
    label: "Backend",
    icon: Server,
    items: [
      "Node.js",
      "Python",
      "REST APIs",
      "Firebase",
      "Machine Learning",
      "Arquitetura de Software",
      "Testes Automatizados",
      "TDD",
      "BDD",
    ],
  },
  {
    key: "devops",
    label: "DevOps",
    icon: Cloud,
    items: [
      "AWS",
      "Cloud",
      "Git",
      "Vite",
      "IoT",
      "n8n",
      "Power Automate",
      "Lovable",
      "Claude Code",
      "Codex",
      "Antigravity",
      "Scrum",
      "Kanban",
      "Metodologias Ágeis",
      "BPM",
      "LGPD",
    ],
  },
];

// Single mint accent across every group — on-brand with the rest of the site.
const MINT_ACCENT: Accent = {
  color: "#A7EF9E",
  tagBg: "rgba(167,239,158,0.07)",
  tagBorder: "rgba(167,239,158,0.26)",
  tagText: "#BFF3B6",
  line: "#A7EF9E",
};

export default function SkillsSection() {
  const { tx, lang } = useLang();
  const [active, setActive] = useState(0);

  // Measured sliding highlight (like a segmented control) — measuring the
  // active button keeps the pill pixel-perfect regardless of label length.
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });

  useLayoutEffect(() => {
    const el = btnRefs.current[active];
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, [active, lang]);

  const group = skillGroups[active];
  const sphereLabel = `${group.label} ${lang === "pt-BR" ? "habilidades" : "skills"}`;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden bg-transparent px-6 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <p className="mb-4 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-[#A7EF9E]">
            {tx(copy.skills.eyebrow)}
          </p>
          <h2
            id="skills-heading"
            className="text-4xl font-black uppercase tracking-[-0.075em] text-white sm:text-6xl"
          >
            {tx(copy.skills.title)}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
            {tx(copy.skills.subtitle)}
          </p>
        </motion.div>

        {/* Segmented toggle — one per skill group */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div
            role="group"
            aria-label={tx(copy.skills.title)}
            className="relative inline-flex rounded-2xl border border-white/10 bg-white/[0.03] p-1"
          >
            {/* Sliding mint highlight */}
            <span
              aria-hidden="true"
              className="absolute bottom-1 top-1 rounded-xl bg-[#A7EF9E]"
              style={{
                left: pill.left,
                width: pill.width,
                opacity: pill.ready ? 1 : 0,
                boxShadow: "0 0 24px rgba(167,239,158,0.4)",
                transition:
                  "left 0.34s cubic-bezier(0.22,1,0.36,1), width 0.34s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease",
              }}
            />
            {skillGroups.map((g, i) => {
              const Icon = g.icon;
              const on = i === active;
              return (
                <button
                  key={g.key}
                  ref={(el) => {
                    btnRefs.current[i] = el;
                  }}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(i)}
                  className={`relative z-10 flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 font-mono text-[0.8rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/60 ${
                    on ? "text-[#050505]" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <Icon size={16} className={on ? "text-[#050505]" : "text-white/35"} aria-hidden="true" />
                  {g.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 3D draggable tag cloud — remounts per group so the fly-out replays */}
        <div className="mx-auto mt-2 w-full" style={{ maxWidth: 780 }}>
          <TagSphere key={group.key} tags={group.items} accent={MINT_ACCENT} label={sphereLabel} />
        </div>

        {/* Accessible, static fallback of every skill (the cloud is decorative) */}
        <ul className="sr-only">
          {skillGroups.map((g) => (
            <li key={g.key}>
              {g.label}: {g.items.join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
