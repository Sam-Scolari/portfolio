export default function ScrollDown() {
  return (
    <div>
      <svg
        width="24"
        viewBox="0 0 71 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="3"
          width="65"
          height="94"
          rx="32.5"
          stroke="black"
          strokeWidth="6"
        />
        <rect
          id="scrollWheel"
          x="28"
          y="16"
          width="14"
          height="27"
          rx="7"
          fill="black"
        />
      </svg>
      <span
        style={{
          marginTop: 8,
          fontWeight: "bold",
          fontSize: "1.15rem",
          color: "black",
          transition: "color 0.5s",
        }}
      >
        Scroll Down
      </span>

      <style jsx>{`
        div {
          bottom: 80px;
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        #scrollWheel {
          animation-timing-function: ease-out;
          animation: slide 2.25s infinite;
        }

        @keyframes slide {
          0% {
            opacity: 0;
            y: 16;
          }
          35% {
            opacity: 1;
            y: 16;
          }

          100% {
            y: 56;
          }
        }
      `}</style>
    </div>
  );
}
