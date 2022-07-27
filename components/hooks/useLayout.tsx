import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export default function useLayout() {
  const desktop = useMediaQuery("(min-width: 700px)");

  // const [height, setHeight] = useState(0);

  // useEffect(() => {
  //   function resize() {
  //     setHeight(() => {
  //       return window.innerHeight;
  //     });

  //     console.log("--------------------------");
  //     console.log(window.innerHeight, "Inner");
  //     console.log(window.screen.height, "Screen");
  //     console.log(window.screen.availHeight, "Avail");
  //     console.log(document.body.clientHeight, "Client");
  //     console.log(document.body.scrollHeight, "Scroll");
  //     console.log(document.body.offsetHeight, "Offset");
  //     console.log(
  //       document.getElementsByTagName("section")[0].clientHeight,
  //       "Section"
  //     );
  //   }
  //   resize();

  //   window.addEventListener("resize", resize);
  // }, []);

  // useEffect(() => {
  //   console.log(height);
  // }, [height]);

  return { desktop };
}
