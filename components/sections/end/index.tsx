import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../pages/_app";
import data from "@emoji-mart/data";
import { EmojiPicker } from "emoji-mart";
import { SketchPicker } from "react-color";
import BasicButton from "../../buttons/BasicButton";

export default function EndPage() {
  const { isDark, setIsDark } = useContext(ThemeContext);

  const canvas = useRef<any | undefined>();

  enum Tools {
    Pencil,
    Eraser,
    Stamp,
  }
  const eraser = useRef<any | undefined>();
  const pencil = useRef<any | undefined>();
  const [currentTool, setCurrentTool] = useState(Tools.Pencil);

  const [picking, setPicking] = useState(false);
  const [currentColor, setCurrentColor] = useState("#F3322C");

  const [clicking, setClicking] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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

        switch (currentTool) {
          case Tools.Eraser: {
            if (clicking) {
              ctx.beginPath();
              ctx.lineWidth = 50;
              ctx.lineCap = "round";
              ctx.globalCompositeOperation = "destination-out";

              ctx.moveTo(position.x, position.y);
              setPosition({ x: e.clientX, y: e.clientY });
              ctx.lineTo(e.clientX, e.clientY);

              ctx.stroke();
            } else {
              ctx.globalCompositeOperation = "destination-over";
            }
          }
          case Tools.Pencil: {
            if (clicking) {
              ctx.beginPath();
              ctx.lineWidth = 5;
              ctx.lineCap = "round";
              ctx.strokeStyle = currentColor;
              // Start at (x,y) get new position and end at (x,y)
              ctx.moveTo(position.x, position.y);
              setPosition({ x: e.clientX, y: e.clientY });
              ctx.lineTo(e.clientX, e.clientY);

              // Paint to canvas
              ctx.stroke();
            }
          }
        }
      }}
    >
      <h2>Thanks for stopping by!</h2>
      <p>Let's get in touch!</p>

      <canvas
        ref={canvas}
        onClick={() => setPicking(false)}
        onMouseDown={() => {
          const ctx = canvas.current.getContext("2d");
          if (currentTool === Tools.Stamp) {
            let stamp = new Image();
            stamp.src = "/nounglasses.svg";
            ctx.drawImage(
              stamp,
              position.x - stamp.width / 2,
              position.y - stamp.height / 2
            );
          }
        }}
      ></canvas>
      <div className="tools">
        <div className="drawing">
          <div id="color-picker-section">
            <div id="picker">
              <SketchPicker
                color={currentColor}
                onChangeComplete={(color) => setCurrentColor(color.hex)}
              />
            </div>
            <button id="color-picker" onClick={() => setPicking(!picking)} />
          </div>

          <img
            id="eraser"
            ref={eraser}
            src="eraser.svg"
            onClick={() => setCurrentTool(Tools.Eraser)}
          />
          <img
            id="pencil"
            ref={pencil}
            src="pencil.svg"
            onClick={() => setCurrentTool(Tools.Pencil)}
          />
          <svg
            id="glasses"
            onClick={() => setCurrentTool(Tools.Stamp)}
            width="80"
            height="50"
            viewBox="0 0 80 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M55 9L1 9L1 14L55 14V9Z" fill={currentColor} />
            <path d="M5 9H0L0 25H5L5 9Z" fill={currentColor} />
            <path d="M80 0L50 0V30H80V0Z" fill={currentColor} />
            <path d="M45 0L15 0V30H45V0Z" fill={currentColor} />
            <path d="M75 5H65V25H75V5Z" fill="black" />
            <path d="M40 5H30V25H40V5Z" fill="black" />
            <path d="M65 5H55V25H65V5Z" fill="white" />
            <path d="M30 5H20V25H30V5Z" fill="white" />
          </svg>
        </div>
        <div id="message">
          <div>
            {/* <EmojiPicker onEmojiSelect={console.log} /> */}
            <span>👋</span>
            <input type="text" placeholder="Leave a message..." />
          </div>
          <BasicButton>Sign</BasicButton>
        </div>
      </div>
      <img id="cursor" src="/pencil.svg" />
      <style jsx>{`
        #message {
          position: absolute;
          right: 0;
          display: flex;
          align-items: center;
        }

        #message > div {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 50px;
          border-radius: 8px;
          border-style: none;

          box-shadow: inset 0px 0px 0px 2px #e5e5e5;

          padding-left: 16px;
          max-width: 400px;
          width: 400px;
          background-color: white;
        }

        #message > div > input {
          font-family: "Inter";
          font-weight: 500;
          width: 100%;
          height: 100%;
          outline: none;
          border: none;
          background-color: transparent;
          color: grey;
        }
        #cursor {
          width: 12px;
          position: absolute;
          top: calc(${position.y}px + -6px);
          left: calc(${position.x}px + 6px);
          pointer-events: none;
          transform: rotate(-45deg);
          display: ${picking ? "none" : "auto"};
        }
        section {
          background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'  stroke-width='1' stroke='hsla(0, 0%, 96%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");
          cursor: ${picking ? "auto" : "none"};
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
          gap: 50px;
        }

        #color-picker {
          z-index: 1;
          width: 50px;
          height: 50px;
          border-radius: 100%;
          cursor: pointer;
          border-width: 0;

          background: conic-gradient(
            rgb(255, 0, 0),
            rgb(255, 0, 255),
            rgb(0, 0, 255),
            rgb(0, 255, 255),
            rgb(0, 255, 0),
            rgb(255, 255, 0),
            rgb(255, 0, 0)
          );
          transition: transform 0.5s;
        }

        #color-picker:hover {
          transform: scale(1.25);
        }

        #color-picker:hover ~ #cursor {
          display: none;
        }

        #eraser {
          cursor: pointer;

          transition: transform 0.5s;
        }

        #eraser:hover {
          transform: scale(1.25);
        }

        #pencil {
          height: 50px;
          cursor: pointer;
          transform: rotate(45deg);

          transition: transform 0.5s;
        }

        #pencil:hover {
          transform: scale(1.25);
        }

        #color-picker-section {
          position: relative;
        }

        #picker {
          z-index: 1;
          position: absolute;
          bottom: 75px;
          display: ${picking ? "flex" : "none"};
        }

        #glasses {
          cursor: pointer;
          transition: transform 0.5s;
        }

        #glasses:hover {
          transform: scale(1.25);
        }
      `}</style>
    </section>
  );
}
