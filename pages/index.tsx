import type { NextPage } from "next";
import Landing from "../components/sections/landing";
import Thanks from "../components/sections/thanks";
import Projects from "../components/sections/projects";
import Skills from "../components/sections/skills";

const Home: NextPage = () => {
  return (
    <main>
      <Landing />
      <Skills />
      <Projects />
      <Thanks />
      <style jsx>{`
        main {
          width: 100vw;
          height: calc(var(--vh, 1vh) * 100);
          scroll-snap-type: y mandatory;
          overflow-x: hidden;
          text-align: center;
          background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'  stroke-width='1' stroke='hsla(0, 0%, 96%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");
        }

        main::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      `}</style>
    </main>
  );
};

export default Home;
