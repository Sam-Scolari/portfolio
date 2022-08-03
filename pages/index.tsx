import type { NextPage } from "next";
import { useContext, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { useAccount } from "wagmi";
import Landing from "../components/sections/landing";
import { ThemeContext } from "../pages/_app";
import Thanks from "../components/sections/thanks";
import Projects from "../components/sections/projects";
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
import Skills from "../components/sections/skills";

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
      <Landing setWasPressed={setWasPressed} />

      <Skills />

      <Projects projects={props.projects} />

      <Thanks />

      <style jsx>{`
        main {
          width: 100vw;
          height: calc(var(--vh, 1vh) * 100);
          scroll-snap-type: y mandatory;
          overflow-x: hidden;
          overflow-y: ${data?.address ? "scroll" : "hidden"};
          text-align: center;
          background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'  stroke-width='1' stroke='hsla(0, 0%, 96%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");
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
