import styled from 'styled-components';

const AchievementsContainer = styled.div`
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

const AchievementItem = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #00ff00;
  border-radius: 5px;
`;

const Title = styled.h3`
  color: #00ff00;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  line-height: 1.6;
`;

const Year = styled.div`
  color: #00ff00;
  opacity: 0.8;
  margin-bottom: 0.5rem;
`;

function Achievements() {
  return (
    <AchievementsContainer>
      <TerminalCommand>cat achievements.txt</TerminalCommand>
      
      <AchievementItem>
        <Title>Open Source Contributor</Title>
        <Year>2023</Year>
        <Description>
          • Contributed to major open-source projects including React and Node.js
          • Fixed critical bugs and implemented new features
          • Maintained documentation and provided support to the community
        </Description>
      </AchievementItem>

      <AchievementItem>
        <Title>Hackathon Winner</Title>
        <Year>2022</Year>
        <Description>
          • Won first place in a 48-hour hackathon
          • Developed an innovative solution using AI and machine learning
          • Implemented real-time data processing and visualization
        </Description>
      </AchievementItem>

      <AchievementItem>
        <Title>Tech Conference Speaker</Title>
        <Year>2021</Year>
        <Description>
          • Presented at major tech conferences on modern web development
          • Shared insights on performance optimization and best practices
          • Conducted workshops for aspiring developers
        </Description>
      </AchievementItem>
    </AchievementsContainer>
  );
}

export default Achievements; 