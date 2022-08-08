import { useEffect, useRef, useState } from "react";
import { Asteroid, Size } from "./asteroid";
import { Bullet } from "./bullet";
import { Ship } from "./ship";
import { ethers } from "ethers";
import { BoxCollision } from "./colliders";
import useGameLoop from "../../../hooks/useGameLoop";
import { getEventListeners } from "events";

export enum State {
  start,
  play,
  end,
}

export default function Asteroids() {
  const canvas = useRef<any | undefined>();

  // Game assets
  const SRCs = [
    "/asteroids/next.png",
    "/asteroids/react.png",
    "/asteroids/typescript.png",
    "/asteroids/javascript.png",
    "/asteroids/html.png",
    "/asteroids/css.png",
    "/asteroids/tailwind.png",
    "/asteroids/figma.png",
    "/asteroids/solidity.png",
    "/asteroids/graphql.png",
  ];

  // Game data
  const [state, setState] = useState(State.start);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [fps, setFps] = useState(0);

  // Game Objects
  const [initialized, setInitialized] = useState(false);
  const [asteroids, setAsteroids] = useState([]);
  const [ship, setShip] = useState(null);
  const [bullets, setBullets] = useState([]);

  // Controls
  const [keys, setKeys] = useState([]);
  const [attached, setAttached] = useState(false);

  // Resize canvas with window
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    function resize() {
      if (ctx.canvas) {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
      }
    }
    resize();
    window.addEventListener("resize", resize);
  }, []);

  // Initialize Game Objects
  useEffect(() => {
    if (!initialized) {
      const ctx = canvas.current.getContext("2d");

      // Ship
      setShip(new Ship(ctx));

      // Asteroids
      for (let src of SRCs) {
        let image = new Image();
        image.src = src;
        // image.onload = function () {
        //   ctx.drawImage(image, -1000, -1000);
        // };
        asteroids.push(
          new Asteroid(
            ctx,
            Math.floor(Math.random() * ctx.canvas.width),
            Math.floor(Math.random() * ctx.canvas.height),
            image,
            Size.large
          )
        );
      }
    }

    setInitialized(true);
  }, []);

  // Attach control event listeners
  function keyDown(e) {
    keys[e.key] = true;
    if (state === State.start && e.key === "w") {
      setState(State.play);
    }
  }

  function keyUp(e) {
    const ctx = canvas.current.getContext("2d");

    keys[e.key] = false;
    if (e.key === " ") {
      setBullets((bullets) => [
        ...bullets,
        new Bullet(ctx, ship.x, ship.y, ship.image.height, ship.direction),
      ]);
    }

    setAttached(true);
  }

  useEffect(() => {
    if (!attached) {
      // On key down
      document.body.addEventListener("keydown", keyDown);

      // Wait until ship is initialized to attach listener
      if (ship) {
        // On key up
        document.body.addEventListener("keyup", keyUp);
      }
    }
  }, [ship]);

  // Handle collisions
  function handleCollisions() {
    // Ship -> Asteroid
    if (ship) {
      for (let asteroid of asteroids) {
        if (!ship.blinking && BoxCollision(ship.collider, asteroid.collider)) {
          ship.break();
          setLives(lives - 1);
        }
      }
    }

    // Bullet -> Asteroid
    for (let i = 0; i < bullets.length; i++) {
      for (let j = 0; j < asteroids.length; j++) {
        if (
          bullets[i]?.collider &&
          asteroids[j]?.collider &&
          BoxCollision(bullets[i].collider, asteroids[j].collider)
        ) {
          // Destroy bullet
          delete bullets[i];
          setBullets((bullets) => [
            ...bullets.slice(0, i),
            ...bullets.slice(i + 1),
          ]);

          // Destroy asteroid
          asteroids[j].break(asteroids);
          delete asteroids[j];
          setAsteroids((asteroids) => [
            ...asteroids.slice(0, j),
            ...asteroids.slice(j + 1),
          ]);

          setScore(score + 1);
        }
      }
    }
  }

  // Render game objects
  function renderGameObjects(ctx) {
    // Ship
    if (ship) {
      if (keys["w"]) ship.move();
      if (keys["a"]) ship.turnLeft();
      if (keys["d"]) ship.turnRight();

      // Render ship
      ship.update();
      ship.draw(keys["w"]);
    }

    // Asteroids
    for (let asteroid of asteroids) {
      if (asteroid) {
        // Render asteroid
        asteroid.update();
        asteroid.draw();
      }
    }

    // Bullets
    for (let i = 0; i < bullets.length; i++) {
      if (bullets[i]) {
        // Render bullet
        bullets[i].update();
        bullets[i].draw();

        // If bullet goes off the screen
        if (
          bullets[i].x > ctx.canvas.width + bullets[i].width ||
          bullets[i].x < -bullets[i].width ||
          bullets[i].y > ctx.canvas.height + bullets[i].height ||
          bullets[i].y < -bullets[i].height
        ) {
          // Destroy bullet
          delete bullets[i];
          setBullets((bullets) => [
            ...bullets.slice(0, i),
            ...bullets.slice(i + 1),
          ]);
        }
      }
    }
  }

  // Main game loop
  useGameLoop(
    (time, fps) => {
      // Canvas
      const ctx = canvas.current.getContext("2d");

      // If the game isn't over
      if (lives > 0 && state !== State.end) {
        setFps(fps);

        // Clear canvas each frame
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Handle collisions
        handleCollisions();

        // Draw and update game objects
        renderGameObjects(ctx);
      }

      // End the game
      else {
        // Set the game state to end
        setState(State.end);

        // Detach event listeners
        document.body.removeEventListener("keydown", keyDown);
        document.body.removeEventListener("keyup", keyUp);

        // Clear canvas each frame
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }
    },
    [state, score, lives, asteroids, ship, bullets]
  );

  const [leaderboard, setLeaderboard] = useState([]);

  async function getLeaderboard(contract) {
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

  async function reverseResolvePlayers(mainnetProvider, formattedLeaderboard) {
    let temp = formattedLeaderboard;
    for (let i = 0; i < formattedLeaderboard.length; i++) {
      let ens = await mainnetProvider.lookupAddress(temp[i].player);
      if (ens) temp[i].player = ens;
    }
    setLeaderboard([...temp]);
  }

  useEffect(() => {
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

    getLeaderboard(contract).then((formattedLeaderboard) =>
      reverseResolvePlayers(mainnetProvider, formattedLeaderboard)
    );
  }, []);

  return (
    <>
      {lives > 0 && state !== State.end ? (
        <>
          <h2>Skills</h2>
          <p>The languages, frameworks, and tools I design and build with</p>
          <span>{fps}</span>
        </>
      ) : (
        <div id="game-over">
          <h2>Game Over</h2>
          <p>Congrats, you got a new highscore!</p>
          <span id="end-score">{score}</span>
          <span id="highscore-title">Highscores</span>
          <ol>
            {leaderboard.map((highscore, index) => (
              <li key={index}>
                {highscore.player.includes("0x")
                  ? highscore.player.substring(0, 7)
                  : highscore.player}
                : {highscore.score}
              </li>
            ))}
          </ol>
        </div>
      )}
      <span id="controls">
        [w] <span className="control">move</span>
        <br />
        [a] {"&"} [d] <span className="control">turn</span>
        <br />
        [space] <span className="control">shoot</span>
      </span>
      <div id="round-data">
        <span id="score">Score: {score}</span>
        <div id="lives">
          {lives > 0 &&
            [...Array(lives)].map((index) => (
              <img key={index} src="/ship.svg" />
            ))}
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
      <canvas ref={canvas} />
      <style jsx>{`
        #game-over {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        #end-score {
          color: #5ee96c;
          font-size: 3rem;
          font-family: PressStartP2;
          margin-top: 16px;
          margin-bottom: 16px;
        }
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
    </>
  );
}
