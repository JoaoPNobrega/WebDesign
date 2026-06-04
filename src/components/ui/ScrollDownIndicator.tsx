import "./scroll-down.css";

export default function ScrollDownIndicator({ className }: { className?: string }) {
  return (
    <div className={`sd-scroll ${className ?? ""}`} aria-hidden="true">
      <div className="sd-chevrons">
        <span className="sd-chevron" />
        <span className="sd-chevron" />
      </div>
    </div>
  );
}
