export default function ProjectLinkButton({ type, link }) {
  return (
    type !== "__typename" && (
      <>
        {
          {
            caseStudy: (
              <a href={link} target="_blank" rel="noreferrer">
                <img src="/mirror.svg" />
                <button>Case Study</button>
              </a>
            ),
            github: (
              <a href={link} target="_blank" rel="noreferrer">
                <img src="/github.svg" />
                <button>GitHub</button>
              </a>
            ),
            figma: (
              <a href={link} target="_blank" rel="noreferrer">
                <img src="/figma.svg" />
                <button>Figma</button>
              </a>
            ),
          }[type]
        }

        <style jsx>{`
          a {
            display: flex;
            align-items: center;
            border: 2px solid;
            border-color: #e5e5e5;
            border-radius: 8px;
            padding-top: 8px;
            padding-bottom: 8px;
            padding-left: 12px;
            padding-right: 12px;
            width: min-content;
            background-color: white;
            cursor: pointer;
            transition: transform 0.5s;
          }

          a:hover {
            transform: scale(1.25);
          }
          img {
            height: 30px;
          }
          button {
            white-space: nowrap;
            margin-left: 8px;
            border: none;
            background-color: transparent;
            color: grey;
            font-weight: 500;
            font-size: 16px;
            cursor: pointer;
          }
        `}</style>
      </>
    )
  );
}
