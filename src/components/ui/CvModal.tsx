import { useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, FileText, X } from "lucide-react";

import { useLang } from "@/lib/i18n";
import { copy } from "@/lib/portfolio-copy";

type CvModalProps = {
  open: boolean;
  onClose: () => void;
  pdfUrl: string;
  downloadName?: string;
};

export default function CvModal({ open, onClose, pdfUrl, downloadName = "curriculo.pdf" }: CvModalProps) {
  const { tx } = useLang();

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="cv-modal"
          className="fixed inset-0 z-[1500] flex items-center justify-center px-4 py-6 sm:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.26, ease: "easeOut" }}
          role="dialog"
          aria-modal="true"
          aria-label={tx(copy.cv.title)}
          onClick={onClose}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-[#050505]/94"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative z-10 flex h-[min(90vh,46rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[1.6rem] bg-[#0a0a0b] shadow-[0_50px_160px_rgba(0,0,0,0.75)] ring-1 ring-white/[0.05]"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A7EF9E]/45 to-transparent"
            />

            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex min-w-0 items-center gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A7EF9E]/[0.1] text-[#A7EF9E] ring-1 ring-[#A7EF9E]/25">
                  <FileText className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#A7EF9E]/80">
                    {tx(copy.cv.title)}
                  </p>
                  <p className="truncate text-[0.95rem] font-semibold tracking-tight text-white sm:text-base">
                    {tx(copy.cv.subtitle)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label={tx(copy.cv.close)}
                onClick={onClose}
                className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/45 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/50"
              >
                <X className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
              </button>
            </div>

            {/* Document */}
            <div className="relative flex-1 overflow-hidden px-3 pb-3 sm:px-4 sm:pb-4">
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#15161a] ring-1 ring-white/[0.04]">
                <p className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-mono text-xs uppercase tracking-[0.3em] text-white/25">
                  {tx(copy.cv.loading)}
                </p>
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
                  title={tx(copy.cv.title)}
                  className="relative z-10 h-full w-full"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-2.5 border-t border-white/[0.05] px-5 py-4 sm:px-6">
              <a
                href={pdfUrl}
                download={downloadName}
                className="inline-flex items-center gap-2 rounded-full bg-[#A7EF9E] px-5 py-2.5 font-mono text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#05130a] shadow-[0_10px_30px_rgba(167,239,158,0.18)] transition hover:-translate-y-0.5 hover:bg-[#b8f6af] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/70"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                {tx(copy.cv.download)}
              </a>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/50 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7EF9E]/50"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                {tx(copy.cv.openInNewTab)}
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
