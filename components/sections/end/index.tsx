import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../../pages/_app";

import BasicButton from "../../buttons/BasicButton";
import useLayout from "../../hooks/useLayout";
import CanvasDrawing from "./CanvasDrawing";

export default function EndPage() {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const { desktop } = useLayout();
  const [picking, setPicking] = useState(false);

  return (
    <section id="end">
      <h2>Thanks for stopping by!</h2>
      <p>Let's get in touch!</p>

      {desktop && <CanvasDrawing picking={picking} setPicking={setPicking} />}

      <div id="message">
        <div>
          {/* <EmojiPicker onEmojiSelect={console.log} /> */}
          <span>👋</span>
          <input type="text" placeholder="Leave a message..." />
        </div>
        <BasicButton>Sign</BasicButton>
      </div>

      <style jsx>{`
        #message {
          position: absolute;
          right: 80px;
          bottom: 32px;
          display: flex;
          align-items: center;
          gap: 16px;
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

        section {
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
      `}</style>
    </section>
  );
}
