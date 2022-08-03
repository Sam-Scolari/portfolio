import useLayout from "../../hooks/useLayout";
import Asteroids from "./asteroids";
import Tetris from "./tetris";

export default function Skills() {
  const { mobile, animate } = useLayout();
  return (
    <section>
      {mobile ? <Tetris /> : <Asteroids />}
      <style jsx>{``}</style>
    </section>
  );
}
