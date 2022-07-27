import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export default function useLayout() {
  const desktop = useMediaQuery("(min-width: 700px)");

  const [height, setHeight] = useState(0);

  useEffect(() => {
    function resize() {
      setHeight(() => {
        return window.innerHeight;
      });
    }
    resize();

    window.addEventListener("resize", resize);
  }, []);

  useEffect(() => {
    console.log(height);
  }, [height]);

  return { desktop, height };
}
