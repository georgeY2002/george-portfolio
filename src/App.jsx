import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import BinaryRain from './components/BinaryRain';
import { useState, useEffect, useRef } from 'react';

const matrixRain = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const scanLine = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const binaryRain = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const AppContainer = styled.div`
  background-color: var(--bg-color);
  min-height: 100vh;
  color: var(--text-color);
  font-family: var(--font-mono);
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: linear-gradient(45deg, #000000, #001a00);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(90deg, rgba(0,255,0,0.1) 1px, transparent 1px) 0 0 / 20px 20px,
      linear-gradient(rgba(0,255,0,0.1) 1px, transparent 1px) 0 0 / 20px 20px;
    animation: ${matrixRain} 8s linear infinite;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(0, 255, 0, 0.05) 50%,
      transparent 100%
    );
    animation: ${scanLine} 8s linear infinite;
    z-index: 1;
  }
`;

const TerminalWindow = styled(motion.div)`
  max-width: 1400px;
  width: 95%;
  margin: 2rem auto;
  padding: 2rem;
  border: var(--terminal-border);
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  z-index: 2;

  @media (max-width: 1024px) {
    width: 98%;
    margin: 1rem auto;
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    padding: 1rem;
    min-height: 100vh;
    margin-top: 60px;
    border-radius: 0;
  }
`;

const TerminalHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: rgba(0, 255, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-size: 0.8rem;
  border-bottom: var(--terminal-border);
  z-index: 2;
  backdrop-filter: blur(5px);

  &::before {
    content: 'Terminal';
    color: var(--primary-color);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 1rem;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--primary-color);
    box-shadow: 0 0 10px var(--primary-color);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const pageVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const PageContainer = styled(motion.div)`
  flex: 1;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100%;
  padding-top: 60px;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding-top: 40px;
  }
`;

const terminalVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const TerminalHelp = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1002;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: 'Courier New', monospace;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 255, 0, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--accent-color);
  }
`;

const HelpHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--primary-color);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  position: sticky;
  top: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1;

  h2 {
    color: var(--primary-color);
    font-size: 1.5rem;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: 'user@portfolio:~$';
      color: var(--accent-color);
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }
`;

const TerminalContent = styled.div`
  color: var(--text-color);
  line-height: 1.6;
  font-size: 1.1rem;

  .section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: rgba(0, 255, 0, 0.05);
    border-radius: 3px;
    border-left: 2px solid var(--primary-color);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(0, 255, 0, 0.08);
      transform: translateX(5px);
    }

    h3 {
      color: var(--primary-color);
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &::before {
        content: '>';
        color: var(--accent-color);
      }
    }
  }

  .command {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
    padding: 0.75rem;
    border-radius: 3px;
    transition: all 0.3s ease;
    background: rgba(0, 255, 0, 0.03);

    &:hover {
      background: rgba(0, 255, 0, 0.1);
      transform: translateX(5px);
    }

    .key {
      background: var(--primary-color);
      color: var(--bg-color);
      padding: 0.25rem 0.75rem;
      border-radius: 3px;
      font-size: 0.9rem;
      min-width: 2rem;
      text-align: center;
      font-family: 'Courier New', monospace;
      box-shadow: 0 0 5px rgba(0, 255, 0, 0.2);
    }

    .description {
      opacity: 0.9;
    }
  }

  .tip {
    font-style: italic;
    opacity: 0.8;
    margin-top: 1rem;
    padding-left: 1rem;
    border-left: 2px solid var(--accent-color);
    background: rgba(0, 255, 0, 0.03);
    padding: 0.75rem;
    border-radius: 3px;
  }
`;

const HelpCloseButton = styled(motion.button)`
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const ProfessionalResources = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1002;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
  backdrop-filter: blur(10px);
  font-family: 'Courier New', monospace;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 255, 0, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--accent-color);
  }
`;

const ResourceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--primary-color);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  position: sticky;
  top: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1;

  h2 {
    color: var(--primary-color);
    font-size: 1.5rem;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: 'user@portfolio:~$';
      color: var(--accent-color);
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ResourceItem = styled(motion.div)`
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(0, 255, 0, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.2);

    &::before {
      transform: translateX(100%);
    }
  }

  .icon {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;
  }

  h3 {
    color: var(--primary-color);
    margin: 0;
    transition: all 0.3s ease;
  }

  p {
    opacity: 0.8;
    margin: 0;
    transition: all 0.3s ease;
  }

  &:hover {
    .icon {
      transform: scale(1.1);
      color: var(--accent-color);
    }
    h3 {
      color: var(--accent-color);
    }
    p {
      opacity: 1;
    }
  }
`;

const InventoryButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--primary-color);
  color: var(--bg-color);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
  font-size: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 1rem;
    right: 1rem;
  }
