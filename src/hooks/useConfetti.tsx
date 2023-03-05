import confetti from "canvas-confetti";

export default function useConfetti() {
  const COLORS = ["#8247e5", "#e52268", "#ff00e5"];
  const END = Date.now() + 15 * 100;

  function fire() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: COLORS,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: COLORS,
    });

    // Shoot confetti until end
    if (Date.now() < END) {
      requestAnimationFrame(fire);
    }
  }

  return fire;
}
