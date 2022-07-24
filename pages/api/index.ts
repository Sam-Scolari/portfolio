import Cors from "micro-cors";
import { gql, ApolloServer } from "apollo-server-micro";
import { Message, Project, Score, User } from "../../interfaces";

export const config = {
  api: {
    bodyParser: false,
  },
};

const projects: Project[] = [
  {
    id: "portfolio",
    name: "Portfolio",
    image: "/portfolio.png",
    description: "",
    links: {
      figma: "https://www.figma.com/file/19Cd4rrFEK9NgqPPU6APEP/samscolari.me?node-id=0%3A1",
      github: "https://github.com/Sam-Scolari/portfolio",
      caseStudy: null,
    },
  },
  {
    id: "web3assets",
    name: "Web3 Assets",
    image: "/web3assets.png",
    description: "",
    links: {
      figma: "https://www.figma.com/file/55mRZluubESkaLNJjfGnQS/Web3-Assets?node-id=209%3A5",
      github: null,
      caseStudy: null,
    },
  },
]

const users: User[] = [
  {
    address: "sam"
  },
  {
    address:"rando",
  }
]

const scores: Score[] = [
  {
    user: users[0],
    score: 45,
    timestamp: "idk",
  },
  {
    user: users[1],
    score: 52,
    timestamp: "idk",
  },
]

const messages: Message[] = [
  {
    user: users[0],
    message: "heyoo",
    emoji: "👋",
    timestamp: "idk"
  },
  {
    user: users[1],
    message: "djklafhjkl",
    emoji: null,
    timestamp: "idk"
  },
]

const typeDefs = gql`
  type User {
    address: ID!
  }

  type Score {
    user: User!
    score: Int!
    timestamp: String!
  }

  type Message {
    user: User!
    message: String!
    emoji: String
    timestamp: String!
  }

  type ProjectLinks {
    figma: String
    github: String
    caseStudy: String
  }

  type Project {
    id: ID!
    name: String!
    image: String!
    description: String!
    links: ProjectLinks!
  }

  type Query {
    getHighscores: [Score] 
    getUser(id: ID!): User
    getMessages: [Message]
    getProjects: [Project]
  }
`;

const resolvers = {
  Query: {
    getHighscores: () => {
        let response = scores;
        response.sort((a, b) => {
            let aScore = a.score;
            let bScore = b.score;
  
            if (aScore < bScore) {
              return -1;
            }
            if (aScore > bScore) {
              return 1;
            }
            return 0;
          });
        
        return response.slice(0, 10);
    },
    getUser: (parent, args, context, info) => users.find((user) => user.address == args.id),
    getMessages: () => messages.slice(0, 5),
    getProjects: () => projects
  
},
};

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {},
  introspection: true,
  //   playground: true,
});

const serverStart = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await serverStart;

  await apolloServer.createHandler({ path: "/api" })(req, res);
});
