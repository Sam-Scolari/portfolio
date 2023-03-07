import Projects from "../projects.json";
import { For, createEffect, createSignal, onMount } from "solid-js";

export default function MyWork() {
  const [currentIndex, setCurrentIndex] = createSignal(
    Math.floor(Object.keys(Projects).length / 2)
  );

  onMount(() => {
    const carousel = document.getElementById("carousel") as HTMLDivElement;
    carousel.scrollTo(carousel.scrollWidth / 2 - 450 * 2, 0);

    carousel.addEventListener("scroll", () => {
      const index = Math.floor(carousel.scrollLeft / (450 + 64)) - 1;

      if (currentIndex() !== index) {
        setCurrentIndex(index);
      }
    });
  });

  createEffect(() => {
    console.log(Projects[currentIndex()]);
  });

  return (
    <div class="w-full pt-32 pb-48 flex flex-col gap-16 items-center justify-center">
      <div class="flex flex-col items-center gap-4">
        <h2 class="text-5xl font-semibold select-none">My Work</h2>
        <p class="text-grey text-xl select-none">Check out some of my work</p>
      </div>
      <div
        id="carousel"
        class="w-full gap-16 select-none scrollbar-hidden overflow-y-visible  flex overflow-x-scroll snap-x snap-mandatory"
      >
        <For each={Projects}>
          {(project) => (
            <img
              draggable={false}
              src={project.image}
              alt={project.name}
              class="cursor-pointer hover:scale-110 min-w-[450px] h-[30vh] rounded-2xl transition-transform duration-300 object-cover snap-center first:ml-[100vw] last:mr-[100vw]"
            />
          )}
        </For>
      </div>
      <p class="font-semibold text-xl select-none">
        {Projects[currentIndex()].name}
      </p>
    </div>
  );
}
