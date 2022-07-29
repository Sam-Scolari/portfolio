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
import useLayout from "../components/hooks/useLayout";

export const ThemeContext = createContext(null);
function MyApp({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = useState<boolean | undefined>(false);
  // const { height } = useLayout();
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

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  });

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <Head>
        <title>Sam Scolari</title>
        <link rel="icon" type="image/x-icon" href="favicon.ico"></link>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        ></meta>
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
          position: fixed;
          width: 100%;
          height: 100vh;
          height: calc(var(--vh, 1vh) * 100);

          margin: 0;
          cursor: url("/blackcur.png") auto;
          transition: background-color 0.25s;
          background-color: ${isDark ? "#131313" : "white"};
        }

        section {
          background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'  stroke-width='1' stroke='hsla(0, 0%, 96%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");

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
          font-size: 1.25rem;
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

        @media only screen and (max-width: 1000px) {
          h2 {
            font-size: 2.5rem;
          }

          p {
            font-size: 1rem;
          }
        }
      `}</style>
    </ThemeContext.Provider>
  );
}

export default MyApp;
