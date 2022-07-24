export type Project = {
    id: string;
    name: string;
    image: string;
    description: string;
    links: {
      caseStudy: string;
      github: string;
      figma: string; 
    }
  }
  
  export type User = {
    address: string;
  }
  
  export type Score = {
    user: User;
    score: number;
    timestamp: string;
  }
  
  export type Message = {
    user: User;
    message: string;
    emoji: string;
    timestamp: string;
  }
  