import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

export default function MyWork() {
  const [showProject, setShowProject] = useState(false);

  useEffect(() => {
    console.log(showProject);
  }, [showProject]);
  return (
    <section>
      <div id="my-work">
        <div id="heading">
          <h2>My Work</h2>
          <p>Check out some of my professional work</p>
        </div>
        <ul>
          <ProjectCard
            onClick={() => {
              setShowProject(true);
            }}
            img="portfolio.png"
          >
            Portfolio
          </ProjectCard>
          <ProjectCard
            onClick={() => {
              setShowProject(true);
            }}
            img="web3assets.png"
          >
            Web3 Assets
          </ProjectCard>
          <ProjectCard
            onClick={() => {
              setShowProject(true);
            }}
            img="velodrome.png"
          >
            Velodrome
          </ProjectCard>
          <ProjectCard
            onClick={() => {
              setShowProject(true);
            }}
            img="pocket.png"
          >
            Pocket
          </ProjectCard>
          <ProjectCard
            onClick={() => {
              setShowProject(true);
            }}
            img="portfolio.png"
          >
            Portfolio
          </ProjectCard>
        </ul>
      </div>
      <div id="project-view">
        <div>
          <h3>Project Name</h3>
          <span>samscolari.me</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div>
          <img src="/portfolio.png" width="300" alt="" />
        </div>
      </div>
      <style jsx>{`
        #project-view {
          position: absolute;
          display: flex;
          pointer-events: ${showProject ? "auto" : "none"};
        }

        #my-work {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          left: 80px;
          pointer-events: ${showProject ? "none" : "auto"};
        }

        #heading {
          text-align: left;
        }

        p {
          font-size: 1.25rem;
          font-weight: 500;
        }

        ul {
          list-style: none;
          margin-top: 64px;
          display: flex;
          gap: 64px;
          margin-left: -40px;
          opacity: ${showProject ? "0" : "1"};
          transition: opacity 1s;
        }
      `}</style>
    </section>
  );
}
