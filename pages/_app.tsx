import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Head from "next/head";
import Header from "../components/Header";
import { useEffect, useLayoutEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
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
  });

  return (
    <>
      <Head>
        <title>Sam Scolari</title>
      </Head>
      <Header />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
      <style jsx global>{`
        body {
          overflow-y: hidden;
          scrollbar-width: none;
        }

        body::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      `}</style>
    </>
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
