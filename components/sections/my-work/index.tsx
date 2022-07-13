import { useState } from "react";

export default function MyWork() {
  const [currentFrame, setCurrentFrame] = useState(0);

  return (
    <section>
      <div id="heading">
        <h2>My Work</h2>
        <p>Check out some of my professional work</p>

        {/* <ul>
          <li onClick={() => setCurrentFrame(0)}>NFT Cal</li>
          <li onClick={() => setCurrentFrame(1)}>Portfolio</li>
          <li onClick={() => setCurrentFrame(2)}>Web3 Assets</li>
        </ul> */}
      </div>

      {/* <div
        className="frame"
        style={{ display: currentFrame === 0 ? "flex" : "none" }}
      >
        <iframe src="https://nft-cal.vercel.app" />
      </div> */}
      {/* <div
        className="frame"
        style={{ display: currentFrame === 1 ? "flex" : "none" }}
      >
        <iframe src="https:/samscolari.me" />
      </div>
      <div
        className="frame"
        style={{ display: currentFrame === 2 ? "flex" : "none" }}
      >
        <iframe
          //   style="border: 1px solid rgba(0, 0, 0, 0.1);"

          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F55mRZluubESkaLNJjfGnQS%2FWeb3-Brand-Assets%3Fnode-id%3D0%253A1"
        />
      </div> */}

      <style jsx>{`
        #heading {
          position: absolute;
          text-align: left;
          left: 80px;
          z-index: 1;
        }

        p {
          font-size: 1.25rem;
          font-weight: 500;
        }

        .frame {
          position: absolute;
          display: flex;
          align-items: center;
          right: 0;
          height: 100%;
        }

        iframe {
          transform: scale(0.75) translateX(25%) !important;
          transform-origin: right;
          border: none;
          border-radius: 32px;
          box-shadow: rgba(60, 64, 67, 0.15) 0px 0px 40px 8px;
          margin-top: 100px; /* Header=60px, Page Margin=40px */
          height: 100vh;
          width: 100vw;
        }

        ul {
          list-style: none;
        }

        li {
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
