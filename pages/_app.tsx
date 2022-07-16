import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Head from "next/head";
import Header from "../components/header/Header";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

export const ThemeContext = createContext(null);
function MyApp({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = useState<boolean | undefined>(false);

  const { chains, provider } = configureChains(
    [chain.optimism],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "Sam's Portfolio",
    chains,
  });
  const wagmiClient = createClient({
    connectors,
    provider,
  });

  useEffect(() => {
    window.addEventListener("unload", () => window.scrollTo(0, 0));
    window.addEventListener("keydown", (e) => {
      if (e.key === " ") e.preventDefault();
    });
  });

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <Head>
        <title>Sam Scolari</title>
        <link rel="icon" type="image/x-icon" href="favicon.ico"></link>
      </Head>
      <Header />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={isDark ? darkTheme() : lightTheme()}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
      <style jsx global>{`
        * {
          font-family: "Inter";
          box-sizing: border-box;
        }

        body {
          width: 100vw;
          height: 100vh;
          margin: 0;

          transition: background-color 0.25s;
          background-color: ${isDark ? "#131313" : "white"};
        }

        section {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          scroll-snap-align: start;
        }

        h2 {
          font-size: 3rem;
          color: ${isDark ? "white" : "black"};
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        p {
          color: #a9a9a9;
          font-size: 1rem;
        }

        small {
          color: #a9a9a9;
        }

        h1,
        h2,
        a,
        p,
        small,
        span {
          user-select: none;
        }
      `}</style>
    </ThemeContext.Provider>
  );
}

export default MyApp;

// const videoRef = useRef();

// useEffect(() => {
//   videoRef.current.playbackRate = 0.5;
// }, []);

/* <video autoPlay muted loop ref={videoRef}>
      <source src="/wave.mp4" type="video/mp4" />
    </video> */

/* video {
          position: fixed;
          z-index: -1;
          min-height: 100%;
          min-width: 100%;
          filter: blur(100px);
          opacity: 0.8;
        }*/
