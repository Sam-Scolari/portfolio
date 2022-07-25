import { useEffect, useRef, useState } from "react";
import { Asteroid } from "./asteroids";
import { Bullet } from "./bullet";
import { Ship } from "./ship";
import { ethers } from "ethers";

export default function MySkillsDesktop() {
  const canvas = useRef<any | undefined>();

  const [hideControls, setHideControls] = useState(false);

  let keys = [];

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

    let asteroidsLoaded = 0;
    let shipLoaded = 0;

    let shipImage = new Image();
    shipImage.src = "/ship.svg";
    shipImage.onload = function () {
      ctx.drawImage(shipImage, 0, 0);
      shipLoaded += 1;
    };

    let shipFireImage = new Image();
    shipFireImage.src = "/shipFire.svg";
    shipFireImage.onload = function () {
      ctx.drawImage(shipFireImage, 0, 0);
      shipLoaded += 1;
    };

    let ship = new Ship(ctx, canvas);

    let next = new Image();
    next.src = "/asteroids/next.svg";
    next.onload = function () {
      ctx.drawImage(next, 0, 0);
      asteroidsLoaded += 1;
    };

    let react = new Image();
    react.src = "/asteroids/react.svg";
    react.onload = function () {
      ctx.drawImage(react, 0, 0);
      asteroidsLoaded += 1;
    };

    let typescript = new Image();
    typescript.src = "/asteroids/typescript.svg";
    typescript.onload = function () {
      ctx.drawImage(typescript, 0, 0);
      asteroidsLoaded += 1;
    };

    let javascript = new Image();
    javascript.src = "/asteroids/javascript.svg";
    javascript.onload = function () {
      ctx.drawImage(javascript, 0, 0);
      asteroidsLoaded += 1;
    };

    let html = new Image();
    html.src = "/asteroids/html.svg";
    html.onload = function () {
      ctx.drawImage(html, 0, 0);
      asteroidsLoaded += 1;
    };

    let css = new Image();
    css.src = "/asteroids/css.svg";
    css.onload = function () {
      ctx.drawImage(css, 0, 0);
      asteroidsLoaded += 1;
    };

    let figma = new Image();
    figma.src = "/asteroids/figma.svg";
    figma.onload = function () {
      ctx.drawImage(figma, 0, 0);
      asteroidsLoaded += 1;
    };

    let solidity = new Image();
    solidity.src = "/asteroids/solidity.svg";
    solidity.onload = function () {
      ctx.drawImage(solidity, 0, 0);
      asteroidsLoaded += 1;
    };

    let graphql = new Image();
    graphql.src = "/asteroids/graphql.svg";
    graphql.onload = function () {
      ctx.drawImage(graphql, 0, 0);
      asteroidsLoaded += 1;
    };

    let tailwind = new Image();
    tailwind.src = "/asteroids/tailwind.svg";
    tailwind.onload = function () {
      ctx.drawImage(tailwind, 0, 0);
      asteroidsLoaded += 1;
    };

    let astroidAssets = [
      next,
      react,
      typescript,
      javascript,
      html,
      css,
      figma,
      solidity,
      graphql,
      tailwind,
    ];

    let asteroids = [];
    for (let i = 0; i < astroidAssets.length; i++) {
      asteroids.push(new Asteroid(canvas));
    }

    let bullets = [];

    // Key press listeners
    document.body.addEventListener("keydown", (e) => (keys[e.key] = true));
    document.body.addEventListener("keyup", (e) => {
      if (!hideControls) setHideControls(true);
      keys[e.key] = false;
      if (e.key === " ") bullets.push(new Bullet(ship));
    });

    // Update width and height on window resize
    window.addEventListener("resize", resize);

    const render = () => {
      // Clear canvas each frame
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

      // Render ship
      if (shipLoaded >= 2) {
        ship.update(canvas.current, ctx, keys, shipImage, shipFireImage);
      }

      // Render astroids
      if (asteroidsLoaded >= astroidAssets.length) {
        asteroids.forEach((asteroid, index) => {
          asteroid.draw(ctx, astroidAssets[index]);
          asteroid.update(canvas.current, astroidAssets[index]);
        });
      }

      // Render bullets
      bullets.forEach((bullet) => {
        bullet.draw(ctx);
        bullet.update();
      });

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
    console.log(temp);
    for (let i = 0; i < formattedLeaderboard.length; i++) {
      console.log(temp[i].player);
      let ens = await mainnetProvider.lookupAddress(temp[i].player);
      if (ens) temp[i].player = ens;
      console.log(temp[i].player);
    }
    setLeaderboard([...temp]);
    console.log(leaderboard);
  }

  useEffect(() => {
    getLeaderboard().then((formattedLeaderboard) =>
      reverseResolvePlayers(formattedLeaderboard)
    );
  }, []);

  // useEffect(() => {
  //   console.log(leaderboard);
  // }, [leaderboard]);

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
          opacity: ${hideControls ? "1" : "0"};
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
          opacity: ${hideControls ? "1" : "0"};
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
          opacity: ${hideControls ? "0" : "1"};
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
        }

        canvas {
          width: 100%;
          height: 100%;

          position: absolute;
        }
      `}</style>
    </section>
  );
}
