export default function BasicButton({ children, ...props }) {
  return (
    <>
      <button {...props}>{children}</button>
      <style jsx>{`
        button {
          background-color: black;
          color: white;
          border-radius: 12px;
          width: min-content;
          font-weight: 500;
          white-space: nowrap;
          padding-top: 12px;
          padding-bottom: 12px;
          padding-left: 36px;
          padding-right: 36px;
          font-size: 2rem;
          cursor: pointer;
          outline: none;
          border: none;
          user-select: none;
          transition: transform 0.5s;
        }

        button:hover {
          transform: scale(1.25);
        }

        @media only screen and (max-width: 650px) {
          button {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
