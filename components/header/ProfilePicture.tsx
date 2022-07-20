import Image from "next/image";
import { useState } from "react";

export default function ProfilePicture() {
  const [meatspace, setMeatspace] = useState(false);
  return (
    <div>
      <Image
        src={meatspace ? "/meatspacepfp.jpg" : "/pfp.webp"}
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
        }
        div:hover {
          transform: scale(1.25);
        }
      `}</style>
    </div>
  );
}
