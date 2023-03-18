import Game, {
  Scene,
  Image,
  Sprite,
  Blink,
  Rigidbody,
  Text,
} from "@sam-scolari/game-engine";
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

    let boost = 100;

    const boostText = new Text([`${boost.toString()}%`]);
    boostText.position = { x: 64, y: 120 };
    boostText.fontSize = 32;
    boostText.fill = "white";
    boostText.onUpdate = () => {
      boostText.textNodes[0] = `${boost.toString()}%`;
    };

    const shipSprite = new Sprite("/lunar-lander/ship.svg", 82, 83.4);
    const ship = new Image(shipSprite);
    ship.position = { x: canvas.width / 2, y: canvas.height / 4 };
    ship.physics = new Rigidbody(ship);
    ship.physics.gravity = 0.02;
    ship.physics.linearDrag = 0;
    let blinking = true;
    ship.onUpdate = (inputs) => {
      if (blinking) {
        ship.physics.lock = true;
        Blink(ship, 450);
      } else {
        ship.physics.lock = false;
        ship.visible = true;
      }

      if (ship.position.y > canvas.height - ship.size.height / 2) {
        ship.position.y = canvas.height - ship.size.height / 2;
      }

      if (inputs[" "]) {
        ship.physics.addForce(0.02, 0);
        boost -= 0.1;
      }

      if (inputs["a"]) {
        ship.physics.addTorque(-(Math.PI / 1000));
      }

      if (inputs["d"]) {
        ship.physics.addTorque(Math.PI / 1000);
      }
    };

    const scene = new Scene();
    scene.background = "black";
    scene.add(ship);
    scene.add(boostText);

    game.load(scene);

    game.onKeyDown((e) => {
      if (["a", "d", " "].includes(e.key)) {
        blinking = false;
      }
    });

    game.start();
  });
  return <canvas id="lunar-lander" class="w-full h-full" />;
}
