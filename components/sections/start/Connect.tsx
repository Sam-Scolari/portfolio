import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContext } from "react";
import { ThemeContext } from "../../../pages/_app";
import { useAccount } from "wagmi";

export default function Connect({ setWasPressed }) {
  const { data } = useAccount();

  const { isDark, setIsDark } = useContext(ThemeContext);
  return (
    <div id="connect">
      <ConnectButton.Custom>
        {({ account, openConnectModal, mounted }) => {
          if (!mounted || !account)
            // return (
            //   <>
            //     <animated.div
            //       style={{
            //         scale,
            //       }}
            //     >
            //       <button
            //         onMouseEnter={() => set({ scale: 1.1 })}
            //         onMouseLeave={() => set({ scale: 1 })}
            //         onClick={() => {
            //           setWasPressed(true);
            //           openConnectModal();
            //         }}
            //       >
            //         Connect
            //       </button>
            //     </animated.div>
            //     <small>I won{`'`}t make you sign any transactions</small>
            //   </>
            // );
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
                    stroke={isDark ? "white" : "black"}
                    strokeWidth="6"
                  />
                  <rect
                    id="scrollWheel"
                    x="28"
                    y="16"
                    width="14"
                    height="27"
                    rx="7"
                    fill={isDark ? "white" : "black"}
                  />
                </svg>

                <span
                  style={{
                    marginTop: 8,
                    fontWeight: "bold",
                    fontSize: "1.15rem",
                    color: isDark ? "white" : "black",
                    transition: "color 0.5s",
                  }}
                >
                  Scroll Down
                </span>
              </>
            );
        }}
      </ConnectButton.Custom>
      <style jsx>{`
        small {
          margin-top: 16px;
        }

        #scrollWheel {
          animation-timing-function: ease-out;
          animation: ${
            /*data?.address*/ true ? "slide 2.25s infinite" : "none"
          };
        }

        @keyframes slide {
          0% {
            opacity: 0;
            y: 16;
          }
          35% {
            opacity: 1;
            y: 16;
          }

          100% {
            y: 56;
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
          user-select: none;
        }

        @media only screen and (max-width: 650px) {
          button {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
