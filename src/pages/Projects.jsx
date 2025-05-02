import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProjectsContainer = styled.div`
  padding: 2rem;
`;

const TerminalCommand = styled.div`
  margin-bottom: 1rem;
  
  &::before {
    content: '> ';
    color: #00ff00;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProjectCard = styled(motion.div)`
  border: var(--terminal-border);
  border-radius: 5px;
  padding: 1.5rem;
  background: rgba(0, 255, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.2);
  }
`;

const ProjectItem = styled.div`
  margin-bottom: 2rem;
  border-left: 2px solid #00ff00;
  padding-left: 1rem;
`;

const ProjectTitle = styled.h3`
  color: #00ff00;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  margin-bottom: 0.5rem;
  line-height: 1.6;
`;

const TechStack = styled.div`
  color: #00ff00;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
`;

const TechTag = styled.span`
  background: rgba(0, 255, 0, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-size: 0.9rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ProjectLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const projects = [
  {
    title: "AI-Powered Code Review Assistant",
    description: "A machine learning-based tool that helps developers review code more efficiently by suggesting improvements and detecting potential issues.",
    tech: ["Python", "TensorFlow", "React", "Node.js"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    title: "Real-time Collaboration Platform",
    description: "A web-based platform that enables developers to collaborate on code in real-time with features like live editing and chat.",
    tech: ["WebSocket", "React", "Node.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    title: "Automated Testing Framework",
    description: "A comprehensive testing framework that automates the testing process for web applications with detailed reporting.",
    tech: ["JavaScript", "Selenium", "Jest", "Docker"],
    github: "https://github.com",
    demo: "https://demo.com"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

function Projects() {
  return (
    <ProjectsContainer>
      <TerminalCommand>ls projects/</TerminalCommand>
      
      <ProjectItem>
        <ProjectTitle>Plastic Pallets e-commerce platform</ProjectTitle>
        <ProjectDescription>
          Developed an e-commerce platform using microservices architecture.
        </ProjectDescription>
        <TechStack>Tech: NestJS, NextJS, MongoDB</TechStack>
      </ProjectItem>

      <ProjectItem>
        <ProjectTitle>Help Desk Software Application</ProjectTitle>
        <ProjectDescription>
          Created a help desk software application enhancing customer service.
        </ProjectDescription>
        <TechStack>Tech: MERN stack</TechStack>
      </ProjectItem>

      <ProjectItem>
        <ProjectTitle>BookStore Web Application</ProjectTitle>
        <ProjectDescription>
          Built a BookStore web app hosted on AWS, utilizing various AWS services.
        </ProjectDescription>
        <TechStack>Tech: AWS</TechStack>
      </ProjectItem>

      <ProjectItem>
        <ProjectTitle>Mobile E-commerce App (Freelancing)</ProjectTitle>
        <ProjectDescription>
          Designed and deployed cross-platform mobile app using Flutter and Firebase for phone sales.
        </ProjectDescription>
        <TechStack>Tech: Flutter, Firebase</TechStack>
      </ProjectItem>

      <ProjectItem>
        <ProjectTitle>Car Showroom</ProjectTitle>
        <ProjectDescription>
          Designed a car showroom for selling cars with MVC architecture.
        </ProjectDescription>
        <TechStack>Tech: Laravel, PHP</TechStack>
      </ProjectItem>

      <ProjectItem>
        <ProjectTitle>Metro System</ProjectTitle>
        <ProjectDescription>
          Implemented a metro system for booking tickets and calculating prices.
        </ProjectDescription>
        <TechStack>Tech: NodeJS, PostgreSQL</TechStack>
      </ProjectItem>

      <ProjectItem>
        <ProjectTitle>Games with GUI</ProjectTitle>
        <ProjectDescription>
          Created two games with graphical user interfaces.
        </ProjectDescription>
        <TechStack>Tech: Java, C++</TechStack>
      </ProjectItem>

      <ProjectItem>
        <ProjectTitle>Parking Finder Prototype</ProjectTitle>
        <ProjectDescription>
          Developed a Parking Finder software prototype with mock user interface and requirements specifications.
        </ProjectDescription>
        <TechStack>Tech: UI/UX, Requirements Engineering</TechStack>
      </ProjectItem>

      <ProjectItem>
        <ProjectTitle>Company Database Project</ProjectTitle>
        <ProjectDescription>
          Designed a company database project using SQL with a user interface.
        </ProjectDescription>
        <TechStack>Tech: SQL, UI</TechStack>
      </ProjectItem>

      <ProjectItem>
        <ProjectTitle>Version Control & Project Management</ProjectTitle>
        <ProjectDescription>
          Used GitHub for version control, efficient collaboration, and project management.
        </ProjectDescription>
        <TechStack>Tech: GitHub</TechStack>
      </ProjectItem>
    </ProjectsContainer>
  );
}

export default Projects; 