`;

const InventoryOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const InventoryContent = styled(motion.div)`
  background: rgba(0, 20, 0, 0.8);
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const InventoryItem = styled(motion.div)`
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 0, 0.2);
    transform: translateX(10px);
  }

  h3 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-color);
    opacity: 0.8;
  }
`;

const ResourceCloseButton = styled(motion.button)`
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const HintMessage = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 2000;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.1);
  backdrop-filter: blur(5px);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.2);
  }

  .robot {
    font-size: 1.5rem;
    animation: bounce 2s infinite;
  }

  .text {
    color: var(--text-color);
    font-size: 0.9rem;
    opacity: 0.8;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
`;

const TerminalModeButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  background: var(--primary-color);
  color: var(--bg-color);
  border: none;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
  }

  .icon {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
    bottom: 1rem;
    left: 1rem;
  }
`;

const TerminalModeOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  font-family: 'Courier New', monospace;
  color: var(--primary-color);
  overflow: hidden;
`;

const TerminalModeContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.8);
  margin-top: 1rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 255, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
  }
`;

const TerminalModeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--primary-color);
  font-size: 1.2rem;
`;

const TerminalModePrompt = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;

  &::before {
    content: 'user@portfolio:~$';
    color: var(--accent-color);
  }
`;

const TerminalModeInput = styled.input`
  background: transparent;
  border: none;
  color: var(--primary-color);
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  width: 100%;
  outline: none;
  caret-color: var(--primary-color);
`;

const TerminalModeOutput = styled.div`
  color: var(--text-color);
  line-height: 1.6;
  white-space: pre-wrap;
`;

const TerminalModeCloseButton = styled(motion.button)`
  background: var(--primary-color);
  color: var(--bg-color);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1.25rem;
  }
