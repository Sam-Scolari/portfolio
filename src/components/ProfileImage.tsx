import { createSignal } from "solid-js";

export default function ProfileImage() {
  const [meatspace, setMeatspace] = createSignal(true);

  return (
    <img
      src={`${meatspace() ? "meatspace" : "noun"}.webp`}
      onClick={() => setMeatspace(!meatspace())}
      alt="Sam Scolari"
      draggable={false}
      class="pointer-events-auto w-16 h-16 max-sm:w-14 max-sm:h-14 hover:scale-125 transition-transform duration-300 cursor-pointer select-none"
    />
  );
}
