import "./ImmersiveBadge.css";

/**
 * Réplica fiel do `immersive-badge` do projeto LioPortfolio
 * (WEBXR_MODULE / HEADBUTT VR / PLAYABLE, com mini-cubo 3D).
 */
export default function ImmersiveBadge({
  href = "/3d",
  visible = true,
}: {
  href?: string;
  visible?: boolean;
}) {
  return (
    <a
      className={`ib-immersive-badge${visible ? " is-visible" : ""}`}
      href={href}
      aria-label="CESAR School — Crachá 3D — Interativo"
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
        <strong>CRACHÁ 3D</strong>
        <small>
          <span />
          INTERATIVO
        </small>
      </span>
    </a>
  );
}
