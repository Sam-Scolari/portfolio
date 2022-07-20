import { useState } from "react";
import ProjectCard from "./ProjectCard";

export default function MyWork() {
  return (
    <section>
      <div id="content">
        <div id="heading">
          <h2>My Work</h2>
          <p>Check out some of my professional work</p>
        </div>
        <ul>
          <ProjectCard img="portfolio.png">Portfolio</ProjectCard>
          <ProjectCard img="web3assets.png">Web3 Assets</ProjectCard>
          <ProjectCard img="velodrome.png">Velodrome</ProjectCard>
          <ProjectCard img="pocket.png">Pocket</ProjectCard>
          <ProjectCard img="portfolio.png">Portfolio</ProjectCard>
        </ul>
      </div>
      <style jsx>{`
        #content {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          left: 80px;
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
        }
      `}</style>
    </section>
  );
}
