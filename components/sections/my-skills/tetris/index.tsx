import { useEffect, useRef } from "react";
import { Block } from "./block";

export default function MySkillsMobile() {
  const canvas = useRef<any | undefined>();

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
      ctx.drawImage(next, 0, -1000);
      blocksLoaded += 1;
    };

    let react = new Image();
    react.src = "/tetris/react.svg";
    react.onload = function () {
      ctx.drawImage(react, 0, -1000);
      blocksLoaded += 1;
    };

    let typescript = new Image();
    typescript.src = "/tetris/typescript.svg";
    typescript.onload = function () {
      ctx.drawImage(typescript, 0, -1000);
      blocksLoaded += 1;
    };

    let javascript = new Image();
    javascript.src = "/tetris/javascript.svg";
    javascript.onload = function () {
      ctx.drawImage(javascript, 0, -1000);
      blocksLoaded += 1;
    };

    let html = new Image();
    html.src = "/tetris/html.svg";
    html.onload = function () {
      ctx.drawImage(html, 0, -1000);
      blocksLoaded += 1;
    };

    let css = new Image();
    css.src = "/tetris/css.svg";
    css.onload = function () {
      ctx.drawImage(css, 0, -1000);
      blocksLoaded += 1;
    };

    let figma = new Image();
    figma.src = "/tetris/figma.svg";
    figma.onload = function () {
      ctx.drawImage(figma, 0, -1000);
      blocksLoaded += 1;
    };

    let solidity = new Image();
    solidity.src = "/tetris/solidity.svg";
    solidity.onload = function () {
      ctx.drawImage(solidity, 0, -1000);
      blocksLoaded += 1;
    };

    let graphql = new Image();
    graphql.src = "/tetris/graphql.svg";
    graphql.onload = function () {
      ctx.drawImage(graphql, 0, -1000);
      blocksLoaded += 1;
    };

    let tailwind = new Image();
    tailwind.src = "/tetris/tailwind.svg";
    tailwind.onload = function () {
      ctx.drawImage(tailwind, 0, -1000);
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
    for (let i = 0; i < blockAssets.length; i++) {
      blocks.push(new Block());
    }
  }, []);

  return (
    <section>
      <h2>My Skills</h2>
      <p>The languages, frameworks, and tools I design and build with</p>
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
