import { useState, useTransition } from "react";
import { animated, config, useSpring } from "react-spring";
import Image from "next/image";
import Icon from "./Icon";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  const [{ scale }, set] = useSpring(() => ({ scale: 1 }));
  const [meatspace, setMeatspace] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  return (
    <header>
      <nav>
        <animated.div
          style={{
            scale,
          }}
        >
          <Image
            src={meatspace ? "/meatspacepfp.jpg" : "/pfp.png"}
            loading="eager"
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
          />
          <div
            style={{
              marginRight: 80,
              height: 36,
              marginLeft: 64,
              marginTop: -4,
              cursor: "pointer",
            }}
          >
            <DarkModeToggle />
          </div>
        </section>
      </nav>
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
          z-index: 1;
        }

        #links {
          display: flex;
          align-items: center;
        }
      `}</style>
    </header>
  );
}
