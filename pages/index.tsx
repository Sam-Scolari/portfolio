import type { NextPage } from "next";
import { useContext, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { useAccount } from "wagmi";
import StartPage from "../components/sections/start";
import { ThemeContext } from "../pages/_app";
import EndPage from "../components/sections/end";
import MyWork from "../components/sections/my-work";
import MySkillsDesktop from "../components/sections/skills/asteroids";
import { useMediaQuery } from "usehooks-ts";
import MySkillsMobile from "../components/sections/skills/tetris";
import useLayout from "../components/hooks/useLayout";
import getConfig from "next/config";
import {
  ApolloClient,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { Project } from "../interfaces";

const Home: NextPage = (props: { projects: string }) => {
  const { data } = useAccount();

  const { isDark, setIsDark } = useContext(ThemeContext);

  const [wasPressed, setWasPressed] = useState(false);
  const [wasUsed, setWasUsed] = useState(true);

  const { desktop } = useLayout();

  // Confetti
  useEffect(() => {
    if (wasUsed && wasPressed && data?.address) {
      var end = Date.now() + 15 * 100;

      const colors = ["#8247e5", "#e52268", "#ff00e5"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
      setWasUsed(false);
    }
  }, [data, wasPressed, wasUsed]);

  return (
    <main>
      {/* <div style={{position: "fixed", top: 0, left: 0,}}>}</div> */}
      <StartPage setWasPressed={setWasPressed} />
      {desktop ? <MySkillsDesktop /> : <MySkillsMobile />}
      <MyWork projects={props.projects} />
      <EndPage />
      <style jsx>{`
        main {
          width: 100vw;
          height: 100vh;
          scroll-snap-type: y mandatory;
          overflow-x: hidden;
          overflow-y: ${/*data?.address*/ true ? "scroll" : "hidden"};
          text-align: center;
        }

        main::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      `}</style>
    </main>
  );
};

export default Home;

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const { publicRuntimeConfig } = getConfig();

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: publicRuntimeConfig.API,
    cache: new InMemoryCache(),
  });

  const query = gql`
    query Query {
      getProjects {
        id
        name
        image
        description
        links {
          figma
          github
          caseStudy
        }
      }
    }
  `;

  const { data } = await client.query({ query: query });

  const projects = data.getProjects as Project[];

  return data.getProjects
    ? {
        props: { projects: projects },
      }
    : { notFound: true };
};
