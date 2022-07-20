import { useEffect, useRef } from "react";
import { Asteroid } from "./asteroids/asteroids";
import { Bullet } from "./asteroids/bullet";
import { Ship } from "./asteroids/ship";

export default function MySkills() {
  const canvas = useRef<any | undefined>();

  let keys = [];

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    // Resize canvas with window
    function resize() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }
    resize();

    let loaded = 0;

    let ship = new Ship(ctx, canvas);

    let next = new Image();
    next.src = "/asteroids/next.svg";

    next.onload = function () {
      ctx.drawImage(next, 0, 0);
      loaded += 1;
    };

    let react = new Image();
    react.src = "/asteroids/react.svg";
    react.onload = function () {
      ctx.drawImage(react, 0, 0);
      loaded += 1;
    };

    let typescript = new Image();
    typescript.src = "/asteroids/typescript.svg";
    typescript.onload = function () {
      ctx.drawImage(typescript, 0, 0);
      loaded += 1;
    };

    let javascript = new Image();
    javascript.src = "/asteroids/javascript.svg";
    javascript.onload = function () {
      ctx.drawImage(javascript, 0, 0);
      loaded += 1;
    };

    let html = new Image();
    html.src = "/asteroids/html.svg";
    html.onload = function () {
      ctx.drawImage(html, 0, 0);
      loaded += 1;
    };

    let css = new Image();
    css.src = "/asteroids/css.svg";
    css.onload = function () {
      ctx.drawImage(css, 0, 0);
      loaded += 1;
    };

    let figma = new Image();
    figma.src = "/asteroids/figma.svg";
    figma.onload = function () {
      ctx.drawImage(figma, 0, 0);
      loaded += 1;
    };

    let solidity = new Image();
    solidity.src = "/asteroids/solidity.svg";
    solidity.onload = function () {
      ctx.drawImage(solidity, 0, 0);
      loaded += 1;
    };

    let graphql = new Image();
    graphql.src = "/asteroids/graphql.svg";
    graphql.onload = function () {
      ctx.drawImage(graphql, 0, 0);
      loaded += 1;
    };

    let tailwind = new Image();
    tailwind.src = "/asteroids/tailwind.svg";
    tailwind.onload = function () {
      ctx.drawImage(tailwind, 0, 0);
      loaded += 1;
    };

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
      tailwind,
    ];

    let asteroids = [];
    for (let i = 0; i < astroidAssets.length; i++) {
      asteroids.push(new Asteroid(canvas));
    }

    let bullets = [];

    // Key press listeners
    document.body.addEventListener("keydown", (e) => (keys[e.key] = true));
    document.body.addEventListener("keyup", (e) => {
      keys[e.key] = false;
      if (e.key === " ") bullets.push(new Bullet(ship));
    });

    // Update width and height on window resize
    window.addEventListener("resize", resize);

    const render = () => {
      // Clear canvas each frame
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

      // Render ship
      ship.update(canvas.current, ctx, keys);

      // Render astroids
      if (loaded >= astroidAssets.length) {
        asteroids.forEach((asteroid, index) => {
          asteroid.draw(ctx, astroidAssets[index]);
          asteroid.update(canvas.current, astroidAssets[index]);
        });
      }

      // Render bullets
      bullets.forEach((bullet) => {
        bullet.draw(ctx);
        bullet.update();
      });

      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <section>
      <h2>My Skills</h2>
      <p>The languages, frameworks, and tools I design and build with</p>
      {/* <img src="presspace.svg" id="space" /> */}
      <span id="controls">
        [w] <span className="control">move</span>
        <br />
        [a] & [d] <span className="control">turn</span>
        <br />
        [space] <span className="control">shoot</span>
      </span>
      <canvas ref={canvas}></canvas>

      <style jsx>{`
        #controls {
          position: absolute;
          left: 80px;
          bottom: 32px;
          font-family: PressStartP2;
          text-align: left;
          line-height: 2rem;
        }

        .control {
          font-family: PressStartP2;
          color: #a9a9a9;
        }
        #space {
          position: absolute;
          bottom: 75px;
          cursor: pointer;
          z-index: 1;
        }

        h2 {
          font-family: PressStartP2;
          font-size: 2.5rem;
        }
        p {
          font-family: PressStartP2;
          font-size: 1rem;
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
