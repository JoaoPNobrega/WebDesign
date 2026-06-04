import { useState } from "react";
import { motion } from "framer-motion";

import NeuralBrain, { type BrainSkill } from "@/components/ui/NeuralBrain";
import { useLang, type LocalizedText } from "@/lib/i18n";
import { copy } from "@/lib/portfolio-copy";

type SkillGroup = { title: LocalizedText; skills: BrainSkill[] };

const skillGroups: SkillGroup[] = [
  {
    title: { "pt-BR": "Front-end", "en-US": "Front-end" },
    skills: [
      { name: "HTML5", color: "#E34F26" },
      { name: "CSS3", color: "#1572B6" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "React", color: "#61DAFB" },
      { name: "Tailwind CSS", color: "#38BDF8" },
      { name: "Framer Motion", color: "#FF4D8D" },
      { name: "Figma", color: "#F24E1E" },
    ],
  },
  {
    title: { "pt-BR": "Back-end & Dados", "en-US": "Back-end & Data" },
    skills: [
      { name: "Node.js", color: "#3C873A" },
      { name: "Python", color: "#3776AB" },
      { name: "REST APIs", color: "#A7EF9E" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "Machine Learning", color: "#A78BFA" },
      { name: "Dashboards", color: "#38BDF8" },
    ],
  },
  {
    title: { "pt-BR": "Cloud & DevOps", "en-US": "Cloud & DevOps" },
    skills: [
      { name: "AWS", color: "#FF9900" },
      { name: "Cloud", color: "#60A5FA" },
      { name: "Git", color: "#F05032" },
      { name: "Vite", color: "#A26CF6" },
      { name: "IoT", color: "#34D399" },
    ],
  },
  {
    title: { "pt-BR": "Práticas & Metodologias", "en-US": "Practices & Methods" },
    skills: [
      { name: "Arquitetura de Software", color: "#F59E0B" },
      { name: "Testes Automatizados", color: "#22C55E" },
      { name: "TDD", color: "#34D399" },
      { name: "BDD", color: "#2DD4BF" },
      { name: "Scrum", color: "#60A5FA" },
      { name: "Kanban", color: "#38BDF8" },
      { name: "Metodologias Ágeis", color: "#A78BFA" },
      { name: "BPM", color: "#F59E0B" },
      { name: "LGPD", color: "#94A3B8" },
    ],
  },
  {
    title: { "pt-BR": "IA & Automação", "en-US": "AI & Automation" },
    skills: [
      { name: "Claude Code", color: "#D97757" },
      { name: "Codex", color: "#10A37F" },
      { name: "Antigravity", color: "#7C9CF6" },
      { name: "n8n", color: "#EA4B71" },
      { name: "Lovable", color: "#FF6B9D" },
      { name: "Power Automate", color: "#0066FF" },
    ],
  },
];

const SKILL_LIST: BrainSkill[] = skillGroups.flatMap((group, groupIndex) =>
  group.skills.map((skill) => ({ ...skill, groupIndex })),
);

export default function SkillsSection() {
  const { tx } = useLang();
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>(null);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden bg-transparent px-6 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <p className="mb-5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-[#A7EF9E]">
          {tx(copy.skills.eyebrow)}
        </p>
        <h2
          id="skills-heading"
          className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.085em] text-white sm:text-7xl"
        >
          {tx(copy.skills.title)}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">{tx(copy.skills.subtitle)}</p>
        <div className="mx-auto mt-6 flex max-w-full justify-start gap-2.5 overflow-x-auto px-4 pb-2 [scroll-padding-inline:1rem] [scrollbar-width:none] [-ms-overflow-style:none] lg:justify-center [&::-webkit-scrollbar]:hidden">
          {skillGroups.map((group, index) => {
            const isActive = activeGroupIndex === index;

            return (
              <button
                key={group.title["pt-BR"]}
                type="button"
                onMouseEnter={() => setActiveGroupIndex(index)}
                onMouseLeave={() => setActiveGroupIndex(null)}
                onFocus={() => setActiveGroupIndex(index)}
                onBlur={() => setActiveGroupIndex(null)}
                className={`inline-flex shrink-0 items-center rounded-full border px-3.5 py-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/60 ${
                  isActive
                    ? "border-[#A7EF9E]/55 bg-[#A7EF9E]/14 text-white shadow-[0_0_28px_rgba(167,239,158,0.18)]"
                    : "border-white/10 bg-white/[0.035] text-white/48 hover:border-[#A7EF9E]/32 hover:text-white/78"
                }`}
              >
                {tx(group.title)}
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="relative mt-8 h-[clamp(30rem,72vh,48rem)] w-full sm:mt-12">
        <NeuralBrain skills={SKILL_LIST} activeGroupIndex={activeGroupIndex} />
        <ul className="sr-only">
          {skillGroups.map((group) => (
            <li key={group.title["pt-BR"]}>
              {tx(group.title)}: {group.skills.map((skill) => skill.name).join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
