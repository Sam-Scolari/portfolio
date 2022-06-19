import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const { data } = useAccount();

  const names = [
    "samscolari.eth",
    "samscolari.lens",
    "samscolari.me",
    "samscolari.wallet",
  ];

  const [currentPage, setCurrentPage] = useState(0);

  // Greeting section
  const [currentDomain, setCurrentDomain] = useState("samscolari");
  const [currentExtension, setCurrentExtension] = useState(".eth");

  const [lastData, setLastData] = useState(data);
  const [once, setOnce] = useState(true);

  useEffect(() => {
    if (
      once &&
      (lastData === null || lastData === undefined) &&
      data?.address
    ) {
      var end = Date.now() + 15 * 200;

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      setOnce(false);
    }

    setLastData(data);
  }, [data]);

  return (
    <main>
      {
        {
          0: (
            <>
              <section id="greeting">
                <span id="gm">GM, my name is</span>
                <h1>
                  {currentDomain}
                  <span id="extension">{currentExtension}</span>
                </h1>
                <p id="tagline">I design and build fun web3 experiences!</p>
              </section>
              <section id="connect">
                <ConnectButton.Custom>
                  {({ account, openConnectModal, mounted }) => {
                    if (!mounted || !account)
                      return (
                        <>
                          <button
                            onClick={() => {
                              openConnectModal();
                            }}
                          >
                            Connect
                          </button>
                          <small>I won't make you sign any transactions</small>
                        </>
                      );
                    return (
                      <button onClick={() => setCurrentPage(1)}>
                        Lets go!
                      </button>
                    );
                  }}
                </ConnectButton.Custom>
              </section>
            </>
          ),
        }[currentPage]
      }
      <style jsx>{`
        main {
          text-align: center;

          display: flex;
          flex-direction: column;
          align-items: center;
        }

        h1 {
          font-size: 6rem;
          line-height: 1rem;
          font-weight: bold;
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
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
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

        #connect {
          position: fixed;
          bottom: 80px;
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
        }
      `}</style>
    </main>
  );
};

export default Home;
