// import { useContext, useEffect, useRef, useState } from "react";
// import { ThemeContext } from "../../../pages/_app";
// import data from "@emoji-mart/data";
// import { Picker } from "emoji-mart";

// export default function EndPage() {
//   const { isDark, setIsDark } = useContext(ThemeContext);

//   const canvas = useRef<any | undefined>();
//   const COLORS = ["red", "blue", "green", "yellow"];
//   const [currentColor, setCurrentColor] = useState(0);

//   useEffect(() => {
//     const ctx = canvas.current.getContext("2d");

//     // Resize canvas with window
//     function resize() {
//       ctx.canvas.width = window.innerWidth;
//       ctx.canvas.height = window.innerHeight;
//     }
//     resize();

//     // last known position
//     var pos = { x: 0, y: 0 };

//     window.addEventListener("resize", resize);
//     document.addEventListener("mousemove", draw);
//     document.addEventListener("mousedown", setPosition);
//     document.addEventListener("mouseenter", setPosition);

//     // new position from mouse event
//     function setPosition(e) {
//       pos.x = e.clientX;
//       pos.y = e.clientY;
//     }

//     function draw(e) {
//       // mouse left button must be pressed
//       if (e.buttons !== 1) return;

//       ctx.beginPath(); // begin

//       ctx.lineWidth = 5;
//       ctx.lineCap = "round";
//       ctx.strokeStyle = COLORS[currentColor];

//       ctx.moveTo(pos.x, pos.y); // from
//       setPosition(e);
//       ctx.lineTo(pos.x, pos.y); // to

//       ctx.stroke(); // draw it
//     }
//   }, []);

//   return (
//     <section>
//       <h2>Thanks for stopping by!</h2>
//       <p>Let's get in touch!</p>
//       <canvas ref={canvas}></canvas>
//       <div>
//         <button
//           onClick={() => {
//             setCurrentColor(0);
//           }}
//           style={{ backgroundColor: "red" }}
//         />
//         <button
//           onClick={() => {
//             setCurrentColor(1);
//             // canvas.current.getContext("2d").strokeStyle = "blue";/
//             // document.removeEventListener("mousemove");
//           }}
//           style={{ backgroundColor: "blue" }}
//         />
//         <button
//           onClick={() => {
//             setCurrentColor(2);
//           }}
//           style={{ backgroundColor: "green" }}
//         />
//         <button
//           onClick={() => {
//             setCurrentColor(3);
//           }}
//           style={{ backgroundColor: "yellow" }}
//         />
//       </div>

//       <style jsx>{`
//         h2 {
//           font-size: 3rem;
//           color: ${isDark ? "white" : "black"};
//           z-index: 1;
//           user-select: none;
//         }

//         p {
//           font-size: 1.25rem;
//           font-weight: 500;
//           z-index: 1;
//           user-select: none;
//         }

//         canvas {
//           width: 100%;
//           height: 100%;

//           position: absolute;
//         }

//         div {
//           display: flex;
//           gap: 8px;
//         }

//         button {
//           z-index: 1;
//           border: none;
//           width: 50px;
//           height: 50px;
//           border-radius: 100%;
//           cursor: pointer;
//         }
//       `}</style>
//     </section>
//   );
// }

import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../pages/_app";
import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";

export default function EndPage() {
  const { isDark, setIsDark } = useContext(ThemeContext);

  const canvas = useRef<any | undefined>();
  const COLORS = ["red", "blue", "green", "yellow"];
  const [currentColor, setCurrentColor] = useState(0);

  const [clicking, setClicking] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [erasing, setErasing] = useState(false);
  const eraser = useRef<any | undefined>();

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    // Resize canvas with window
    function resize() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }
    resize();

    // Update width and height on window resize
    window.addEventListener("resize", resize);
  }, []);

  return (
    <section
      id="end"
      onMouseDown={(e) => setClicking(e.button === 0)}
      onMouseUp={() => setClicking(false)}
      onMouseMove={(e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        const ctx = canvas.current.getContext("2d");

        if (erasing) {
          // ctx.clearRect();

          if (clicking) {
            ctx.beginPath();
            ctx.lineWidth = 50;
            ctx.lineCap = "round";
            ctx.globalCompositeOperation = "destination-out";

            ctx.moveTo(position.x, position.y);
            setPosition({ x: e.clientX, y: e.clientY });
            ctx.lineTo(e.clientX, e.clientY);

            // Paint to canvas
            ctx.stroke();
          } else {
            ctx.globalCompositeOperation = "destination-over";
            ctx.drawImage(
              eraser.current,
              position.x - eraser.current.width / 2,
              position.y - eraser.current.height / 2
            );
          }
        } else {
          if (clicking) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.strokeStyle = COLORS[currentColor];
            // Start at (x,y) get new position and end at (x,y)
            ctx.moveTo(position.x, position.y);
            setPosition({ x: e.clientX, y: e.clientY });
            ctx.lineTo(e.clientX, e.clientY);

            // Paint to canvas
            ctx.stroke();
          }
        }
      }}
    >
      <h2>Thanks for stopping by!</h2>
      <p>Let's get in touch!</p>
      <canvas ref={canvas}></canvas>
      <div className="tools">
        <div className="drawing">
          <button onClick={() => setErasing(false)} />
          <img ref={eraser} src="eraser.svg" onClick={() => setErasing(true)} />
          <input type="range" min="1" max="100" value="50"></input>
        </div>
        <div>
          {/* <input type="text" placeholder="Leave a message..." />
          <button>Sign</button> */}
        </div>
      </div>

      <style jsx>{`
        section {
          background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'  stroke-width='1' stroke='hsla(0, 0%, 96%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");
        }
        h2 {
          font-size: 3rem;
          color: ${isDark ? "white" : "black"};

          user-select: none;
        }

        p {
          font-size: 1.25rem;
          font-weight: 500;

          user-select: none;
        }

        canvas {
          width: 100%;
          height: 100%;
          position: absolute;
        }

        .tools {
          position: absolute;
          left: 80px;
          right: 80px;
          bottom: 32px;
          justify-content: space-between;
          display: flex;
        }

        .tools > div {
          display: flex;

          gap: 8px;
        }

        .drawing > button {
          z-index: 1;
          width: 50px;
          height: 50px;
          border-radius: 100%;
          cursor: pointer;
          border-width: 4px;
          border-color: lightgrey;
          border-style: solid;
          background: conic-gradient(
            rgb(255, 0, 0),
            rgb(255, 0, 255),
            rgb(0, 0, 255),
            rgb(0, 255, 255),
            rgb(0, 255, 0),
            rgb(255, 255, 0),
            rgb(255, 0, 0)
          );
        }

        .drawing > img {
          margin-left: 16px;
          cursor: pointer;
          display: ${erasing ? "none" : "flex"};
        }

        .drawing > input {
          margin-left: 16px;
        }
      `}</style>
    </section>
  );
}
