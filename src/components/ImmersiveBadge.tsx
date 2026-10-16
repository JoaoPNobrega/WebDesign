import "./ImmersiveBadge.css";
import { useLang } from "@/lib/i18n";

/**
 * Réplica fiel do `immersive-badge` do projeto LioPortfolio
 * (WEBXR_MODULE / HEADBUTT VR / PLAYABLE, com mini-cubo 3D).
 */
export default function ImmersiveBadge({
  href = "/3d",
  visible = true,
  inline = false,
}: {
  href?: string;
  visible?: boolean;
  /** Versão no fluxo do rodapé (usada só no mobile). */
  inline?: boolean;
}) {
  const { tx } = useLang();
  return (
    <a
      className={`ib-immersive-badge${visible ? " is-visible" : ""}${inline ? " is-inline" : ""}`}
      href={href}
      aria-label={tx({ "pt-BR": "CESAR School — Crachá 3D — Interativo", "en-US": "CESAR School — 3D Badge — Interactive" })}
    >
      <span className="ib-badge-corner tl" />
      <span className="ib-badge-corner tr" />
      <span className="ib-badge-corner bl" />
      <span className="ib-badge-corner br" />
      <span className="ib-badge-scanline" />
      <span className="ib-badge-mini-cube" aria-hidden="true">
        <span className="ib-mini-face ib-mini-front" />
        <span className="ib-mini-face ib-mini-back" />
        <span className="ib-mini-face ib-mini-left" />
        <span className="ib-mini-face ib-mini-right" />
        <span className="ib-mini-face ib-mini-top" />
        <span className="ib-mini-face ib-mini-bottom" />
      </span>
      <span className="ib-badge-copy">
        <span>CESAR_SCHOOL</span>
        <strong>{tx({ "pt-BR": "CRACHÁ 3D", "en-US": "3D BADGE" })}</strong>
        <small>
          <span />
          {tx({ "pt-BR": "INTERATIVO", "en-US": "INTERACTIVE" })}
        </small>
      </span>
    </a>
  );
}
