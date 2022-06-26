import type { NextPage } from "next";
import { useContext, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { useAccount } from "wagmi";
import StartPage from "../components/sections/start";
import MiniProjects from "../components/sections/interactive-projects";
import { ThemeContext } from "../pages/_app";
import EndPage from "../components/sections/end";
import MyWork from "../components/sections/my-work";
import MySkills from "../components/sections/my-skills";

const Home: NextPage = () => {
  const { data } = useAccount();

  const { isDark, setIsDark } = useContext(ThemeContext);

  const [wasPressed, setWasPressed] = useState(false);
  const [wasUsed, setWasUsed] = useState(true);

  // Confetti
  useEffect(() => {
    if (wasUsed && wasPressed && data?.address) {
      var end = Date.now() + 15 * 200;

      const colors = ["#8247e5", "#e52268", "#ff00e5"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
      setWasUsed(false);
    }
  }, [data, wasPressed, wasUsed]);

  return (
    <main>
      <StartPage setWasPressed={setWasPressed} />
      <MiniProjects />
      <MyWork />
      <MySkills />
      <EndPage />
      <style jsx>{`
        main {
          width: 100vw;
          height: 100vh;
          scroll-snap-type: y mandatory;

          overflow-y: ${data?.address ? "scroll" : "hidden"};
          text-align: center;
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
