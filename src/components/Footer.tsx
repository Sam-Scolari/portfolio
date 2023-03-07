import Game, { Scene } from "@sam-scolari/game-engine";
import { onMount } from "solid-js";

export default function Footer() {
  let canvas: HTMLCanvasElement;

  onMount(() => {
    const game = new Game(canvas, { debug: {} });
    game.clipPath = (() => {
      const path = new Path2D();

      path.moveTo(0, 30);

      let currentX = 0;

      while (currentX <= canvas.width) {
        const x = (Math.random() + 1) * 10;
        const y = (Math.random() + 1) * 15;

        currentX += x;
        path.lineTo(currentX, 10 + y);
      }

      path.lineTo(canvas.width, canvas.height);
      path.lineTo(0, canvas.height);
      path.lineTo(0, 0);

      return path;
    })();

    const scene = new Scene();
    scene.background = "black";
    game.load(scene);

    game.start();
  });
  return (
    <footer class="flex h-[calc(100vh_-_130px)] w-full">
      {/* @ts-ignore */}
      <canvas ref={canvas} class="w-full h-full" />
    </footer>
  );
}
