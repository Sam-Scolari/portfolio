export default function ProjectCard({ img, children }) {
  return (
    <li>
      <img src={img} />
      <h3>{children}</h3>
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
          border-radius: 16px;
        }

        h3:hover {
          text-decoration: underline;
        }
      `}</style>
    </li>
  );
}
