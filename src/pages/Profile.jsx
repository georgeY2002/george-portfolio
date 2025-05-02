import styled from 'styled-components';

const ProfileContainer = styled.div`
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
  margin-bottom: 1rem;
`;

const AboutMe = styled.div`
  margin-top: 2rem;
  line-height: 1.6;
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-left: 2rem;
  margin-bottom: 1rem;
`;

const SkillItem = styled.div`
  min-width: 120px;
  flex: 1 1 18%;
  background: rgba(0,255,0,0.07);
  border-radius: 3px;
  padding: 0.3rem 0.7rem;
  color: #00ff00;
  font-family: 'Fira Mono', 'Consolas', monospace;
  font-size: 1rem;
  text-align: center;
`;

function Profile() {
  const skills = [
    'Node.js', 'Database Management', 'MongoDB', 'Full Stack Software Development', 'React.js',
    'MERN Stack', 'Microservices', 'Java', 'GitHub for version control', 'SQL',
    'Next.js', 'NestJS', 'Prisma', 'Typescript', 'GraphQL',
    'Flutter', 'React Native', 'Service Now scripting'
  ];

  return (
    <ProfileContainer>
      <TerminalCommand>whoami</TerminalCommand>
      <CommandOutput>
        George Youssef<br/>
        Software Engineer
      </CommandOutput>

      <TerminalCommand>cat about.txt</TerminalCommand>
      <AboutMe>
        Driven Software Engineering student with hands-on experience in full-stack and mobile app development. Passionate about transforming ideas into reality through code. Involvement in university and freelance projects has allowed fine-tuning of abilities in Flutter, React Native, Node.js, and more. Recognized for strong problem-solving capabilities and fostering teamwork to deliver high-quality software solutions.
      </AboutMe>

      <TerminalCommand>skills</TerminalCommand>
      <SkillsGrid>
        {skills.map((skill, idx) => (
          <SkillItem key={idx}>{skill}</SkillItem>
        ))}
      </SkillsGrid>
    </ProfileContainer>
  );
}

export default Profile; 