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
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProjectCard = styled(motion.div)`
  border: var(--terminal-border);
  border-radius: 5px;
  padding: 1.5rem;
  background: rgba(0, 255, 0, 0.05);
  box-shadow: 0 0 10px rgba(0,255,0,0.07);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.2);
    background: rgba(0,255,0,0.08);
  }
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

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #00ff00;
  color: #000;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0,255,0,0.08);
  transition: background 0.2s, color 0.2s, transform 0.2s;
  &:hover {
    background: #00cc00;
    color: #fff;
    transform: scale(1.05);
  }
`;

const projects = [
  {
    title: 'EcoPlastic Pallets',
    description: 'Developed an e-commerce platform for sustainable plastic pallets with microservices architecture and a modern, intuitive UI.',
    tech: 'NestJS, NextJS, MongoDB',
    demo: 'https://eco-pallets.vercel.app',
  },
  {
    title: 'ECS Help Desk Software Application',
    description: 'Created a help desk software application enhancing customer service using the MERN stack.',
    tech: 'MERN stack',
    demo: 'https://ecs-project-omega.vercel.app',
  },
  {
    title: 'Cairo Metro Ticketing System',
    description: 'Implemented a metro system for booking tickets and calculating prices with real-time updates and easy booking.',
    tech: 'NodeJS, PostgreSQL',
    demo: 'https://cairometrosystem.onrender.com',
  },
  {
    title: 'BookStore Web Application (AWS)',
    description: 'Built a BookStore web app hosted on AWS, utilizing various AWS services for high availability and scalability.',
    tech: 'AWS, DynamoDB, S3, Lambda, Docker',
    github: 'https://github.com/Yassa122/BookStoreApp-AWS',
  },
  {
    title: 'Mobile E-commerce App (Freelancing)',
    description: 'Designed and deployed a cross-platform mobile app using Flutter and Firebase for phone sales.',
    tech: 'Flutter, Firebase',
  },
  {
    title: 'Car Showroom',
    description: 'Designed a car showroom for selling cars with MVC architecture using Laravel and PHP.',
    tech: 'Laravel, PHP',
  },
  {
    title: 'Games with GUI',
    description: 'Created two games with graphical user interfaces using Java and C++.',
    tech: 'Java, C++',
  },
  {
    title: 'Parking Finder Prototype',
    description: 'Developed a Parking Finder software prototype with mock user interface and requirements specifications.',
    tech: 'UI/UX, Requirements Engineering',
  },
  {
    title: 'Company Database Project',
    description: 'Designed a company database project using SQL with a user interface.',
    tech: 'SQL, UI',
  },
  {
    title: 'Version Control & Project Management',
    description: 'Used GitHub for version control, efficient collaboration, and project management.',
    tech: 'GitHub',
  },
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
      <ProjectsGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
          >
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <TechStack>Tech: {project.tech}</TechStack>
            {(project.demo || project.github) && (
              <ProjectLinks>
                {project.demo && (
                  <ProjectLink href={project.demo} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </ProjectLink>
                )}
                {project.github && (
                  <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i> GitHub
                  </ProjectLink>
                )}
              </ProjectLinks>
            )}
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
}

export default Projects; 