import { Project } from "../../../interfaces"

const projects: Project[] = [
  {
    id: "portfolio",
    name: "Portfolio",
    image: "/projects/portfolio.png",
    description: "",
    links: {
      figma: "https://www.figma.com/file/19Cd4rrFEK9NgqPPU6APEP/samscolari.me?node-id=0%3A1",
      github: "https://github.com/Sam-Scolari/portfolio",
      caseStudy: null,
    },
  },
  {
    id: "redesign-challenge",
    name: "Redesign Challenge",
    image: "/projects/redesign-challenge.png",
    description: "",
    links: {
      figma: "https://www.figma.com/file/6QJpNHO0okfredjd6XoOdd/Redesign-Challenge?node-id=0%3A1",
      github: null,
      caseStudy: null,
    },
  },
  {
    id: "web3assets",
    name: "Web3 Assets",
    image: "/projects/web3assets.png",
    description: "",
    links: {
      figma: "https://www.figma.com/file/55mRZluubESkaLNJjfGnQS/Web3-Assets?node-id=209%3A5",
      github: null,
      caseStudy: null,
    },
  },
  {
    id: "velodrome-fyi",
    name: "Velodrome.fyi",
    image: "/projects/velodrome-fyi.png",
    description: "",
    links: {
      figma: "https://www.figma.com/file/IFTo0E5dS2Rb7OcxqpKzoq/Velodrome.fyi?node-id=0%3A1",
      github: null,
      caseStudy: null,
    },
  },
  {
    id: "backbone-react-hooks",
    name: "Backbone React Hooks",
    image: "/projects/backbone-react-hooks.png",
    description: "",
    links: {
      figma: null,
      github: null,
      caseStudy: null,
    },
  },
]

export default function handler(req, res) {
  res.status(200).json(projects)
}