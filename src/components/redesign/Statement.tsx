import { useRef } from "react";
import gsap from "gsap";
import { useSectionMotion } from "./motion";

const STATEMENT = "Interfaces rápidas, acessíveis e feitas com cuidado de produto.";

export default function Statement() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, ({ motion, desktop }, scope) => {
    if (!motion) return;
    const inner = scope.querySelector(".rd-statement__inner");
    const text = scope.querySelector(".rd-statement__text");
    const words = scope.querySelectorAll(".rd-statement__word");
    // Approach: the whole block (eyebrow included) fades and rises in, with the words already at full opacity,
    // so no dimmed copy of the sentence lingers at the bottom of the previous frame.
    gsap.fromTo(inner, { opacity: 0, y: 60 }, {
      opacity: 1,
      y: 0,
      ease: "none",
      scrollTrigger: { trigger: scope, start: "top 85%", end: "top 15%", scrub: true, invalidateOnRefresh: true },
    });
    // Pinned: words dim to .15 only once the pin starts, then light up one by one (≈120vh desktop, ≈80vh mobile).
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: scope, start: "top top", end: desktop ? "+=120%" : "+=80%", pin: true, scrub: desktop ? .6 : true, invalidateOnRefresh: true },
    });
    // The dim is a set just after 0 (a set at 0 would render immediately, before the pin) and reverts when scrolling back.
    tl.fromTo(text, { scale: .92 }, { scale: 1, duration: 1 }, 0)
      .set(words, { opacity: .15 }, .001)
      .to(words, { opacity: 1, duration: .4, stagger: .6 / Math.max(words.length - 1, 1) }, .02);
  });

  return (
    <section ref={root} className="rd-statement" aria-labelledby="statement-title">
      <div className="rd-statement__inner">
        <p className="rd-eyebrow">O que eu faço</p>
        <h2 className="rd-statement__text" id="statement-title">
          {STATEMENT.split(" ").map((word, index, all) => (
            <span key={`${word}-${index}`}>
              <span className="rd-statement__word">{word}</span>
              {index < all.length - 1 ? " " : null}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