`;

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageContainer
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Profile />
            </PageContainer>
          }
        />
        <Route
          path="/experience"
          element={
            <PageContainer
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Experience />
            </PageContainer>
          }
        />
        <Route
          path="/projects"
          element={
            <PageContainer
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Projects />
            </PageContainer>
          }
        />
        <Route
          path="/contact"
          element={
            <PageContainer
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Contact />
            </PageContainer>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [showTerminalMode, setShowTerminalMode] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const downloadRef = useRef(null);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (showTerminalMode) {
      setTerminalHistory([{
        type: 'output',
        content: `Welcome to Terminal Mode!\n<strong>Type 'help' to see available commands and start exploring.</strong>\n<br/><span>Command: <strong>download</strong> (to download my resume)</span>\n\nFor a quick start, try these commands:\n- help: Show all available commands\n- about: Professional summary\n- contact: Contact information\n- accounts: LinkedIn & GitHub\n- education: Education background\n- experience: Work experience\n- projects: Relevant projects\n- skills: Technical skills\n- personalskills: Personal skills\n- languages: Languages\n- download: Download my resume\n- exit: Close terminal mode`
      }]);
    }
  }, [showTerminalMode]);

  useEffect(() => {
    if (showTerminalMode && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, showTerminalMode]);

  const handleTerminalCommand = (command) => {
    const newHistory = [...terminalHistory, { type: 'input', content: command }];
    switch (command.toLowerCase()) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: `Available commands:\n- help: Show this help message\n- about: Professional summary\n- contact: Contact information\n- accounts: LinkedIn & GitHub\n- education: Education background\n- experience: Work experience\n- projects: Relevant projects\n- skills: Technical skills\n- personalskills: Personal skills\n- languages: Languages\n- download: Download my resume (PDF)\n- clear: Clear the terminal\n- exit: Exit terminal mode\n- echo [text]: Display text\n- whoami: Show user information\n- pwd: Show current directory\n- history: Show command history`
        });
        break;
      case 'download':
        newHistory.push({
          type: 'output',
          content: `Downloading resume...`
        });
        setTerminalHistory(newHistory);
        setTerminalInput('');
        setTimeout(() => {
          if (downloadRef.current) {
            downloadRef.current.setAttribute('href', '/assets/George_CV.pdf');
            downloadRef.current.setAttribute('download', 'George_Youssef_CV.pdf');
            downloadRef.current.click();
          }
        }, 300);
        return;
      case 'about':
        newHistory.push({
          type: 'output',
          content: `Driven Software Engineering student with hands-on experience in full-stack and mobile app development. Passionate about transforming ideas into reality through code. Involvement in university and freelance projects has allowed fine-tuning of abilities in Flutter, React Native, Node.js, and more. Recognized for strong problem-solving capabilities and fostering teamwork to deliver high-quality software solutions.`
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          content: `Contact Information:\n- Email: georgeyoussef2002@gmail.com\n- Phone: 01207000444\n- Location: Cairo, Egypt\n- Portfolio: George-app.vercel.app`
        });
        break;
      case 'accounts':
        newHistory.push({
          type: 'output',
          content: `Accounts:\n- LinkedIn: George Youssef (linkedin.com/in/GeorgeYoussef)\n- GitHub: georgeY2002 (github.com/georgeY2002)`
        });
        break;
      case 'education':
        newHistory.push({
          type: 'output',
          content: `Education:\nGerman International University\nBachelor's Degree in Software Engineering`
        });
        break;
      case 'experience':
        newHistory.push({
          type: 'output',
          content: `Work Experience:\n- Software Engineer at Kinetics Egypt (6 Months):\n  Gained experience in software engineering practices, real-world applications, and team collaboration.\n- ServiceNow Developer at VOIS (Current):\n  Developing, customizing, and managing ServiceNow applications and workflows to enhance business processes and operations.`
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          content: `Relevant Projects:\n- Plastic Pallets e-commerce platform (NestJS, NextJS, MongoDB)\n- Help Desk software application (MERN stack)\n- BookStore web app (AWS)\n- Mobile E-commerce App (Flutter, Firebase)\n- Car showroom (Laravel, PHP)\n- Metro system (NodeJS, PostgreSQL)\n- Two games (Java, C++)\n- Parking Finder prototype (UI & requirements)\n- Company database project (SQL + UI)\n- Used GitHub for version control, collaboration, and project management.`
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          content: `Technical Skills:\n- Node.js, Database Management, MongoDB\n- Full Stack Software Development, React.js, MERN Stack\n- Microservices, Java, GitHub for version control\n- SQL, Next.js, NestJS, Prisma, Typescript, GraphQL\n- Flutter, React Native, ServiceNow scripting`
        });
        break;
      case 'personalskills':
        newHistory.push({
          type: 'output',
          content: `Personal Skills:\n- Friendly, Positive Attitude\n- Problem-Solving\n- Time Management\n- Flexible and Adaptable\n- Decision Making\n- Communication`
        });
        break;
      case 'languages':
        newHistory.push({
          type: 'output',
          content: `Languages:\n- Arabic: native\n- English: advanced\n- German: lower intermediate`
        });
        break;
      case 'clear':
        setTerminalHistory([]);
        return;
      case 'exit':
        setShowTerminalMode(false);
        return;
      case 'whoami':
        newHistory.push({
          type: 'output',
          content: `You are a visitor exploring my portfolio.<br/>Type <strong>help</strong> to see what you can do here.`
        });
        break;
      default:
        if (command.startsWith('cd ')) {
          const section = command.split(' ')[1];
          if (['profile', 'experience', 'projects', 'contact', 'skills', 'resume'].includes(section)) {
            setCurrentDirectory(section);
            newHistory.push({
              type: 'output',
              content: `Changed directory to ${section}`
            });
            window.location.href = `/${section}`;
          } else {
            newHistory.push({
              type: 'output',
              content: `Error: No such section '${section}'`
            });
          }
        } else if (command.startsWith('echo ')) {
          newHistory.push({
            type: 'output',
            content: command.substring(5)
          });
        } else {
          newHistory.push({
            type: 'output',
            content: `Command not found: ${command}\nType 'help' to see available commands.`
          });
        }
    }
    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && terminalInput.trim()) {
      handleTerminalCommand(terminalInput.trim());
    }
  };

  return (
    <Router>
      <AppContainer>
        <BinaryRain />
        <TerminalWindow
          variants={terminalVariants}
          initial="initial"
          animate="animate"
        >
          <TerminalHeader />
          <Navbar />
          <AnimatedRoutes />
        </TerminalWindow>

        <TerminalModeButton
          onClick={() => setShowTerminalMode(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="icon">⌨️</span>
          <span>Open Terminal</span>
        </TerminalModeButton>

        <AnimatePresence>
          {showTerminalMode && (
            <TerminalModeOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TerminalModeHeader>
                <span>Terminal Mode</span>
                <TerminalModeCloseButton
                  onClick={() => setShowTerminalMode(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </TerminalModeCloseButton>
              </TerminalModeHeader>
              
              <TerminalModeContent>
                {terminalHistory.map((item, index) => (
                  <div key={index}>
                    {item.type === 'input' && (
                      <TerminalModePrompt>
                        <span>{currentDirectory}</span>
                        <span>{item.content}</span>
                      </TerminalModePrompt>
                    )}
                    {item.type === 'output' && (
                      <TerminalModeOutput dangerouslySetInnerHTML={{ __html: item.content }} />
                    )}
                  </div>
                ))}
                <div ref={terminalEndRef} />
                <TerminalModePrompt>
                  <span>{currentDirectory}</span>
                  <TerminalModeInput
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoFocus
                  />
                </TerminalModePrompt>
              </TerminalModeContent>
            </TerminalModeOverlay>
          )}
        </AnimatePresence>

        <a
          href="/assets/George_CV.pdf"
          download="George_Youssef_CV.pdf"
          ref={downloadRef}
          style={{ display: 'none' }}
        >
          Download
        </a>
      </AppContainer>
    </Router>
  );
}

export default App;
