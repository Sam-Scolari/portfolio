import ProjectData from "../projects.json";
import { For, Show, createEffect, createSignal, onMount } from "solid-js";

export default function Projects() {
  const [details, setDetails] = createSignal(false);

  const [currentIndex, setCurrentIndex] = createSignal(
    Math.floor(Object.keys(Projects).length / 2)
  );

  const [cachedIndex, setCachedIndex] = createSignal(0);

  const cardWidth = () => {
    if (window.innerWidth < 640) {
      return window.innerWidth - 80;
    }

    return 450;
  };

  onMount(() => {
    const carousel = document.getElementById("carousel") as HTMLDivElement;

    carousel.scrollTo(carousel.scrollWidth / 2 - cardWidth() * 2, 0);

    carousel.addEventListener("scroll", () => {
      // This needs to factor in the width change of the cards at a mobile display
      const index = Math.floor(
        (carousel.scrollLeft - window.innerWidth / 2 - cardWidth() / 2) /
          cardWidth()
      );

      if (currentIndex() !== index) {
        setCurrentIndex(index);
      }
    });
  });

  const currentProject = () => ProjectData[currentIndex()];

  return (
    <div class="relative w-full h-screen flex flex-col items-center justify-center">
      <div
        style={{
          opacity: details() ? "0" : "1",
          "pointer-events": details() ? "none" : "auto",
        }}
        class="flex flex-col w-full h-full items-center  gap-16 justify-center transition-opacity duration-300"
      >
        <div class="flex flex-col items-center gap-4">
          <h2 class="text-5xl font-semibold select-none">Projects</h2>
          <p class="text-grey text-xl select-none">Check out some of my work</p>
        </div>
        <div
          id="carousel"
          class="w-full h-[30vh] scroll-smooth items-center gap-16 select-none scrollbar-hidden overflow-y-visible  flex overflow-x-scroll snap-x snap-mandatory"
        >
          <For each={ProjectData}>
            {(project, index) => (
              <img
                onClick={() => {
                  setCachedIndex(currentIndex());
                  setCurrentIndex(index());
                  setDetails(true);
                }}
                onMouseEnter={(e) => {
                  if (project.gif) e.currentTarget.src = project.gif;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.src = project.image;
                }}
                id={project.name}
                draggable={false}
                src={project.image}
                alt={project.name}
                class="cursor-pointer hover:scale-110 max-sm:min-w-[calc(100vw_-_80px)] min-w-[450px] aspect-video rounded-2xl transition-transform duration-300 object-cover snap-center first:ml-[100vw] last:mr-[100vw]"
              />
            )}
          </For>
        </div>
        <div class="flex gap-8 items-center">
          <img
            onClick={() => {
              const carousel = document.getElementById(
                "carousel"
              ) as HTMLDivElement;

              const card = document.getElementById(
                currentProject().name
              ) as HTMLDivElement;

              carousel.scrollBy(-card.clientWidth, 0);
            }}
            src="/icons/arrow-left-circle.svg"
            class="w-8 h-8 cursor-pointer select-none"
            alt="Arrow left"
            draggable={false}
          />
          <p class="font-semibold text-xl select-none ">
            {currentProject().name}
          </p>
          <img
            onClick={() => {
              const carousel = document.getElementById(
                "carousel"
              ) as HTMLDivElement;

              const card = document.getElementById(
                currentProject().name
              ) as HTMLDivElement;

              carousel.scrollBy(card.clientWidth, 0);
            }}
            src="/icons/arrow-left-circle.svg"
            class="rotate-180 w-8 h-8 cursor-pointer select-none"
            alt="Arrow right"
            draggable={false}
          />
        </div>
      </div>

      <div
        style={{
          opacity: details() ? "1" : 0,
          "pointer-events": details() ? "auto" : "none",
        }}
        class="absolute h-full mr-8 transition-opacity duration-300 flex items-center"
      >
        <div class="flex flex-col w-1/2 p-12 gap-8">
          <div
            onClick={() => {
              setCurrentIndex(cachedIndex());
              setDetails(false);
            }}
            class="flex  items-center gap-4 cursor-pointer text-2xl font-semibold"
          >
            <img src="/icons/arrow-left.svg" class="w-6" />
            My Work
          </div>
          <div
            onClick={() => {
              if (currentProject().links.site) {
                window.open(currentProject().links.site);
              }
            }}
            style={{
              cursor: currentProject().links.site ? "pointer" : "default",
            }}
            class="flex items-start w-min"
          >
            <h2
              style={{
                color: currentProject().links.site ? "blue" : "black",
                "text-decoration": currentProject().links.site
                  ? "underline"
                  : "none",
              }}
              class="text-5xl font-semibold whitespace-nowrap"
            >
              {currentProject().name}
            </h2>
            <Show when={currentProject().links.site}>
              <img
                src="/icons/open.svg"
                alt={`Open ${currentProject().links.site}`}
                class="w-4"
              />
            </Show>
          </div>

          <p class="text-grey ">{currentProject().description}</p>
          <div class="flex gap-4">
            <For each={Object.entries(currentProject().links)}>
              {([type, link]) => (
                <Show when={link && type !== "site"}>
                  <a
                    href={link}
                    class="flex items-center gap-2 hover:bg-[#E7E7E7] bg-white border-[#E7E7E7] rounded-lg p-2 border-2 text-lg text-grey"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`/socials/${type}.\webp`}
                      class="rounded-lg w-8"
                    />
                    {type === "mirror"
                      ? "Case Study"
                      : type[0].toUpperCase() + type.substring(1)}
                  </a>
                </Show>
              )}
            </For>
          </div>
        </div>
        <div class="h-full flex items-center">
          <img
            draggable={false}
            src={currentProject().gif || currentProject().image}
            alt={currentProject().name}
            class="h-3/4 aspect-video object-cover rounded-tl-2xl rounded-bl-2xl select-none translate-x-[32px]"
          />
        </div>
      </div>
    </div>
  );
}
