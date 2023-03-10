import { onMount } from "solid-js";
import Game, {
  Image,
  Text,
  Scene,
  Sprite,
  Box,
  Span,
} from "@sam-scolari/game-engine";

export default function Asteroids() {
  onMount(() => {
    const canvas = document.getElementById("my-skills") as HTMLCanvasElement;

    const game = new Game(canvas);
    let score = 0;

    game.clipPath = (() => {
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
    })();

    const scene = new Scene();
    scene.background = "black";

    const fontSize = 14;
    const gap = 16;
    const font = "PressStart2P";

    const skills = new Text(["Skills"]);
    skills.position = {
      x: canvas.width / 2 - 130,
      y: canvas.height / 2 - fontSize,
    };
    skills.fill = "white";
    skills.fontSize = 40;
    skills.font = font;

    scene.add(skills);

    const description = new Text(["The languages, frameworks, and tools I"]);
    description.position = {
      x: canvas.width / 2 - 260,
      y: canvas.height / 2 + fontSize + gap,
    };
    description.fill = "#A9A9A9";
    description.fontSize = 14;
    description.font = font;

    const description2 = new Text(["design and build with"]);
    description2.position = {
      x: canvas.width / 2 - 150,
      y: canvas.height / 2 + fontSize * 2 + gap * 2,
    };
    description2.fill = "#A9A9A9";
    description2.fontSize = 14;
    description2.font = font;

    scene.add(description);
    scene.add(description2);

    const _score = new Text(["Score: ", score.toString()]);
    _score.onUpdate = () => {
      _score.textNodes = ["Score: ", score.toString()];
    };
    _score.position = { x: 64, y: 110 };
    _score.fontSize = fontSize;
    _score.font = font;
    _score.fill = "white";

    scene.add(_score);

    const fps = new Text(["FPS: ", game.fps.toString()]);
    setInterval(() => {
      fps.textNodes = ["FPS: ", game.fps.toString()];
    }, 50);
    fps.position = { x: canvas.width - 64 * 2, y: 110 };
    fps.fontSize = 14;
    fps.fill = "red";
    fps.visible = false;

    const time = new Text([""]);
    time.onUpdate = () => {
      let h, m, s;

      h = Math.floor(game.timeStamp / 1000 / 60 / 60);
      m = Math.floor((game.timeStamp / 1000 / 60 / 60 - h) * 60);
      s = Math.floor(((game.timeStamp / 1000 / 60 / 60 - h) * 60 - m) * 60);

      s < 10 ? (s = `0${s}`) : (s = `${s}`);
      m < 10 ? (m = `0${m}`) : (m = `${m}`);
      h < 10 ? (h = `0${h}`) : (h = `${h}`);

      time.textNodes = [`${h}:${m}:${s}`];
    };
    time.position = { x: canvas.width - 64 * 2, y: 132 };
    time.fontSize = 14;
    time.fill = "orange";
    time.visible = false;

    scene.add(fps);
    scene.add(time);

    const move = new Span("move");
    move.fill = "#A9A9A9";

    const w = new Text(["[w] ", move]);
    w.position = { x: 64, y: canvas.height - 80 - (fontSize + gap) * 2 };
    w.fontSize = fontSize;
    w.font = font;
    w.fill = "white";

    const turn = new Span("turn");
    turn.fill = "#A9A9A9";

    const ad = new Text(["[a] & [d] ", turn]);
    ad.position = { x: 64, y: canvas.height - 80 - fontSize - gap };
    ad.fontSize = fontSize;
    ad.font = font;
    ad.fill = "white";

    const shoot = new Span("shoot");
    shoot.fill = "#A9A9A9";

    const space = new Text(["[space] ", shoot]);
    space.position = { x: 64, y: canvas.height - 80 };
    space.fontSize = fontSize;
    space.font = font;
    space.fill = "white";

    scene.add(w);
    scene.add(ad);
    scene.add(space);

    const shipStationary = new Sprite("/asteroids/ship.svg", 38, 53);
    const shipMoving = new Sprite("/asteroids/ship2.svg", 38, 53);

    shipMoving.visible = false;

    const ship = new Image([shipStationary, shipMoving]);

    let blinking = true;
    ship.position.x = canvas.width / 2 - ship.size.width / 2;
    ship.position.y = canvas.height / 1.25 - ship.size.height / 2;
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

    function resetShip() {
      ship.velocity = {
        x: 0,
        y: 0,
      };
      ship.direction = 0;
      ship.position = {
        x: canvas.width / 2 - ship.size.width / 2,
        y: canvas.height / 1.25 - ship.size.height / 2,
      };
      blinking = true;
    }

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

    function createAstroids() {
      asteroids.forEach((asteroid) => {
        asteroid.tag = "asteroid";
        asteroid.velocity = {
          x: 0.5 + Math.random() * 0.75,
          y: 0.5 + Math.random() * 0.75,
        };
        asteroid.freezeRotation = true;
        asteroid.direction = Math.floor(Math.random() * 2) == 1 ? 1 : -1;

        asteroid.onUpdate = () => {
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

          if (!blinking && asteroid.collidesWith(ship)) {
            resetShip();
          }
        };

        asteroid.position = {
          x: Math.floor(Math.random() * canvas.width),
          y: Math.floor(Math.random() * canvas.height),
        };
        asteroid.size = { width: 80, height: 80 };

        scene.add(asteroid);
      });
    }

    createAstroids();

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
          time.visible = true;
          fps.visible = true;
        } else {
          delete game.options.debug;
          time.visible = false;
          fps.visible = false;
        }
      }

      if (e.key === " ") {
        const bullet = new Box();

        bullet.size = { width: 4, height: 4 };
        bullet.direction = ship.direction;
        bullet.velocity = { x: 6, y: 6 };
        bullet.fill = "white";

        bullet.position = {
          x: ship.position.x - bullet.size.width / 2 + Math.sin(ship.direction),
          y:
            ship.position.y -
            bullet.size.height / 2 -
            ship.size.height / 2 -
            Math.cos(ship.direction),
        };

        bullet.onUpdate = () => {
          if (
            bullet.position.x > canvas.width + bullet.size.width ||
            bullet.position.x < -bullet.size.width ||
            bullet.position.y > canvas.height + bullet.size.height ||
            bullet.position.y < -bullet.size.height
          ) {
            scene.remove(bullet);
          }

          bullet.position.x += bullet.velocity.x * Math.sin(bullet.direction);
          bullet.position.y -= bullet.velocity.y * Math.cos(bullet.direction);

          for (const asteroid of scene.getGameObjectsByTag("asteroid")) {
            if (bullet.collidesWith(asteroid)) {
              scene.remove(asteroid, () => {
                const asteroids = scene.getGameObjectsByTag("asteroid");

                if (asteroids.length <= 1) {
                  createAstroids();
                  resetShip();
                }
              });
              scene.remove(bullet);
              score++;
            }
          }
        };

        scene.add(bullet);
      }
    });

    game.load(scene);
    game.start();
  });

  return <canvas id="my-skills" class="w-full h-[90vh] cursor-default" />;
}
