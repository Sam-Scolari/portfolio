import Game, { Scene, Image, Sprite } from "@sam-scolari/game-engine";
import { onMount } from "solid-js";

export default function LunarLander() {
  onMount(() => {
    const canvas = document.getElementById("lunar-lander") as HTMLCanvasElement;
    const game = new Game(canvas);
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

    const shipSprite = new Sprite("/lunar-lander/ship.svg", 82, 83.4);
    const ship = new Image(shipSprite);
    ship.position = { x: canvas.width / 2, y: canvas.height / 2 };
    let blinking = true;
    ship.onUpdate = () => {
      if (blinking && Math.floor(Date.now() / 450) % 2) {
        ship.visible = false;
      } else ship.visible = true;

      if (!blinking) {
        if (ship.position.y < canvas.height - ship.size.height / 2) {
          ship.position.y += 1;
        }
      }
    };

    const scene = new Scene();
    scene.background = "black";
    scene.add(ship);

    game.load(scene);

    game.onKeyDown((e) => {
      if (e.key === "s") {
        blinking = false;
      }
    });

    game.start();
  });
  return <canvas id="lunar-lander" class="w-full h-full" />;
}
