import Link from "next/link";
import { CSSProperties, useContext } from "react";
import Image from "next/image";
import { ThemeContext } from "../../pages/_app";

export default function Icon({
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
                src === "/rainbow.svg" ? 6 : src === "/linkedin.svg" ? 5 : 0,
              filter: src === "/github.svg" && isDark ? "invert(1)" : "none",
              transition: "filter 0.5s",
              backgroundColor:
                src === "/linkedin.svg" ? "white" : "transparent",
            }}
            src={src}
            alt={alt}
            width={32}
            height={32}
            draggable={false}
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
