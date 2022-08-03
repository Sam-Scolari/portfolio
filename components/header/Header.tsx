import SocialIcon from "./SocialIcon";
import ProfilePicture from "./ProfilePicture";

export default function Header() {
  return (
    <header>
      <ProfilePicture />
      <nav>
        <div className="social-icons">
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
          <SocialIcon href="" src="/orb.png" alt="Orb" />
          <SocialIcon
            href="https://www.linkedin.com/in/sam-scolari/"
            src="/linkedin.svg"
            alt="LinkedIn"
          />
        </div>
      </nav>

      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: none;
          position: fixed;
          min-width: 100%;

          padding-top: 40px;
          padding-left: 80px;
          padding-right: 80px;
          z-index: 1;
        }

        nav {
          display: flex;
          align-items: center;
        }

        .social-icons {
          display: flex;
          align-items: center;
        }

        @media only screen and (max-width: 850px) {
          .social-icons {
            display: none;
          }
        }

        @media only screen and (max-width: 700px) {
          header {
            padding-left: 32px;
            padding-right: 32px;
          }
        }

        @media only screen and (max-width: 450px) {
          header {
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 30px;
          }
        }
      `}</style>
    </header>
  );
}
