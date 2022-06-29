import { useEffect, useRef } from "react";

export default function MySkills() {
  const next = useRef<any | undefined>();
  const react = useRef();
  const typescript = useRef();
  const javascript = useRef();
  const html = useRef();
  const css = useRef();
  const figma = useRef();
  const solidity = useRef();

  let refs = [next, react, typescript, javascript, html, css, figma, solidity];

  const refreshRate = 100;
  const speed = 0.05;
  let multipliers = [];

  // useEffect(() => {
  //   for (let i = 0; i < refs.length; i++) {
  //     multipliers.push(Math.floor(1 + Math.random() * 5));
  //   }

  //   setInterval(() => {
  //     refs.forEach((ref, index) => {
  //       if (
  //         Math.floor(ref.current.style.left.split("v")[0].split("(")[1]) > 100
  //       )
  //         ref.current.style.left = "calc(-5vw)";
  //       else
  //         ref.current.style.left = `calc(${ref.current.style.left} + ${
  //           speed * multipliers[index]
  //         }vw)`;
  //     });
  //   }, refreshRate);
  // }, []);

  return (
    <section>
      <h2>My Skills</h2>
      <p>The languages, frameworks, and tools I design and build with</p>

      <img
        ref={next}
        src="next.svg"
        alt=""
        style={{ top: "20vh", left: "15vw", height: "100px" }}
      />
      <img
        ref={react}
        src="react.svg"
        alt=""
        style={{ top: "50vh", left: "35vw", height: "100px" }}
      />
      <img
        ref={figma}
        src="figma.svg"
        alt=""
        style={{ top: "30vh", left: "50vw", height: "60px" }}
      />
      <img
        ref={solidity}
        src="solidity.svg"
        alt=""
        style={{ top: "15vh", left: "80vw", height: "60px" }}
      />
      <img
        ref={typescript}
        src="typescript.svg"
        alt=""
        style={{ top: "85vh", left: "95vw", height: "80px" }}
      />
      <img
        ref={html}
        src="html.svg"
        alt=""
        style={{ top: "90vh", left: "30vw", height: "80px" }}
      />
      <img
        ref={javascript}
        src="javascript.svg"
        alt=""
        style={{ top: "55vh", left: "5vw", height: "50px" }}
      />
      <img
        ref={css}
        src="css.svg"
        alt=""
        style={{ top: "65vh", left: "45vw", height: "60px" }}
      />

      <style jsx>{`
        p {
          font-size: 1.25rem;
          font-weight: 500;
        }

        img {
          position: absolute;
          z-index: -1;
        }
      `}</style>
    </section>
  );
}
