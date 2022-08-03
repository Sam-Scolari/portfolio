import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export default function useLayout() {
  const mobile = useMediaQuery("(max-width: 699px)");
  const desktop = useMediaQuery("(min-width: 700px)");


  useEffect(() => {
    const sections = document.getElementsByTagName("section");

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

  }, []);

  return { mobile, desktop };
}
