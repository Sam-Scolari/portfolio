import { useState } from "react";
import { animated, useTransition } from "react-spring";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const transitions = useTransition(darkMode, {
    from: { opacity: 0, position: "absolute" },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: darkMode,
    duration: 100,
  });
  return transitions(({ opacity }, item) =>
    item ? (
      <animated.div
        style={{
          position: "absolute",
          opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
        }}
      >
        <img
          src="/day.svg"
          onClick={() => setDarkMode(!darkMode)}
          height={36}
        ></img>
      </animated.div>
    ) : (
      <animated.div
        style={{
          position: "absolute",
          opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
        }}
      >
        <img
          src="/night.svg"
          onClick={() => setDarkMode(!darkMode)}
          height={36}
        ></img>
      </animated.div>
    )
  );
}
