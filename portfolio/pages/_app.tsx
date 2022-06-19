import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

function MyApp({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
  );
  const { connectors } = getDefaultWallets({
    appName: "Sam's Portfolio",
    chains,
  });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <nav>
          <a href="/">
            <img src="pfp.jpg" alt="Sam's profile picture"></img>
          </a>

          <section id="links">
            <a href="https://rainbow.me/samscolari.eth" target="_blank">
              <img
                style={{ borderRadius: 6 }}
                src="/rainbow.svg"
                alt="Rainbow Wallet"
              />
            </a>
            <a href="https://lenster.xyz/u/samscolari.lens" target="_blank">
              <img src="/lens.svg" alt="Lens Protocol" />
            </a>
            <a href="https://github.com/Sam-Scolari" target="_blank">
              <img src="/github.svg" alt="Github" />
            </a>
            <a href="https://twitter.com/SamScolari" target="_blank">
              <img src="/twitter.svg" alt="Twitter" />
            </a>
            <a
              href="https://discordapp.com/users/174640628456620032/"
              target="_blank"
            >
              <img src="/discord.svg" alt="Discord" />
            </a>
            <a href="https://www.linkedin.com/in/sam-scolari/" target="_blank">
              <img src="/linkedin.svg" alt="LinkedIn" />
            </a>
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

        nav > a > img {
          border-radius: 100%;
          width: 60px;
          height: 60px;
        }

        #links {
          display: flex;
          align-items: center;
        }

        #links > a:hover > img {
          width: 40px;
          height: 40px;
        }

        #links > a {
          padding-left: 12px;
          padding-right: 12px;
        }

        #links:last-child {
          padding-right: 0;
        }
      `}</style>
    </WagmiConfig>
  );
}

export default MyApp;
