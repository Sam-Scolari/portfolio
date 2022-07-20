import { useEffect, useRef } from "react";
import { Asteroid } from "./asteroids/asteroids";
import { Bullet } from "./asteroids/bullet";
import { Ship } from "./asteroids/ship";

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
  // const tailwind = useRef<any | undefined>();

  let keys = [];

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    // Resize canvas with window
    function resize() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }
    resize();

    let ship = new Ship(ctx, canvas);

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
      // tailwind,
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
      asteroids.forEach((asteroid, index) => {
        asteroid.draw(ctx, astroidAssets[index].current);
        asteroid.update(canvas.current, astroidAssets[index].current);
      });

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
        {/* <img ref={tailwind} src="/asteroids/tailwind.svg" /> */}
      </div>

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
