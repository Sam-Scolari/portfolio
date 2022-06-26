import { useContext } from "react";
import { animated, useSpring } from "react-spring";
import { ThemeContext } from "../../../pages/_app";
import useTyper, { TypePhase } from "../../hooks/useTyper";

const extensions = [".eth", ".lens", ".me", ".wallet", ".⌐◨-◨"];

export default function Greeting() {
  // const [{ scale }, set] = useSpring(() => ({ scale: 1 }));

  const { currentText, selectedText, phase } = useTyper(extensions);
  const { isDark, setIsDark } = useContext(ThemeContext);
  return (
    <div id="greeting">
      <span id="gm">GM, my name is</span>
      {/* <animated.div
        style={{
          scale,
        }}
      > */}
      <h1
        // onMouseEnter={() => set({ scale: 1.1 })}
        // onMouseLeave={() => set({ scale: 1 })}
        onClick={(e) =>
          navigator.clipboard.writeText(`samscolari${selectedText}`)
        }
      >
        samscolari
        <span id="extension" aria-label={selectedText}>
          {currentText}
        </span>
      </h1>
      {/* </animated.div> */}
      <p id="tagline">I design and build fun web3 experiences!</p>
      <style jsx>{`
        h1 {
          font-size: 6rem;
          font-weight: bold;
          line-height: 1rem;
          cursor: pointer;
        }

        /*h1::before {
          content: url("/nounglasses.svg");
          position: absolute;
          top: 0;
          transform: translateY(4rem) translateX(-2.5rem) rotate(-15deg);
        }*/

        #tagline {
          font-size: 1.25rem;
          font-weight: 500;
        }

        #gm {
          font-size: 2rem;
          font-weight: bold;
        }

        #greeting {
          /*position: absolute;*/
          color: ${isDark ? "white" : "black"};
          transition: color 0.25s;
        }

        #extension {
          font-weight: bold;
          background: linear-gradient(
            150deg,
            #8247e5,
            #8247e5,
            #e52268,
            #ff00e5
          );
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        #extension:after {
          content: ${phase === TypePhase.Deleting ? '""' : '"|"'};
          -webkit-text-fill-color: ${isDark ? "white" : "black"};

          animation: ${phase === TypePhase.Pausing
            ? "blink 1s step-start infinite"
            : "none"};
        }

        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
