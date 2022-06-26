import { useContext, useState, useTransition } from "react";
import { animated, config, useSpring } from "react-spring";
import Image from "next/image";
import SocialIcon from "./SocialIcon";
import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "../../pages/_app";
import ProfilePicture from "./ProfilePicture";

export default function Header() {
  const [{ scale }, set] = useSpring(() => ({ scale: 1 }));

  const { isDark, setIsDark } = useContext(ThemeContext);
  const [isHover, setIsHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  return (
    <header>
      <ProfilePicture />
      <nav>
        <SocialIcon
          href="https://rainbow.me/samscolari.eth"
          src="/rainbow.svg"
          alt="Rainbow Wallet"
        />
        <SocialIcon
          href="https://lenster.xyz/u/samscolari.lens"
          src="/lens.svg"
          alt="Lens Protocol"
        />
        <SocialIcon
          href="https://github.com/Sam-Scolari"
          src="/github.svg"
          alt="Github"
        />
        <SocialIcon
          href="https://twitter.com/SamScolari"
          src="/twitter.svg"
          alt="Twitter"
        />
        <SocialIcon
          href="https://discordapp.com/users/174640628456620032/"
          src="/discord.svg"
          alt="Discord"
        />
        <SocialIcon
          href="https://www.linkedin.com/in/sam-scolari/"
          src="/linkedin.svg"
          alt="LinkedIn"
        />
        <animated.div
          onClick={() => {
            set({ scale: 1 });
            setClicked(true);
          }}
          onMouseEnter={() => {
            setIsHover(true);
            set({ scale: 1.25 });
            setIsDark(!isDark);
          }}
          onMouseLeave={() => {
            setIsHover(false);
            set({ scale: 1 });
            if (!clicked) setIsDark(false);
            setClicked(false);
          }}
          style={{
            marginRight: 80,
            height: 36,
            marginLeft: 64,
            marginTop: -4,
            cursor: "pointer",
            scale: scale,
          }}
        >
          <ThemeToggle />
        </animated.div>
      </nav>

      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;

          position: fixed;
          min-width: 100%;

          padding-top: 40px;
          padding-left: 80px;
          padding-right: 80px;
          z-index: 1;
        }

        nav {
          display: flex;
          align-items: center;
        }
      `}</style>
    </header>
  );
}
