import { useContext } from "react";
import { ThemeContext } from "../../../pages/_app";
import useTyper, { TypePhase } from "../../hooks/useTyper";

const extensions = [".eth", ".lens", ".me", ".wallet", ".⌐◨-◨"];

export default function Greeting() {
  const { currentText, selectedText, phase } = useTyper(extensions);
  const { isDark, setIsDark } = useContext(ThemeContext);
  return (
    <div id="greeting">
      <span id="gm">GM, my name is</span>
      <h1
        onClick={(e) =>
          navigator.clipboard.writeText(`samscolari${selectedText}`)
        }
      >
        samscolari
        <span id="extension" aria-label={selectedText}>
          {currentText}
        </span>
      </h1>

      <p id="tagline">I design and build fun web3 experiences!</p>
      <style jsx>{`
        h1 {
          font-size: 6rem;
          font-weight: bold;
          line-height: 1rem;
          cursor: pointer;
          transition: transform 0.5s;
        }

        h1:hover {
          transform: scale(1.15);
        }

        h1::before {
          content: url("/nounglasses.svg");
          position: absolute;
          transform: translateY(-3.25rem) translateX(-2.5rem) rotate(-15deg);
        }

        #tagline {
          font-size: 1.25rem;
          font-weight: 500;
        }

        #gm {
          font-size: 2rem;
          font-weight: bold;
        }

        #greeting {
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

        @media only screen and (max-width: 1050px) {
          h1 {
            font-size: 5rem;
          }
          h1::before {
            transform: translateY(-2.75rem) translateX(-2.5rem) rotate(-15deg);
          }
        }

        @media only screen and (max-width: 950px) {
          h1 {
            font-size: 4rem;
          }

          h1::before {
            transform: translateY(-2rem) translateX(-2.5rem) rotate(-15deg)
              scale(0.75);
          }

          #tagline {
            font-size: 1.15rem;
          }

          #gm {
            font-size: 1.75rem;
          }
        }

        @media only screen and (max-width: 750px) {
          h1 {
            font-size: 3rem;
          }

          h1::before {
            transform: translateY(-1.6rem) translateX(-2.5rem) rotate(-15deg)
              scale(0.6);
          }

          #tagline {
            font-size: 1rem;
          }

          #gm {
            font-size: 1.5rem;
          }
        }

        @media only screen and (max-width: 550px) {
          h1 {
            font-size: 2.5rem;
          }

          h1::before {
            transform: translateY(-1.4rem) translateX(-2.5rem) rotate(-15deg)
              scale(0.45);
          }

          #tagline {
            font-size: 0.85rem;
          }

          #gm {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
