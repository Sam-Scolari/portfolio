import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export default function useLayout() {
  const mobile = useMediaQuery("(max-width: 699px)");
  const desktop = useMediaQuery("(min-width: 700px)");

  const [animate, setAnimate] = useState([true, false, false, false]);

  useEffect(() => {
    const sections = document.getElementsByTagName("section");
    // let positions = [];

    // for (let i = 0; i < sections.length; i++) {
    //   positions.push(sections[i].offsetTop);
    // }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      { threshold: 0.75 }
    );

    Array.from(sections).forEach((section) => {
      observer.observe(section);
    });

    // let main = document.getElementsByTagName("main")[0];

    // main.addEventListener("scroll", (e) => {
    //   let position = main.scrollTop;

    //   for (let i = 0; i < positions.length; i++) {
    // switch (positions.indexOf(position)) {
    //   case 0:
    //     setAnimate([true, false, false, false]);
    //     break;
    //   case 1:
    //     console.log("test");
    //     setAnimate([false, true, false, false]);
    //     break;
    //   case 2:
    //     setAnimate([false, false, true, false]);
    //     break;
    //   case 3:
    //     setAnimate([false, false, false, true]);
    //     break;
    // default:
    //   if (animate.includes(true))
    //     setAnimate([false, false, false, false]);
    //   break;
    // }

    //   if (positions.indexOf(position) === 0)
    //     setAnimate([true, false, false, false]);

    //   if (positions.indexOf(position) === 1)
    //     setAnimate([false, true, false, false]);

    //   if (positions.indexOf(position) === 2)
    //     setAnimate([false, false, true, false]);

    //   if (positions.indexOf(position) === 3)
    //     setAnimate([false, false, false, true]);
    // }
    // });
  }, []);

  return { mobile, desktop, animate };
}
