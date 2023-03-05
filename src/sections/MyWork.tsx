import Projects from "../projects.json";
import Carousel from "../components/Carousel";

export default function MyWork() {
  return (
    <div class="w-full pt-32 pb-48 flex flex-col gap-16 items-center justify-center">
      <div class="flex flex-col items-center gap-4">
        <h2 class="text-5xl font-semibold select-none">My Work</h2>
        <p class="text-grey text-xl select-none">Check out some of my work</p>
      </div>
      <Carousel projects={Projects} />
      <p class="font-semibold text-xl select-none">Nouns Esports</p>
    </div>
  );
}
