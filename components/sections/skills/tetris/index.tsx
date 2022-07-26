import { useEffect, useRef, useState } from "react";
import { Block } from "./block";

export default function MySkillsMobile() {
  const canvas = useRef<any | undefined>();
  const [test, setTest] = useState("null");
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    // Resize canvas with window
    function resize() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }
    resize();

    let blocksLoaded = 0;

    let next = new Image();
    next.src = "/tetris/next.svg";
    next.onload = function () {
      blocksLoaded += 1;
    };

    let react = new Image();
    react.src = "/tetris/react.svg";
    react.onload = function () {
      blocksLoaded += 1;
    };

    let typescript = new Image();
    typescript.src = "/tetris/typescript.svg";
    typescript.onload = function () {
      blocksLoaded += 1;
    };

    let javascript = new Image();
    javascript.src = "/tetris/javascript.svg";
    javascript.onload = function () {
      blocksLoaded += 1;
    };

    let html = new Image();
    html.src = "/tetris/html.svg";
    html.onload = function () {
      blocksLoaded += 1;
    };

    let css = new Image();
    css.src = "/tetris/css.svg";
    css.onload = function () {
      blocksLoaded += 1;
    };

    let figma = new Image();
    figma.src = "/tetris/figma.svg";
    figma.onload = function () {
      blocksLoaded += 1;
    };

    let solidity = new Image();
    solidity.src = "/tetris/solidity.svg";
    solidity.onload = function () {
      blocksLoaded += 1;
    };

    let graphql = new Image();
    graphql.src = "/tetris/graphql.svg";
    graphql.onload = function () {
      blocksLoaded += 1;
    };

    let tailwind = new Image();
    tailwind.src = "/tetris/tailwind.svg";
    tailwind.onload = function () {
      blocksLoaded += 1;
    };

    let blockAssets = [
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

    let blocks = [];
    let randomBlock =
      blockAssets[Math.floor(Math.random() * blockAssets.length)];
    blocks.push(
      new Block(
        ctx,
        ctx.canvas.width / 2 - randomBlock.width / 2,
        -randomBlock.height,
        randomBlock
      )
    );

    const render = () => {
      // Clear canvas each frame
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

      // Render blocks
      blocks.forEach((block) => {
        block.draw(ctx);
        block.update();
      });

      requestAnimationFrame(render);
    };
    render();

    function handle(e) {
      if (e.gamma) setTest(e.gamma.toString());
    }

    window.addEventListener("deviceorientation", handle, true);
  }, []);

  return (
    <section>
      <h2>My Skills</h2>
      <p>
        The languages, frameworks, and tools I design and build with: {test}
      </p>
      <canvas ref={canvas}></canvas>
      <style jsx>{`
        h2 {
          font-family: PressStartP2;
          font-size: 2rem;
        }
        p {
          font-family: PressStartP2;
          font-size: 0.75rem;
          padding-left: 32px;
          padding-right: 32px;
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
