import { useEffect, useRef } from "react";
import Asteroids from "./game/asteroids";

export default function MySkills() {
  const canvas = useRef<any | undefined>();

  const next = useRef<any | undefined>();
  const react = useRef<any | undefined>();
  const typescript = useRef<any | undefined>();
  const javascript = useRef<any | undefined>();
  const html = useRef<any | undefined>();
  const css = useRef<any | undefined>();
  const figma = useRef<any | undefined>();
  const solidity = useRef<any | undefined>();
  const graphql = useRef<any | undefined>();

  const shipAsset = useRef<any | undefined>();
  const shipFireAsset = useRef<any | undefined>();

  let keys = [];

  class Asteroid {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    direction: number;

    constructor() {
      this.x = Math.floor(Math.random() * canvas.current.width);
      this.y = Math.floor(Math.random() * canvas.current.height);
      this.direction = Math.floor(Math.random() * 2) == 1 ? 1 : -1;
      this.velocityX = 0.5 + Math.random() * 0.75;
      this.velocityY = 0.5 + Math.random() * 0.75;
    }

    draw(ctx, image) {
      ctx.drawImage(image, this.x, this.y);
    }

    update(canvas, image) {
      // If asteroid goes off screen
      if (this.x > canvas.width + image.width) this.x = 0 - image.width;
      if (this.x < -image.width) this.x = canvas.width + image.width;
      if (this.y > canvas.height + image.height) this.y = 0 - image.height;
      if (this.y < -image.height) this.y = canvas.height + image.height;

      this.x += this.velocityX * this.direction;
      this.y += this.velocityY * this.direction;
    }
  }

  class Ship {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    direction: number;

    turningLeft: boolean;
    turningRight: boolean;

    moving: boolean;

    constructor(ctx) {
      this.x = canvas.current.width / 2 - shipAsset.current.width / 2;
      this.y = canvas.current.height - 250;
      this.direction = Math.PI / 2;

      this.velocityX = 0;
      this.velocityY = 0;

      this.turningLeft = false;
      this.turningRight = false;

      document.body.addEventListener("keydown", (e) => (keys[e.key] = true));
      document.body.addEventListener("keyup", (e) => (keys[e.key] = false));

      ctx.drawImage(shipAsset.current, this.x, this.y);
    }

    update(canvas, ctx) {
      // If ship goes off screen
      if (this.x > canvas.width + shipAsset.current.width)
        this.x = 0 - shipAsset.current.width;
      if (this.x < -shipAsset.current.width)
        this.x = canvas.width + shipAsset.current.width;

      if (this.y > canvas.height + shipAsset.current.height)
        this.y = 0 - shipAsset.current.height;
      if (this.y < -shipAsset.current.height)
        this.y = canvas.height + shipAsset.current.height;

      // Moving
      if (keys["w"]) {
        this.velocityX += Math.cos(this.direction) * 0.1;
        this.velocityY += Math.sin(this.direction) * 0.1;
      }

      // Turning
      if (keys["a"]) this.direction = this.direction - Math.PI / 100;
      if (keys["d"]) this.direction = this.direction + Math.PI / 100;

      this.velocityX *= 0.99;
      this.velocityY *= 0.99;

      this.x -= this.velocityX;
      this.y -= this.velocityY;

      // ctx.save();
      // ctx.translate(this.x, this.y);
      // ctx.rotate(this.direction);
      // ctx.drawImage(shipAsset.current, this.x, this.y);
      // ctx.restore();

      // if (keys["a"]) {
      //   ctx.save();
      //   ctx.translate(this.x, this.y);
      //   ctx.rotate(Math.PI / 100);
      //   ctx.drawImage(shipAsset.current, this.x, this.y);
      //   ctx.restore();
      // }
      // if (keys["d"]) {
      //   ctx.rotate(-Math.PI / 100);
      //   ctx.drawImage(shipAsset.current, this.x, this.y);
      // } else {
      ctx.drawImage(
        keys["w"] ? shipFireAsset.current : shipAsset.current,
        this.x,
        this.y
      );
      // }
    }
  }

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    // Resize canvas with window
    function resize() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }
    resize();

    let ship = new Ship(ctx);

    let astroidAssets = [
      next,
      react,
      typescript,
      javascript,
      html,
      css,
      figma,
      solidity,
      graphql,
    ];

    let asteroids = [];
    for (let i = 0; i < astroidAssets.length; i++) {
      asteroids.push(new Asteroid());
    }

    // Update width and height on window resize
    window.addEventListener("resize", resize);

    const render = () => {
      // Clear canvas each frame
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

      // Render ship
      ship.update(canvas.current, ctx);

      // Render astroids
      asteroids.forEach((asteroid, index) => {
        asteroid.draw(ctx, astroidAssets[index].current);
        asteroid.update(canvas.current, astroidAssets[index].current);
      });

      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <section>
      <h2>My Skills</h2>
      <p>The languages, frameworks, and tools I design and build with</p>
      <canvas ref={canvas}></canvas>

      {/* Game Assets */}
      <div style={{ display: "none" }}>
        <img ref={javascript} src="/asteroids/javascript.svg" />
        <img ref={typescript} src="/asteroids/typescript.svg" />
        <img ref={html} src="/asteroids/html.svg" />
        <img ref={css} src="/asteroids/css.svg" />
        <img ref={figma} src="/asteroids/figma.svg" />
        <img ref={solidity} src="/asteroids/solidity.svg" />
        <img ref={react} src="/asteroids/react.svg" />
        <img ref={next} src="/asteroids/next.svg" />
        <img ref={graphql} src="/asteroids/graphql.svg" />

        <img ref={shipAsset} src="/ship.svg" />
        <img ref={shipFireAsset} src="/shipfire.svg" />
      </div>

      <style jsx>{`
        p {
          font-size: 1.25rem;
          font-weight: 500;
        }

        canvas {
          width: 100%;
          height: 100%;

          position: absolute;
        }
      `}</style>
    </section>
  );
}
