import { onMount } from "solid-js";
import Asteroids from "../games/Asteroids";

export default function MySkillS() {
  onMount(() => {
    const canvas = document.getElementById("my-skills") as HTMLCanvasElement;
    const header = document.getElementById("header") as HTMLDivElement;

    const ratio = 0.9;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio >= ratio) {
          header.style.opacity = "0";
        } else header.style.opacity = "1";
      },
      { threshold: ratio }
    );

    observer.observe(canvas);
  });

  return <Asteroids />;
}
