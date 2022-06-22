import Link from "next/link";
import { CSSProperties } from "react";
import { animated, useSpring } from "react-spring";
import Image from "next/image";

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
  const [{ scale }, set] = useSpring(() => ({ scale: 1 }));
  return (
    <animated.div
      style={{
        scale,
      }}
    >
      <Link href={href}>
        <a
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => set({ scale: 1.25 })}
          onMouseLeave={() => set({ scale: 1 })}
          style={style}
        >
          <Image
            style={{ borderRadius: src === "/rainbow.svg" ? 6 : 0 }}
            src={src}
            alt={alt}
            width={32}
            height={32}
          />
        </a>
      </Link>
      <style jsx>{`
        a {
          margin-left: 12px;
          margin-right: 12px;
        }
      `}</style>
    </animated.div>
  );
}
