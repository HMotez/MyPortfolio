/* Writes the pointer position (relative to each card) into --mx/--my on every
   `.bento-card` inside `container`, so their border glows follow the cursor. */
export function trackSpotlight(container, e) {
  for (const card of container.querySelectorAll(".bento-card")) {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
}
