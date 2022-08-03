import { useEffect, useRef, useState } from "react";
import ProjectLinkButton from "../../buttons/ProjectLinkButton";
import useLayout from "../../hooks/useLayout";
import ProjectCard from "./ProjectCard";
import ProjectView from "./ProjectView";

export default function Projects({ projects }) {
  const [showProject, setShowProject] = useState(false);

  const [currentProject, setCurrentProject] = useState(projects.length / 2 - 1);

  const { desktop, animate } = useLayout();

  // useEffect(() => {
  //   console.log(showProject);
  // }, [showProject]);

  const list = useRef<any>();

  useEffect(() => {
    // console.log(list.current.scrollWidth);
    list.current.scrollTo(
      (list.current.scrollWidth - window.innerWidth) / 2,
      0
    );
  }, []);
  return (
    <section>
      <h2>Projects</h2>
      <p>Check out some of my completed work</p>
      <div id="wrapper">
        <div id="mask-top"></div>
        <ul ref={list}>
          {projects.map((project, index) => (
            <li key={index}>
              <img className="project-image" src={project.image} alt="" />
            </li>
          ))}
        </ul>
        <div id="mask-bottom"></div>
      </div>
      <div id="controls">
        <img
          src="/arrow-left-box.svg"
          style={{
            cursor: currentProject > 0 ? "pointer" : "auto",
            opacity: currentProject > 0 ? 1 : 0.15,
          }}
          onClick={() => {
            if (currentProject > 0) setCurrentProject(currentProject - 1);
            list.current.scrollBy({ left: -1, behavior: "smooth" });
          }}
        />
        <span>{projects[currentProject].name}</span>
        <img
          src="/arrow-right-box.svg"
          style={{
            cursor: currentProject < projects.length - 1 ? "pointer" : "auto",
            opacity: currentProject < projects.length - 1 ? 1 : 0.15,
          }}
          onClick={() => {
            if (currentProject < projects.length - 1)
              setCurrentProject(currentProject + 1);
            list.current.scrollBy({ left: 1, behavior: "smooth" });
          }}
        />
      </div>

      {/* <div id="my-work">s
        <ul>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              index={index}
              setCurrentProject={setCurrentProject}
              setShowProject={setShowProject}
              project={project}
            />
          ))}
        </ul> 
      </div>
      <ProjectView
        currentProject={currentProject}
        projects={projects}
        showProject={showProject}
        setShowProject={setShowProject}
      /> */}
      <style jsx>{`
        section {
          max-height: 100vh;
        }
        #controls {
          display: flex;
          align-items: center;
          margin-top: 32px;
        }

        #controls > span {
          font-weight: bold;
          font-size: 1.5rem;
          width: 280px;
        }

        #controls > img {
          width: 32px;
          height: 32px;
        }
        h2 {
          font-size: 3.5rem;
          margin-bottom: 16px;
        }
        #wrapper {
          position: relative;
          margin-top: 32px;
        }

        ul {
          list-style: none;

          display: flex;
          align-items: center;
          gap: 64px;
          width: 100vw;
          /*height: ${desktop ? 300 : 250}px;*/

          overflow: hidden;
          scroll-snap-type: x mandatory;
        }

        #mask-top {
          display: ${desktop ? "flex" : "none"};
          position: absolute;
          background-size: 100vw 100vh;
          background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'  stroke-width='1' stroke='hsla(0, 0%, 96%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");
          background-repeat: no-repeat;
          width: 100vw;
          height: 80px;
          border-radius: 100%;
          top: -24px;
        }

        #mask-bottom {
          display: ${desktop ? "flex" : "none"};
          position: absolute;
          background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'  stroke-width='1' stroke='hsla(0, 0%, 96%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");

          background-color: white;
          width: 100vw;
          height: 80px;
          border-radius: 100%;
          bottom: -24px;
        }

        li:first-child {
          padding-left: 100vw;
        }

        li:last-child {
          padding-right: 100vw;
        }

        .project-image {
          object-fit: cover;
          width: ${desktop ? "400px" : "60vw"};

          height: ${desktop ? "325px" : "auto"};
          border-radius: ${desktop ? 0 : 16}px;
          scroll-snap-align: center;
          cursor: pointer;
        }

        ul::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      `}</style>
    </section>
  );
}
