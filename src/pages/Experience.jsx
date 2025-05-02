import styled from 'styled-components';

const ExperienceContainer = styled.div`
  padding: 2rem;
`;

const TerminalCommand = styled.div`
  margin-bottom: 1rem;
  
  &::before {
    content: '> ';
    color: #00ff00;
  }
`;

const CommandOutput = styled.div`
  margin-left: 2rem;
  margin-bottom: 1.5rem;
`;

const ExperienceItem = styled.div`
  margin-bottom: 2rem;
  border-left: 2px solid #00ff00;
  padding-left: 1rem;
`;

const Company = styled.h3`
  color: #00ff00;
  margin-bottom: 0.5rem;
`;

const Duration = styled.div`
  color: #00ff00;
  opacity: 0.8;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  line-height: 1.6;
`;

function Experience() {
  return (
    <ExperienceContainer>
      <TerminalCommand>ls experience/</TerminalCommand>
      
      <ExperienceItem>
        <Company>Software Engineer at Kinetics Egypt</Company>
        <Duration>6 Months</Duration>
        <Description>
          Gained experience in software engineering practices, real-world applications, and team collaboration.
        </Description>
      </ExperienceItem>

      <ExperienceItem>
        <Company>ServiceNow Developer at VOIS</Company>
        <Duration>Current</Duration>
        <Description>
          Developing, customizing, and managing ServiceNow applications and workflows to enhance business processes and operations.
        </Description>
      </ExperienceItem>

      <TerminalCommand>cat education.txt</TerminalCommand>
      <CommandOutput>
        German International University<br/>
        Bachelor's Degree in Software Engineering
      </CommandOutput>
    </ExperienceContainer>
  );
}

export default Experience; 