import Greeting from "./Greeting";
import Connect from "./Connect";
import SocialIcon from "../../header/SocialIcon";
import useLayout from "../../hooks/useLayout";

export default function Landing({ setWasPressed }) {
  const { animate } = useLayout();
  return (
    <section>
      <div>
        <Greeting />
      </div>
      <div className="social-icons">
        <div>
          <SocialIcon
            href="https://rainbow.me/samscolari.eth"
            src="/rainbow.svg"
            alt="Rainbow Wallet"
          />
          <SocialIcon
            href="https://lenster.xyz/u/samscolari.lens"
            src="/lens.svg"
            alt="Lens Protocol"
          />
          <SocialIcon
            href="https://github.com/Sam-Scolari"
            src="/github.svg"
            alt="Github"
          />
          <SocialIcon
            href="https://twitter.com/SamScolari"
            src="/twitter.svg"
            alt="Twitter"
          />
        </div>
        <div id="bottom">
          <SocialIcon
            href="https://discordapp.com/users/174640628456620032/"
            src="/discord.svg"
            alt="Discord"
          />
          <SocialIcon
            href="https://www.linkedin.com/in/sam-scolari/"
            src="/linkedin.svg"
            alt="LinkedIn"
          />
        </div>
      </div>
      <Connect setWasPressed={setWasPressed} />
      <style jsx>{`
        .social-icons {
          display: none;
          margin-top: 64px;
        }

        @media only screen and (max-width: 850px) {
          .social-icons {
            display: flex;
          }

          .social-icons > div {
            display: flex;
          }
        }

        @media only screen and (max-width: 600px) {
          .social-icons {
            flex-direction: column;
            align-items: center;
          }

          #bottom {
            margin-top: 16px;
          }
        }
      `}</style>
    </section>
  );
}
