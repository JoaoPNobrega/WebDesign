import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import type { SiteLanguage } from "@/lib/site-language";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  language: SiteLanguage;
}

const modalCopy = {
  "pt-BR": {
    soon: "Em breve: detalhes completos do projeto",
    body:
      "Estamos preparando uma exibi\u00E7\u00E3o cinematogr\u00E1fica para este trabalho, incluindo estudos de caso, processos de design e resultados t\u00E9cnicos.",
    status: "Status: carregando ativos...",
    close: "Fechar modal",
  },
  "en-US": {
    soon: "Coming soon: full details for the project",
    body:
      "We are preparing a cinematic showcase for this work, including case studies, design process highlights, and technical results.",
    status: "Status: loading assets...",
    close: "Close modal",
  },
} as const;

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  projectName,
  language,
}) => {
  const copy = modalCopy[language];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/5 p-6">
              <h2 className="text-3xl font-bold uppercase tracking-tighter text-[#A7EF9E]">
                {projectName}
              </h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                aria-label={copy.close}
              >
                <X size={24} />
              </button>
            </div>

            <div className="custom-scrollbar flex-1 overflow-y-auto p-12">
              <div className="max-w-2xl">
                <p className="mb-8 text-4xl font-medium italic leading-[1.1] text-white/40">
                  {copy.soon} "{projectName}".
                </p>

                <div className="space-y-6 text-lg text-white/60">
                  <p>{copy.body}</p>

                  <div className="h-px w-24 bg-[#A7EF9E]/30" />

                  <p className="text-sm uppercase tracking-widest font-mono">
                    {copy.status}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#A7EF9E]/20 to-transparent" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
