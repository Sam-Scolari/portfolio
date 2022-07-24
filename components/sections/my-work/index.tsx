import { useEffect, useState } from "react";
import ProjectLinkButton from "../../buttons/ProjectLinkButton";
import ProjectCard from "./ProjectCard";
import ProjectView from "./ProjectView";

export default function MyWork({ projects }) {
  const [showProject, setShowProject] = useState(false);

  const [currentProject, setCurrentProject] = useState(0);

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
      />
      <style jsx>{`
        #my-work {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          left: 80px;
          pointer-events: ${showProject ? "none" : "auto"};
          opacity: ${showProject ? "0" : "1"};
          transition: opacity 0.5s;
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
