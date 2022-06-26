import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../../pages/_app";
import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";

export default function EndPage() {
  const { isDark, setIsDark } = useContext(ThemeContext);

  const canvas = useRef<any | undefined>();

  useEffect(() => {
    // get canvas 2D context and set him correct size
    var ctx = canvas.current.getContext("2d");
    resize();

    // last known position
    var pos = { x: 0, y: 0 };

    window.addEventListener("resize", resize);
    document.addEventListener("mousemove", draw);
    document.addEventListener("mousedown", setPosition);
    document.addEventListener("mouseenter", setPosition);

    // new position from mouse event
    function setPosition(e) {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }

    // resize canvas
    function resize() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }

    function draw(e) {
      // mouse left button must be pressed
      if (e.buttons !== 1) return;

      ctx.beginPath(); // begin

      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#c0392b";

      ctx.moveTo(pos.x, pos.y); // from
      setPosition(e);
      ctx.lineTo(pos.x, pos.y); // to

      ctx.stroke(); // draw it
    }
  });

  return (
    <section>
      <h2>Thanks for stopping by!</h2>
      <p>Let's get in touch!</p>
      <canvas ref={canvas}></canvas>
      <style jsx>{`
        h2 {
          font-size: 3rem;
          color: ${isDark ? "white" : "black"};
          z-index: 1;
          user-select: none;
        }

        p {
          font-size: 1.25rem;
          font-weight: 500;
          z-index: 1;
          user-select: none;
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
