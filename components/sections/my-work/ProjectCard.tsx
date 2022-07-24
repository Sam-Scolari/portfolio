export default function ProjectCard({
  index,
  setCurrentProject,
  setShowProject,
  project,
}) {
  return (
    <li
      onClick={() => {
        setCurrentProject(index);
        setShowProject(true);
      }}
    >
      <img src={project.image} />
      <h3>{project.name}</h3>
      <style jsx>{`
        li {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.5s;
        }

        li:hover {
          transform: scale(1.15);
        }

        img {
          width: 300px;
          height: 200px;
          border-radius: 16px;
        }

        h3:hover {
          text-decoration: underline;
        }
      `}</style>
    </li>
  );
}
