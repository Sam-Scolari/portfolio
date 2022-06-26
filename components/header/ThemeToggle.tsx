import { useContext, useState } from "react";
import { animated, useTransition } from "react-spring";
import { ThemeContext } from "../../pages/_app";
export default function DarkModeToggle() {
  const { isDark, setIsDark } = useContext(ThemeContext);

  const transitions = useTransition<boolean, object>(isDark, {
    from: { opacity: 0, position: "absolute" },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: isDark,
    duration: 100,
  });

  return transitions(({ opacity }, item) =>
    item ? (
      <animated.div
        style={{
          position: "absolute",
          opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
          userSelect: "none",
        }}
      >
        <img src="/night.svg" height={36} draggable={false}></img>
      </animated.div>
    ) : (
      <animated.div
        style={{
          position: "absolute",
          opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
          userSelect: "none",
        }}
      >
        <img src="/day.svg" height={36} draggable={false}></img>
      </animated.div>
    )
  );
}
