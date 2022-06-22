import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { useAccount } from "wagmi";
import useTyper, { TypePhase } from "../components/hooks/useTyper";
import { useSpring, animated } from "react-spring";

const extensions = [".eth", ".lens", ".me", ".wallet", ".⌐◨-◨"];

const Home: NextPage = () => {
  const { data } = useAccount();

  const [currentPage, setCurrentPage] = useState(0);
  // const currentPageRef = useRef(0);

  // useEffect(() => {
  //   console.log(currentPageRef.current);
  //   setCurrentPage(currentPageRef.current);
  // }, [currentPageRef.current]);

  const [buttonPress, setButtonPress] = useState(false);
  const [once, setOnce] = useState(true);

  const { currentText, selectedText, phase } = useTyper(extensions);

  useEffect(() => {
    if (once && buttonPress && data?.address) {
      var end = Date.now() + 15 * 200;

      const colors = ["#8247e5", "#e52268", "#ff00e5"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.6 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.6 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      setOnce(false);
    }
  }, [data, buttonPress, once]);

  const [{ scale }, set] = useSpring(() => ({ scale: 1 }));

  function handleScroll(e) {
    const delta = Math.sign(e.deltaY);

    if (delta === 1)
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    else window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
  }

  useEffect(() => {
    if (once && buttonPress && data?.address) {
      window.addEventListener("wheel", handleScroll, { passive: true });
    }
  }, [once, buttonPress, data?.address, currentPage]);

  // useEffect(() => {
  //   console.log(ref.current);
  // }, [ref.current]);

  return (
    <main>
      <section id="page1">
        <div id="greeting">
          <span id="gm">GM, my name is</span>

          <h1>
            samscolari
            <span id="extension" aria-label={selectedText}>
              {currentText}
            </span>
          </h1>
          <p id="tagline">I design and build fun web3 experiences!</p>
        </div>

        <div id="connect">
          <ConnectButton.Custom>
            {({ account, openConnectModal, mounted }) => {
              if (!mounted || !account)
                return (
                  <>
                    <animated.div
                      style={{
                        scale,
                      }}
                    >
                      <button
                        onMouseEnter={() => set({ scale: 1.1 })}
                        onMouseLeave={() => set({ scale: 1 })}
                        onClick={() => {
                          setButtonPress(true);
                          openConnectModal();
                        }}
                      >
                        Connect
                      </button>
                    </animated.div>
                    <small>I won{`'`}t make you sign any transactions</small>
                  </>
                );
              return (
                <>
                  <svg
                    width="24"
                    viewBox="0 0 71 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="65"
                      height="94"
                      rx="32.5"
                      stroke="black"
                      strokeWidth="6"
                    />
                    <rect
                      x="28"
                      y="16"
                      width="14"
                      height="27"
                      rx="7"
                      fill="black"
                    />
                  </svg>

                  <span
                    style={{
                      marginTop: 8,
                      fontWeight: "bold",
                      fontSize: "1.15rem",
                    }}
                  >
                    Scroll Down
                  </span>
                </>
                // <animated.div
                //   style={{
                //     scale,
                //   }}
                // >
                //   <button
                //     onClick={() => setCurrentPage(1)}
                //     onMouseEnter={() => set({ scale: 1.1 })}
                //     onMouseLeave={() => set({ scale: 1 })}
                //   >
                //     Lets go!
                //   </button>
                // </animated.div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </section>

      <section id="page2">
        <h2>Interactive mini-projects</h2>
        <p>See my skills in action with some fun interactive mini-projects!</p>
        <div>
          <h3>Rubik{"'"}s Cube</h3>
          <p>An interactive custom Rubik{"'"}s Cube with your favorite NFTs!</p>
        </div>
        <div>
          <h3>Slot Machine</h3>
          <p>
            Learn about some of my favorite web3 projects and win some tokens
            while you{"'"}re at it!
          </p>
        </div>
        <div>
          <h3>Price Feeds</h3>
          <p>Create your own custom realtime crypto watchlist!</p>
        </div>
      </section>

      <section>
        <p>test</p>
      </section>

      <style jsx>{`
        section {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        #page1 {
          align-items: center;
          justify-content: center;
        }

        #page2 {
          align-items: center;
          justify-content: center;
        }

        main {
          text-align: center;

          display: flex;
          flex-direction: column;
          align-items: center;
        }

        h1 {
          font-size: 6rem;
          font-weight: bold;
          line-height: 1rem;
        }

        h1::before {
          content: url("/nounglasses.svg");
          position: absolute;
          top: 0;
          transform: translateY(4rem) translateX(-2.5rem) rotate(-15deg);
        }

        #tagline {
          color: #a9a9a9;
          font-size: 1.25rem;
          font-weight: 500;
        }

        #gm {
          font-size: 2rem;
          font-weight: bold;
        }

        small {
          color: #a9a9a9;
          margin-top: 16px;
        }

        #greeting {
          position: absolute;
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
          -webkit-text-fill-color: black;
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

        #connect {
          bottom: 80px;
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        button {
          background-color: black;
          color: white;
          border-radius: 12px;
          width: min-content;
          font-weight: 500;
          white-space: nowrap;
          padding-top: 12px;
          padding-bottom: 12px;
          padding-left: 36px;
          padding-right: 36px;
          font-size: 2rem;
          cursor: pointer;
          outline: none;
          border: none;
        }
      `}</style>
    </main>
  );
};

export default Home;
