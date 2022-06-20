import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { animated, useSpring } from "react-spring";
import Icon from "../components/Icon";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const [{ scale }, set] = useSpring(() => ({ scale: 1 }));

  const videoRef = useRef();

  // useEffect(() => {
  //   videoRef.current.playbackRate = 0.5;
  // }, []);

  const [meatspace, setMeatspace] = useState(false);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <nav>
          <animated.div
            style={{
              scale,
            }}
          >
            <Image
              src={meatspace ? "/meatspacepfp.jpg" : "/pfp.png"}
              alt="Sam's profile picture"
              width={60}
              height={60}
              objectFit="cover"
              onClick={() => setMeatspace(!meatspace)}
              onMouseEnter={() => set({ scale: 1.25 })}
              onMouseLeave={() => set({ scale: 1 })}
              style={{ borderRadius: "100%", cursor: "pointer" }}
            ></Image>
          </animated.div>

          <section id="links">
            <Icon
              href="https://rainbow.me/samscolari.eth"
              src="/rainbow.svg"
              alt="Rainbow Wallet"
            />
            <Icon
              href="https://lenster.xyz/u/samscolari.lens"
              src="/lens.svg"
              alt="Lens Protocol"
            />
            <Icon
              href="https://github.com/Sam-Scolari"
              src="/github.svg"
              alt="Github"
            />
            <Icon
              href="https://twitter.com/SamScolari"
              src="/twitter.svg"
              alt="Twitter"
            />
            <Icon
              href="https://discordapp.com/users/174640628456620032/"
              src="/discord.svg"
              alt="Discord"
            />
            <Icon
              href="https://www.linkedin.com/in/sam-scolari/"
              src="/linkedin.svg"
              alt="LinkedIn"
              style={{ paddingRight: 0 }}
            />
          </section>
        </nav>
        <Component {...pageProps} />
      </RainbowKitProvider>
      {/* <video autoPlay muted loop ref={videoRef}>
        <source src="/wave.mp4" type="video/mp4" />
      </video> */}
      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;

          position: fixed;
          width: 100%;

          padding-top: 40px;
          padding-left: 80px;
          padding-right: 80px;
        }

        #links {
          display: flex;
          align-items: center;
        }

        video {
          position: fixed;
          z-index: -1;
          min-height: 100%;
          min-width: 100%;
          filter: blur(100px);
          opacity: 0.8;
        }
      `}</style>
    </WagmiConfig>
  );
}

export default MyApp;
