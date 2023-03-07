import { For, createEffect, createSignal, onMount } from "solid-js";

export default function Carousel(props: { projects: any }) {
  const length = Object.keys(props.projects).length;

  const gap = 32;
  const width = 450;
  const middleIndex = Math.floor(length / 2);

  const [currentIndex, setCurrentIndex] = createSignal(middleIndex);

  onMount(() => {
    const carousel = document.getElementById("carousel") as HTMLDivElement;
    carousel.scrollTo(carousel.scrollWidth / 2 - width * 2, 0);

    carousel.addEventListener("scroll", () => {
      const index = Math.floor(carousel.scrollLeft / (width + gap)) - 1;

      if (currentIndex() !== index) {
        setCurrentIndex(index);
      }
    });
  });

  return (
    <div
      id="carousel"
      style={{ gap: `${gap}px` }}
      class="w-full h-[30vh] select-none scrollbar-hidden flex overflow-x-scroll snap-x snap-mandatory"
    >
      <For each={props.projects}>
        {(project, index) => {
          // const stepRotation = 15;
          // const deviation = () => {
          //   // if (index() === 0) {
          //   //   console.log("//////////////////////////////");
          //   // }
          //   // console.log(index(), index() - currentIndex());

          //   return index() - currentIndex();
          // };

          return (
            <div class="relative hover:scale-110 transition-transform duration-300 h-full snap-center first:ml-[100vw] last:mr-[100vw]">
              <img
                style={{
                  // "transform-style": "preserve-3d",
                  // transform: `translateZ(${(deviation() + 1) * 0}) rotateY(${
                  //   deviation() * stepRotation
                  // }deg)`,
                  "min-width": `${width}px`,
                }}
                draggable={false}
                src={project.image}
                alt={project.name}
                class="w-full h-full rounded-2xl transition-transform duration-300 object-cover "
              />
            </div>
          );
        }}
      </For>
    </div>
  );
}

// function Card(props: {
//   project: any;
//   width: number;
//   index: number;
//   currentIndex: number;
// }) {
//   const stepRotation = 15;
//   const deviation = () => props.index - props.currentIndex;

//   console.log(props.currentIndex, deviation());

//   return (
//     <img
//       style={{
//         "transform-style": "preserve-3d",
//         // transform: `translateZ(600px) rotateY(${
//         //   deviation * stepRotation
//         // }deg)`,
//         transform: `rotateY(${deviation() * stepRotation}deg)`,
//         "min-width": `${props.width}px`,
//       }}
//       class="h-full object-cover snap-center first:ml-[100vw] last:mr-[100vw]"
//       draggable={false}
//       src={props.project.image}
//     />
//   );
// }

// export default function Carousel(props: { projects: any }) {
//   const length = Object.keys(props.projects).length;

//   return (
//     <div
//       class="relative w-full h-[30vh] select-none"
//       style={{ perspective: "1500px" }}
//     >
//       <div
//         class="absolute w-full h-full transition-transform duration-300 flex items-center justify-center"
//         style={{
//           "transform-style": "preserve-3d",
//           transform: "translateZ(600px)",
//         }}
//       >
//         <For each={props.projects}>
//           {(project, index) => (
//             <Card project={project} length={length} index={index()} />
//           )}
//         </For>
//       </div>
//     </div>
//   );
// }

// function Card(props: { project: any; length: number; index: number }) {
//   const [hovering, setHovering] = createSignal(false);

//   return (
//     <img
//       onMouseEnter={() => setHovering(true)}
//       onMouseLeave={() => setHovering(false)}
//       src={props.project.image}
//       alt={props.project.name}
//       draggable={false}
//       style={{
//         transform: `rotateY(${
//           (360 / props.length) * props.index
//         }deg) translateZ(${75 * props.length}px) rotateY(180deg)${
//           hovering() ? "scale(1.25)" : ""
//         }`,
//       }}
//       class="absolute w-[450px] h-full cursor-pointer transition-transform duration-300"
//     />
//   );
// }
