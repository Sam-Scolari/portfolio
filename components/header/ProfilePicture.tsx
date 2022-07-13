import { animated, useSpring } from "react-spring";
import Image from "next/image";
import { useState } from "react";

export default function ProfilePicture() {
  const [{ scale }, set] = useSpring(() => ({ scale: 1 }));
  const [meatspace, setMeatspace] = useState(false);
  return (
    <animated.div
      style={{
        scale,
        userSelect: "none",
      }}
    >
      <Image
        src={meatspace ? "/meatspacepfp.jpg" : "/pfp.webp"}
        loading="eager"
        alt="Sam's profile picture"
        width={60}
        height={60}
        objectFit="cover"
        draggable={false}
        onClick={() => setMeatspace(!meatspace)}
        onMouseEnter={() => set({ scale: 1.25 })}
        onMouseLeave={() => set({ scale: 1 })}
        style={{ borderRadius: "100%", cursor: "pointer" }}
      ></Image>
    </animated.div>
  );
}
