import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Link from "next/link";
import Image from "next/image";

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
          <Link href="/">
            <Image src="pfp.jpg" alt="Sam's profile picture" />
          </Link>

          <section id="links">
            <Link
              href="https://rainbow.me/samscolari.eth"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                style={{ borderRadius: 6 }}
                src="/rainbow.svg"
                alt="Rainbow Wallet"
              />
            </Link>
            <Link
              href="https://lenster.xyz/u/samscolari.lens"
              target="_blank"
              rel="noreferrer"
            >
              <Image src="/lens.svg" alt="Lens Protocol" />
            </Link>
            <Link
              href="https://github.com/Sam-Scolari"
              target="_blank"
              rel="noreferrer"
            >
              <Image src="/github.svg" alt="Github" />
            </Link>
            <Link
              href="https://twitter.com/SamScolari"
              target="_blank"
              rel="noreferrer"
            >
              <Image src="/twitter.svg" alt="Twitter" />
            </Link>
            <Link
              href="https://discordapp.com/users/174640628456620032/"
              target="_blank"
            >
              <Image src="/discord.svg" alt="Discord" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/sam-scolari/"
              target="_blank"
              rel="noreferrer"
            >
              <Image src="/linkedin.svg" alt="LinkedIn" />
            </Link>
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
