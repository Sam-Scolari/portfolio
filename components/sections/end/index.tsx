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
      <style jsx>{`
        section {
          cursor: ${!desktop || picking ? "auto" : "none"};
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
