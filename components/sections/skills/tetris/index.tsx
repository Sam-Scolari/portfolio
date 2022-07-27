import { useEffect, useRef, useState } from "react";
import useLayout from "../../../hooks/useLayout";
import { Matrix } from "./matrix";

export default function MySkillsMobile() {
  const canvas = useRef<any | undefined>();
  const { height } = useLayout();
  const [test, setTest] = useState("null");
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    // Resize canvas with window
    function resize() {
      // ctx.canvas.height = document.body.clientHeight;
      // ctx.canvas.width = document.body.clientWidth;
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }
    resize();

    let matrix = new Matrix(ctx);
    matrix.buildPiece();

    const render = () => {
      // Clear canvas each frame
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

      matrix.draw();

      requestAnimationFrame(render);
    };
    render();

    try {
      (DeviceMotionEvent as any).requestPermission().then((response) => {
        if (response == "granted") {
          console.log("accelerometer permission granted");
          // Do stuff here
        }
      });
    } catch (error) {
      console.log(error);
      // alert(error);
    }

    function handle(e) {
      if (e.gamma) setTest(e.gamma.toString());
    }

    window.addEventListener("deviceorientation", handle, true);
  }, []);

  useEffect(() => {
    console.log(height);
  }, [height]);

  return (
    <section>
      <h2>My Skills</h2>
      <p>
        The languages, frameworks, and tools I design and build with: {test}
      </p>
      <canvas ref={canvas}></canvas>
      <style jsx>{`
        section {
          background-color: blue;
        }
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
