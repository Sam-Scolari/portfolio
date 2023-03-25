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
    const game = new Game(canvas, { overrideObserverRatio: 0.2 });
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

    const boostText = new Text([`${boost.toString()}% Fuel`]);
    boostText.position = { x: 64, y: 120 };
    boostText.fontSize = 14;
    boostText.fill = "white";
    boostText.font = "PressStart2P";
    boostText.visible = false;
    boostText.onUpdate = () => {
      boostText.textNodes[0] = `${boost.toFixed(1)}% Fuel`;
    };

    const shipSprite = new Sprite("/lunar-lander/ship.svg", 55, 52.27);
    const shipFireSprite = new Sprite("/lunar-lander/shipFire.svg", 55, 52.27);
    const ship = new Image([shipSprite, shipFireSprite]);

    const footer = document.getElementById("footer") as HTMLElement;
    ship.position = {
      x: canvas.width * 0.9,
      y: footer.clientHeight / 2 - ship.size.height / 2 + 30,
    };
    ship.physics = new Rigidbody(ship);
    ship.physics.gravity = 0.5;
    ship.physics.linearDrag = 0;
    let blinking = true;
    ship.onUpdate = (inputs) => {
      ship.sprites[1].visible = false;

      if (blinking) {
        ship.physics.lock = true;
        Blink(ship, 450);
      } else {
        ship.physics.lock = false;
        ship.visible = true;
      }

      if (ship.position.y > canvas.height - ship.size.height / 2) {
        ship.position.y = canvas.height - ship.size.height / 2;
        ship.physics.velocity = { x: 0, y: 0 };
        boost = 0;
      }

      if (inputs[" "] && boost > 0) {
        ship.physics.addForce(0.7, 0);
        boost -= 0.1;
        ship.sprites[1].visible = true;
      }

      if (inputs["a"]) {
        ship.physics.addTorque(-(Math.PI / 10));
      }

      if (inputs["d"]) {
        ship.physics.addTorque(Math.PI / 10);
      }
    };

    const startText = new Text(["Press [enter] to start"]);
    startText.position = {
      x: canvas.width * 0.9 - 500,
      y: footer.clientHeight / 2 - ship.size.height / 2 + 30 + 12, // 30 is the clip path margin
    };
    startText.fontSize = 18;
    startText.fill = "white";
    startText.font = "PressStart2P";

    const velocityText = new Text(["0 m/s"]);
    velocityText.position = { x: 64, y: 160 };
    velocityText.fontSize = 14;
    velocityText.fill = "white";
    velocityText.font = "PressStart2P";
    velocityText.visible = false;
    velocityText.onUpdate = () => {
      velocityText.textNodes[0] = `${(ship.physics.velocity.y * 100).toFixed(
        2
      )} m/s`;
    };

    const scene = new Scene();
    scene.background = "black";
    scene.add(ship);
    scene.add(boostText);
    scene.add(startText);
    scene.add(velocityText);

    game.load(scene);

    game.onKeyDown((e) => {
      if (["Enter"].includes(e.key)) {
        blinking = false;
        const footer = document.getElementById("footer") as HTMLElement;
        footer.style.height = game.viewport.height + "px";
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
        startText.visible = false;
        boostText.visible = true;
        velocityText.visible = true;
      }
    });

    game.start();
  });
  return <canvas id="lunar-lander" class="w-full h-[calc(100vh_-_130px)]" />;
}
