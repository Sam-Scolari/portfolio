import Game, { Box, GameObject, Scene } from "@sam-scolari/game-engine";
import { createEffect, createSignal, onMount } from "solid-js";

export default function GameOfLife() {
  let canvas: HTMLCanvasElement;

  const [paused, setPaused] = createSignal(false);

  onMount(() => {
    const game = new Game(canvas);

    const spacing = 2;
    const size = 18;
    const offset = size / 2;

    const scene = new Scene();

    // const matrix: Array<Array<GameObject>> = (() => {
    //   let array = [];

    //   for (
    //     let i = 0;
    //     i < Math.round(window.innerHeight / (spacing + size)) + 1;
    //     i++
    //   ) {
    //     array.push([]);
    //     for (
    //       let j = 0;
    //       j < Math.round(window.innerWidth / (spacing + size));
    //       j++
    //     ) {
    //       const tile = new Box();
    //       tile.size = { width: size, height: size };
    //       tile.fill = "black";
    //       tile.visible = false;

    //       scene.add(tile);
    //       //@ts-ignore
    //       array[i].push(tile);
    //     }
    //   }

    //   return array;
    // })();

    type Matrix = { [key: string]: { [key: string]: GameObject } };

    let matrix: Matrix = (() => {
      const object: Matrix = {};

      for (
        let i = 0;
        i < Math.round(window.innerHeight / (spacing + size)) + 1;
        i++
      ) {
        object[i] = {};
        for (
          let j = 0;
          j < Math.round(window.innerWidth / (spacing + size));
          j++
        ) {
          const tile = new Box();
          tile.size = { width: size, height: size };

          tile.position = {
            x: j * (size + spacing) - offset,
            y: i * (size + spacing) - offset,
          };

          tile.fill = "black";
          tile.visible = false;

          scene.add(tile);
          object[i][j] = tile;
        }
      }

      return object;
    })();

    game.onClick((e) => {
      if (!paused()) {
        setPaused(true);
      }

      const column = Math.round(e.pageY / (spacing + size));
      const row = Math.round(e.pageX / (spacing + size));

      const tile = matrix[column][row];

      tile.visible = !tile.visible;
    });

    setInterval(() => {
      if (!paused()) {
        const state = matrix;

        for (let i = 0; i < Object.keys(matrix).length; i++) {
          for (let j = 0; j < Object.keys(matrix[i]).length; j++) {
            const tile = state[i][j];

            const neighbors = {
              top: matrix[i - 1]?.[j],
              topRight: matrix[i - 1]?.[j + 1],
              right: matrix[i][j + 1],
              bottomRight: matrix[i + 1]?.[j + 1],
              bottom: matrix[i + 1]?.[j],
              bottomLeft: matrix[i + 1]?.[j - 1],
              left: matrix[i][j - 1],
              topLeft: matrix[i - 1]?.[j - 1],
            };

            let count = 0;
            for (const neighbor of Object.values(neighbors)) {
              if (neighbor?.visible) {
                count++;
              }
            }

            if (tile.visible) {
              if (count < 2 || count > 3) {
                tile.visible = false;
              }
            } else {
              if (count === 3) {
                tile.visible = true;
              }
            }
          }
        }

        matrix = state;
      }
    }, 1000);

    game.onKeyDown((e) => {
      if (e.key === "Enter") {
        setPaused(false);
      }
    });

    game.load(scene);

    game.start();
  });

  return (
    <>
      <canvas
        //@ts-ignore
        ref={canvas}
        class="absolute top-0 w-screen h-[calc(100vh_+_18px)]"
      />
      <p
        style={{ opacity: paused() ? "1" : "0" }}
        class="select-none text-lg pointer-events-none absolute top-[calc(100vh_-_64px)] left-16 transition-opacity duration-300 font-silkscreen text-grey"
      >
        Press <span class="text-black">[enter]</span> to start
      </p>
    </>
  );
}
