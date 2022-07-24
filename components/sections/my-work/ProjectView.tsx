import ProjectLinkButton from "../../buttons/ProjectLinkButton";

export default function ProjectView({
  currentProject,
  projects,
  showProject,
  setShowProject,
}) {
  return (
    <>
      <div id="project-view">
        <div>
          <div id="back-button" onClick={() => setShowProject(false)}>
            <img src="/arrow-left.svg" />
            <span>My Work</span>
          </div>

          <h3>{projects[currentProject].name}</h3>
          <p>{projects[currentProject].description}</p>
          <div id="links">
            {Object.keys(projects[currentProject].links).map((key, index) => (
              <ProjectLinkButton
                key={index}
                type={key}
                link={projects[currentProject].links[key]}
              />
            ))}
          </div>
        </div>
      </div>
      <div id="image">
        <img src={projects[currentProject].image} width="300" alt="" />
      </div>
      <style jsx>{`
        #back-button {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        h3 {
          font-size: 3rem;
        }

        p {
          max-width: 500px;
        }

        span {
          font-weight: 500;

          margin-left: 8px;
        }

        #project-view {
          position: absolute;
          width: 100%;
          display: flex;
          text-align: left;
          padding-left: 80px;
          justify-content: flex-start;
          pointer-events: ${showProject ? "auto" : "none"};
          opacity: ${showProject ? "1" : "0"};
          transition: opacity 0.5s;
        }

        #links {
          margin-top: 32px;
          display: inline-flex;
          gap: 24px;
        }

        #image {
          position: absolute;
          right: 80px;
          pointer-events: ${showProject ? "auto" : "none"};
          opacity: ${showProject ? "1" : "0"};
          transition: opacity 0.5s;
        }

        #image > img {
          border-radius: 16px;
          height: 60vh;
          width: auto;
        }
      `}</style>
    </>
  );
}
