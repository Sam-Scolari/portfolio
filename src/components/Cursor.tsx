import { createSignal, onMount } from "solid-js";

export default function Cursor() {
  const [moving, setMoving] = createSignal(false);

  let pink: HTMLDivElement;
  let red: HTMLDivElement;
  let purple: HTMLDivElement;

  onMount(() => {
    let timer: number;

    document.addEventListener("mousemove", (e) => {
      const position = {
        pink: {
          x: e.clientX - pink.offsetWidth / 2,
          y: e.clientY - pink.offsetHeight / 2,
        },
        red: {
          x: e.clientX - red.offsetWidth / 2 - 20,
          y: e.clientY - red.offsetHeight / 2 + 10,
        },
        purple: {
          x: e.clientX - purple.offsetWidth / 2 + 10,
          y: e.clientY - purple.offsetHeight / 2 - 10,
        },
      };

      pink.animate(
        {
          transform: `translate(${position.pink.x}px, ${position.pink.y}px)`,
        },
        { duration: 400, fill: "forwards" }
      );
      red.animate(
        {
          transform: `translate(${position.red.x}px, ${position.red.y}px)`,
        },
        { duration: 400, delay: 16, fill: "forwards" }
      );
      purple.animate(
        {
          transform: `translate(${position.purple.x}px, ${position.purple.y}px)`,
        },
        { duration: 400, delay: 24, fill: "forwards" }
      );

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setMoving(false), 100);

      if (!moving()) setMoving(true);
    });
  });
  return (
    <div
      style={{ opacity: moving() ? "1" : "0" }}
      class="transition-opacity duration-500 -z-10 fixed pointer-events-none"
    >
      <div
        //@ts-ignore
        ref={pink}
        class="fixed bg-[radial-gradient(circle,_rgba(255,0,229,0.25),_transparent_50%)] w-32 h-32 rounded-full"
      />
      <div
        //@ts-ignore
        ref={red}
        class="fixed bg-[radial-gradient(circle,_rgba(229,34,104,0.25),_transparent_50%)] w-20 h-20 rounded-full"
      />
      <div
        //@ts-ignore
        ref={purple}
        class="fixed bg-[radial-gradient(circle,_rgba(130,71,229,0.25),_transparent_60%)] w-20 h-20 rounded-full"
      />
    </div>
  );
}
