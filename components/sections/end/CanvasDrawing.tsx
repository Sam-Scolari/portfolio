import { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import { EmojiPicker } from "emoji-mart";
import { SketchPicker } from "react-color";
export default function CanvasDrawing({ picking, setPicking }) {
  const canvas = useRef<any | undefined>();

  enum Tools {
    Pencil,
    Eraser,
    Stamp,
  }

  const [currentTool, setCurrentTool] = useState(Tools.Pencil);

  const [currentColor, setCurrentColor] = useState("#F3322C");

  const [clicking, setClicking] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [hideCursor, setHideCursor] = useState(false);

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    // Resize canvas with window
    function resize(ctx) {
      if (ctx.canvas) {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
      }
    }
    resize(ctx);

    // Update width and height on window resize
    window.addEventListener("resize", resize);

    window.addEventListener("mousemove", (e) =>
      setPosition({ x: e.clientX, y: e.clientY })
    );
  }, []);

  return (
    <>
      <canvas
        onMouseUp={() => setClicking(false)}
        onMouseMove={(e) => {
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
        ref={canvas}
        onClick={() => setPicking(false)}
        onMouseDown={(e) => {
          setClicking(e.button === 0);
          const ctx = canvas.current.getContext("2d");
          if (currentTool === Tools.Stamp) {
            ctx.strokeStyle = currentColor;
            ctx.fillStyle = currentColor;
            ctx.translate(position.x, position.y);
            let p1 = new Path2D("M55 9L1 9L1 14L55 14V9Z");
            let p2 = new Path2D("M5 9H0L0 25H5L5 9Z");
            let p3 = new Path2D("M80 0L50 0V30H80V0Z");
            let p4 = new Path2D("M45 0L15 0V30H45V0Z");
            let p5 = new Path2D("M75 5H65V25H75V5Z");
            let p6 = new Path2D("M40 5H30V25H40V5Z");
            let p7 = new Path2D("M65 5H55V25H65V5Z");
            let p8 = new Path2D("M30 5H20V25H30V5Z");
            ctx.fill(p1);
            ctx.fill(p2);
            ctx.fill(p3);
            ctx.fill(p4);
            ctx.fillStyle = "black";
            ctx.fill(p5);
            ctx.fill(p6);
            ctx.fillStyle = "white";
            ctx.fill(p7);
            ctx.fill(p8);
            ctx.translate(-position.x, -position.y);
          }

          if (currentTool === Tools.Pencil) {
            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.strokeStyle = currentColor;
            ctx.beginPath();
            ctx.moveTo(position.x, position.y);
            ctx.lineTo(position.x, position.y);
            ctx.stroke();
          }
        }}
      ></canvas>
      <div id="tools">
        <div id="color-picker-section">
          <div id="picker">
            <SketchPicker
              color={currentColor}
              onChangeComplete={(color) => setCurrentColor(color.hex)}
            />
          </div>
          <button
            id="color-picker"
            onClick={() => setPicking(!picking)}
            onMouseEnter={() => setHideCursor(true)}
            onMouseLeave={() => setHideCursor(false)}
          />
        </div>

        <img
          id="eraser"
          src="eraser.svg"
          onClick={() => setCurrentTool(Tools.Eraser)}
          onMouseEnter={() => setHideCursor(true)}
          onMouseLeave={() => setHideCursor(false)}
        />
        <img
          id="pencil"
          src="pencil.svg"
          onClick={() => setCurrentTool(Tools.Pencil)}
          onMouseEnter={() => setHideCursor(true)}
          onMouseLeave={() => setHideCursor(false)}
        />
        <svg
          id="glasses"
          onClick={() => setCurrentTool(Tools.Stamp)}
          onMouseEnter={() => setHideCursor(true)}
          onMouseLeave={() => setHideCursor(false)}
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
      {currentTool === Tools.Stamp ? (
        <svg
          id="cursor"
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
      ) : (
        <img
          id="cursor"
          src={currentTool === Tools.Pencil ? "/pencil.svg" : "/eraser.svg"}
        />
      )}
      <style jsx>{`
        #tools {
          position: absolute;
          pointer-events: none;
          left: 80px;
          bottom: 32px;
          display: flex;
          gap: 50px;
        }

        canvas {
          width: 100%;
          height: 100%;
          position: absolute;
        }

        #color-picker {
          z-index: 1;
          width: 50px;
          height: 50px;
          border-radius: 100%;
          border-width: 0;
          cursor: none;
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

        #pencil,
        #eraser,
        #color-picker,
        #glasses {
          cursor: none;
          transition: transform 0.5s;
          pointer-events: auto;
          user-select: none;
        }

        #pencil:hover,
        #eraser:hover,
        #color-picker:hover,
        #glasses:hover {
          transform: scale(1.25);

          cursor: pointer;
        }

        #pencil {
          height: 50px;
          transform: rotate(45deg);
        }

        #pencil:hover {
          transform: rotate(45deg) scale(1.25);
        }

        #color-picker-section {
          position: relative;
        }

        #picker {
          z-index: 1;
          position: absolute;
          bottom: 75px;
          pointer-events: auto;
          display: ${picking ? "flex" : "none"};
        }

        #cursor {
          width: ${currentTool === Tools.Pencil
            ? "12px"
            : currentTool === Tools.Eraser
            ? "32px"
            : "50px"};
          position: absolute;
          top: calc(
            ${position.y}px + ${currentTool === Tools.Pencil ? "-6px" : "0px"}
          );
          left: calc(
            ${position.x}px + ${currentTool === Tools.Pencil ? "6px" : "0px"}
          );
          pointer-events: none;
          transform: rotate(
            ${currentTool === Tools.Pencil
              ? "-45deg"
              : currentTool === Tools.Eraser
              ? "45deg"
              : "0deg"}
          );
          display: ${picking || hideCursor ? "none" : "auto"};
        }
      `}</style>
    </>
  );
}
