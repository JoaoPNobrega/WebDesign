/** Keep the hero in the viewport while the destination replaces it underneath. */
export default function aboutCrossfade(hero: HTMLElement, about: HTMLElement, jump: () => void, onComplete: () => void) {
  const bounds = hero.getBoundingClientRect();
  const still = hero.cloneNode(true) as HTMLElement;
  const tracks: Animation[] = [];
  let disposed = false;
  still.classList.add("about-transition__hero");
  still.setAttribute("aria-hidden", "true");
  still.inert = true;
  [still, ...still.querySelectorAll<HTMLElement>("[id]")].forEach(node => node.removeAttribute("id"));
  Object.assign(still.style, { left: `${bounds.left}px`, top: `${bounds.top}px`, width: `${bounds.width}px`, height: `${bounds.height}px` });
  about.dataset.crossfading = "true";
  document.documentElement.dataset.aboutTransition = "true";
  document.body.append(still);

  function animate(element: Element, frames: Keyframe[], duration: number, delay = 0) {
    const track = element.animate(frames, { duration, delay, fill: "both", easing: "cubic-bezier(.4,0,.2,1)" });
    tracks.push(track);
    return track;
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    tracks.forEach(track => track.cancel());
    still.remove();
    delete about.dataset.crossfading;
    delete document.documentElement.dataset.aboutTransition;
    window.removeEventListener("wheel", finish, true);
    window.removeEventListener("touchmove", finish, true);
    window.removeEventListener("resize", finish);
    window.removeEventListener("keydown", onKey, true);
  }
  function finish() {
    if (disposed) return;
    dispose();
    onComplete();
  }
  function onKey(event: KeyboardEvent) {
    if (["Escape", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End", " "].includes(event.key)) finish();
  }
  window.addEventListener("wheel", finish, { capture: true, passive: true });
  window.addEventListener("touchmove", finish, { capture: true, passive: true });
  window.addEventListener("resize", finish);
  window.addEventListener("keydown", onKey, true);

  // This repositioning is concealed by the exact static hero, with no vertical travel.
  jump();
  const photo = still.querySelector(".hero__portrait-stage");
  if (photo) animate(photo, [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(.975)" }], 740);
  [".hero__first-name", ".hero__last-name"].forEach((selector, index) => {
    const word = still.querySelector(selector);
    if (word) animate(word, [{ opacity: 1, translate: `0 0 ${index ? 5 : 0}px` }, { opacity: 0, translate: `${index ? 28 : -28}px 0 ${index ? 5 : 0}px` }], 620, index * 40);
  });
  const signature = still.querySelector(".signature");
  if (signature) animate(signature, [{ opacity: 1 }, { opacity: 0 }], 420);
  const intro = about.querySelector(".about-section__intro");
  if (intro) animate(intro, [{ opacity: 1, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], 900, 100);
  about.querySelectorAll(".github-activity__heading,.github-activity__months,.github-activity__footer").forEach((element, i) => animate(element, [{ opacity: .65 }, { opacity: 1 }], 650, 180 + i * 30));
  const dissolve = animate(still, [{ opacity: 1 }, { opacity: 0 }], 1080);
  void dissolve.finished.then(finish).catch(() => undefined);
  return dispose;
}
