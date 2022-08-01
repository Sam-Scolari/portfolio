import { useEffect, useRef, useState } from "react";
import { Asteroid } from "./asteroid";
import { Bullet } from "./bullet";
import { Ship } from "./ship";
import { ethers } from "ethers";

export enum State {
  start,
  play,
  end,
}

export default function MySkillsDesktop() {
  const canvas = useRef<any | undefined>();
  const [state, setState] = useState(State.start);

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    // Resize canvas with window
    function resize() {
      if (ctx.canvas) {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
      }
    }
    resize();
    window.addEventListener("resize", resize);

    // Initialize game objects
    let ship = new Ship(ctx);
    let asteroids = [];
    let bullets = [];

    // Key press listeners
    let keys = [];
    document.body.addEventListener("keydown", (e) => (keys[e.key] = true));
    document.body.addEventListener("keyup", (e) => {
      keys[e.key] = false;
      if (e.key === " ")
        bullets.push(
          new Bullet(ctx, ship.x, ship.y, ship.image.height, ship.direction)
        );
    });

    const SRCs = [
      "/asteroids/next.svg",
      "/asteroids/react.svg",
      "/asteroids/typescript.svg",
      "/asteroids/javascript.svg",
      "/asteroids/html.svg",
      "/asteroids/css.svg",
      "/asteroids/tailwind.svg",
      "/asteroids/figma.svg",
      "/asteroids/solidity.svg",
      "/asteroids/graphql.svg",
    ];

    for (let src of SRCs) {
      let image = new Image();
      image.src = src;
      // image.onload = function () {
      //   ctx.drawImage(image, -1000, -1000);
      // };
      asteroids.push(new Asteroid(ctx, image));
    }

    const render = () => {
      // Clear canvas each frame
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Update and draw ship
      if (keys["w"]) {
        setState(State.play);
        ship.move();
      }
      if (keys["a"]) ship.turnLeft();
      if (keys["d"]) ship.turnRight();
      ship.update();
      ship.draw(keys["w"]);

      // Update and draw asteroids
      for (let asteroid of asteroids) {
        asteroid.update();
        asteroid.draw();
      }

      for (let bullet of bullets) {
        bullet.update();
        bullet.draw();
      }

      requestAnimationFrame(render);
    };
    render();
  }, []);

  const [leaderboard, setLeaderboard] = useState([]);

  const optimismProvider = new ethers.providers.JsonRpcProvider(
    "https://optimism-mainnet.infura.io/v3/df242983004b4def9344238f6589c187"
  );

  const mainnetProvider = new ethers.providers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/df242983004b4def9344238f6589c187"
  );

  const ABI = [
    "function getLeaderboard() public view returns (address[10], uint256[10], uint256[10])",
  ];

  const address = "0x8bDC49Dc956c0c0C3B6f29B9374d2fbb3D3BFeDe";
  const contract = new ethers.Contract(address, ABI, optimismProvider);

  async function getLeaderboard() {
    const data = await contract.getLeaderboard();
    let formattedLeaderboard = [];
    for (let i = 0; i < (await data[0].length); i++) {
      formattedLeaderboard.push({
        player: data[0][i].toString(),
        score: data[1][i].toString(),
        timestamp: data[2][i].toString(),
      });
    }
    setLeaderboard(formattedLeaderboard);
    return formattedLeaderboard;
  }

  async function reverseResolvePlayers(formattedLeaderboard) {
    let temp = formattedLeaderboard;
    for (let i = 0; i < formattedLeaderboard.length; i++) {
      let ens = await mainnetProvider.lookupAddress(temp[i].player);
      if (ens) temp[i].player = ens;
    }
    setLeaderboard([...temp]);
  }

  useEffect(() => {
    getLeaderboard().then((formattedLeaderboard) =>
      reverseResolvePlayers(formattedLeaderboard)
    );
  }, []);

  return (
    <section>
      <h2>Skills</h2>
      <p>The languages, frameworks, and tools I design and build with</p>
      <span id="controls">
        [w] <span className="control">move</span>
        <br />
        [a] & [d] <span className="control">turn</span>
        <br />
        [space] <span className="control">shoot</span>
      </span>
      <div id="round-data">
        <span id="score">Score: 0</span>
        <div id="lives">
          <img src="/ship.svg" />
          <img src="/ship.svg" />
          <img src="/ship.svg" />
        </div>
      </div>
      <div id="highscores">
        <span id="highscore-title">Highscores</span>
        {leaderboard.length > 0 && (
          <ol>
            {leaderboard.map(
              (highscore, index) =>
                index < 3 && (
                  <li key={index}>
                    {highscore.player.includes("0x")
                      ? highscore.player.substring(0, 7)
                      : highscore.player}
                    : {highscore.score}
                  </li>
                )
            )}
          </ol>
        )}
      </div>

      <canvas ref={canvas}></canvas>
      <style jsx>{`
        #highscore-title {
          font-family: PressStartP2;
          text-align: right;
        }

        ol {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        ol > li {
          font-family: PressStartP2;
          text-align: right;
          color: #a9a9a9;
          list-style-type: none;
        }

        #highscores {
          position: absolute;
          right: 80px;
          bottom: 32px;
          display: flex;
          flex-direction: column;
          opacity: ${state === State.play ? "1" : "0"};
          transition: opacity 0.5s;
          gap: 8px;
        }
        #round-data {
          position: absolute;
          left: 80px;
          bottom: 44px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          opacity: ${state === State.play ? "1" : "0"};
          transition: opacity 0.5s;
        }

        #lives {
          display: flex;
          gap: 8px;
        }

        #lives > img {
          width: 32px;
        }

        #score {
          font-family: PressStartP2;
          text-align: left;
        }
        #controls {
          position: absolute;
          left: 80px;
          bottom: 32px;
          font-family: PressStartP2;
          text-align: left;
          line-height: 2rem;
          opacity: ${state === State.start ? "1" : "0"};
          transition: opacity 0.5s;
        }

        .control {
          font-family: PressStartP2;
          color: #a9a9a9;
        }
        #space {
          position: absolute;
          bottom: 75px;
          cursor: pointer;
          z-index: 1;
        }

        h2 {
          font-family: PressStartP2;
          font-size: 2.5rem;
        }
        p {
          font-family: PressStartP2;
          font-size: 1rem;
          max-width: 80vw;
        }

        canvas {
          width: 100%;
          height: 100%;

          position: absolute;
        }

        @media only screen and (max-width: 1000px) {
          h2 {
            font-size: 2.25rem;
          }

          p {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}
