import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { animated, useSpring } from "react-spring";
import Icon from "../components/Icon";
import Image from "next/image";

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
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <nav>
          <animated.div
            style={{
              scale,
            }}
          >
            <a
              href="/"
              onMouseEnter={() => set({ scale: 1.25 })}
              onMouseLeave={() => set({ scale: 1 })}
            >
              <Image
                src="/pfp.jpg"
                alt="Sam's profile picture"
                width={60}
                height={60}
                style={{ borderRadius: "100%" }}
              ></Image>
            </a>
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
      `}</style>
    </WagmiConfig>
  );
}

export default MyApp;
