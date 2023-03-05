import { onMount } from "solid-js";
import Game, { Image, Text, Scene, Sprite } from "game-engine";

export default function Asteroids() {
  let canvas: HTMLCanvasElement;

  onMount(() => {
    const game = new Game(canvas);
    game.clipPath = () => {
      const path = new Path2D();

      path.moveTo(0, (Math.random() + 1) * 20);

      let currentX = 0;

      while (currentX <= canvas.width) {
        const x = (Math.random() + 1) * 10;
        const y = (Math.random() + 1) * 15;

        currentX += x;
        path.lineTo(currentX, 10 + y);
      }

      path.lineTo(canvas.width, canvas.height);

      while (currentX > 0) {
        const x = (Math.random() + 1) * 10;
        const y = (Math.random() + 1) * 15;

        currentX -= x;
        path.lineTo(currentX, canvas.height - y);
      }

      path.lineTo(0, 0);

      return path;
    };

    const scene = new Scene();
    scene.background = "black";

    const fontSize = 16;
    const font = "PressStart2P";

    const skills = new Text("Skills");
    skills.fontSize = 40;
    skills.font = font;
    skills.fill = "white";
    skills.position = { x: canvas.width / 2, y: canvas.width / 2 };

    scene.add(skills);

    const w = new Text("[w] ");
    w.position = { x: 32, y: canvas.height - 64 };
    w.fontSize = fontSize;
    w.font = font;
    w.fill = "white";
    const move = new Text("move");
    move.font = font;
    move.fontSize = fontSize;
    move.position = { x: w.position.x + 60, y: w.position.y };
    move.fill = "#A9A9A9";

    scene.add(w);
    scene.add(move);

    const shipStationary = new Sprite("/asteroids/ship.svg", 38, 53);
    const shipMoving = new Sprite("/asteroids/ship2.svg", 38, 53);

    shipMoving.visible = false;

    const ship = new Image([shipStationary, shipMoving]);

    let blinking = true;
    ship.position.x = canvas.width / 2 - ship.size.width / 2;
    ship.position.y = canvas.height / 2 - ship.size.height / 2;
    scene.add(ship);

    ship.onUpdate = (inputs) => {
      // Blink
      if (blinking && Math.floor(Date.now() / 450) % 2) {
        ship.visible = false;
      } else ship.visible = true;

      // If ship goes off the right of the screen
      if (ship.position.x > canvas.width + ship.size.width) {
        ship.position.x = 0 - ship.size.width;
      }

      // If ship goes off the left of the screen
      if (ship.position.x < -ship.size.width) {
        ship.position.x = canvas.width + ship.size.width;
      }

      // If ship goes off the bottom of the screen
      if (ship.position.y > canvas.height + ship.size.height) {
        ship.position.y = 0 - ship.size.height;
      }

      // If ship goes off the top of the screen
      if (ship.position.y < -ship.size.height) {
        ship.position.y = canvas.height + ship.size.height;
      }

      if (!ship.sprites[0].visible) {
        ship.sprites[1].visible = false;
        ship.sprites[0].visible = true;
      }
      if (inputs["w"]) {
        if (!ship.sprites[1].visible) {
          ship.sprites[0].visible = false;
          ship.sprites[1].visible = true;
        }
        ship.velocity.x -= Math.sin(ship.direction) * 0.1;
        ship.velocity.y += Math.cos(ship.direction) * 0.1;
      }

      if (inputs["a"]) {
        ship.direction -= Math.PI / 100;
      }

      if (inputs["d"]) {
        ship.direction += Math.PI / 100;
      }

      ship.velocity.x *= 0.99;
      ship.velocity.y *= 0.99;
      ship.position.x -= ship.velocity.x;
      ship.position.y -= ship.velocity.y;
    };

    const asteroids = [
      new Image(new Sprite("/asteroids/javascript.webp")),
      new Image(new Sprite("/asteroids/typescript.webp")),
      new Image(new Sprite("/asteroids/react.webp")),
      new Image(new Sprite("/asteroids/solid.webp")),
      new Image(new Sprite("/asteroids/ethereum.webp")),
      new Image(new Sprite("/asteroids/figma.webp")),
      new Image(new Sprite("/asteroids/tailwind.webp")),
      new Image(new Sprite("/asteroids/graphql.webp")),
      new Image(new Sprite("/asteroids/astro.webp")),
    ];

    asteroids.forEach((asteroid) => {
      asteroid.velocity = {
        x: 0.5 + Math.random() * 0.75,
        y: 0.5 + Math.random() * 0.75,
      };
      asteroid.renderDirection = false;
      asteroid.direction = Math.floor(Math.random() * 2) == 1 ? 1 : -1;

      asteroid.update = () => {
        // If asteroid goes off screen
        if (asteroid.position.x > canvas.width + asteroid.size.width)
          asteroid.position.x = 0 - asteroid.size.width;
        if (asteroid.position.x < -asteroid.size.width)
          asteroid.position.x = canvas.width + asteroid.size.width;
        if (asteroid.position.y > canvas.height + asteroid.size.height)
          asteroid.position.y = 0 - asteroid.size.height;
        if (asteroid.position.y < -asteroid.size.height)
          asteroid.position.y = canvas.height + asteroid.size.height;

        asteroid.position.x += asteroid.velocity.x * asteroid.direction;
        asteroid.position.y += asteroid.velocity.y * asteroid.direction;

        if (!blinking && asteroid.isColliding(ship)) {
          console.log("hit");
          ship.velocity = {
            x: 0,
            y: 0,
          };
          ship.direction = 0;
          ship.position = {
            x: canvas.width / 2 - ship.size.width / 2,
            y: canvas.height / 2 - ship.size.height / 2,
          };
          blinking = true;
        }
      };

      asteroid.position = {
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
      };
      asteroid.size = { width: 80, height: 80 };

      scene.add(asteroid);
    });

    // const w = new Text("[w] ");
    // const move = new Text("move");
    // const controls = new Text([w, move]);
    // controls.position.x = 100;
    // controls.position.y = canvas.height - 100;

    game.onKeyDown((e) => {
      if (["w", "a", "s", "d", " "].includes(e.key)) {
        if (blinking) blinking = false;
      }

      if (e.key === "`") {
        if (!game.options.debug) {
          game.options.debug = {
            colliders: true,
            time: true,
            fps: true,
            forceVectors: true,
          };
        } else delete game.options.debug;
      }
    });

    game.load(scene);
    game.start();
  });

  return (
    // @ts-ignore
    <canvas ref={canvas} class="w-full h-[90vh] cursor-default" />
  );
}
