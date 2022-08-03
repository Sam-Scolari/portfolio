import { useState } from "react";
import useLayout from "../../hooks/useLayout";
import CanvasDrawing from "./CanvasDrawing";

export default function Thanks() {
  const { desktop, animate } = useLayout();
  const [picking, setPicking] = useState(false);

  return (
    <section>
      <img src="/" alt="" />
      <h2>Thanks for stopping by!</h2>
      <p>Let's get in touch!</p>
      {desktop && <CanvasDrawing picking={picking} setPicking={setPicking} />}

      <style jsx>{`
        section {
          cursor: ${!desktop || picking ? "auto" : "none"};
        }
      `}</style>
    </section>
  );
}
