import { CSSProperties, useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeContext } from "../pages/_app";

export default function Header() {
  return (
    <header>
      <ProfilePicture />
      <nav>
        <div className="social-icons">
          <SocialIcon
            href="https://rainbow.me/samscolari.eth"
            src="/icons/rainbow.svg"
            alt="Rainbow Wallet"
          />
          <SocialIcon
            href="https://lenster.xyz/u/samscolari.lens"
            src="/icons/lens.svg"
            alt="Lens Protocol"
          />
          <SocialIcon
            href="https://github.com/Sam-Scolari"
            src="/icons/github.svg"
            alt="Github"
          />
          <SocialIcon
            href="https://twitter.com/SamScolari"
            src="/icons/twitter.svg"
            alt="Twitter"
          />
          <SocialIcon href="/" src="/icons/orb.png" alt="Orb" />
          <SocialIcon
            href="https://www.linkedin.com/in/sam-scolari/"
            src="/icons/linkedin.svg"
            alt="LinkedIn"
          />
        </div>
      </nav>

      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: none;
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

        .social-icons {
          display: flex;
          align-items: center;
        }

        @media only screen and (max-width: 850px) {
          .social-icons {
            display: none;
          }
        }

        @media only screen and (max-width: 700px) {
          header {
            padding-left: 32px;
            padding-right: 32px;
          }
        }

        @media only screen and (max-width: 450px) {
          header {
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 30px;
          }
        }
      `}</style>
    </header>
  );
}

function ProfilePicture() {
  const [meatspace, setMeatspace] = useState(false);
  return (
    <div>
      <Image
        src={meatspace ? "/meatspacepfp.jpg" : "/pfp.jpg"}
        loading="eager"
        alt="Sam's profile picture"
        width={60}
        height={60}
        objectFit="cover"
        draggable={false}
        onClick={() => setMeatspace(!meatspace)}
        style={{
          borderRadius: "100%",
          cursor: "pointer",
        }}
      ></Image>
      <style jsx>{`
        div {
          transition: transform 0.5s;
          pointer-events: auto;
        }
        div:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}

export function SocialIcon({
  href,
  src,
  alt,
  style,
}: {
  href: string;
  src: string;
  alt: string;
  style?: CSSProperties;
}) {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <div>
      <Link href={href}>
        <a target="_blank" rel="noreferrer" style={style}>
          <Image
            style={{
              borderRadius:
                src === "/icons/rainbow.svg" || src === "/icons/orb.png"
                  ? 6
                  : src === "/icons/linkedin.svg"
                  ? 5
                  : 0,
              filter:
                src === "/icons/github.svg" && isDark ? "invert(1)" : "none",
              transition: "filter 0.5s",
              backgroundColor:
                src === "/icons/linkedin.svg" ? "white" : "transparent",
            }}
            src={src}
            alt={alt}
            width={32}
            height={32}
            draggable={false}
            loading="eager"
          />
        </a>
      </Link>
      <style jsx>{`
        div {
          transition: transform 0.5s;
        }
        div:hover {
          transform: scale(1.2);
        }
        a {
          margin-left: 12px;
          margin-right: 12px;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}
