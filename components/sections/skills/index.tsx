import useLayout from "../../hooks/useLayout";
import Asteroids from "./asteroids";
import Tetris from "./tetris";

export default function Skills() {
  const { mobile } = useLayout();
  return (
    <section>
      {mobile ? <Tetris /> : <Asteroids />}
      <style jsx>{`
        section {
          cursor: none;
        }
      `}</style>
    </section>
  );
}
