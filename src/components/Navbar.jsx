import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const NavContainer = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: var(--terminal-border);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 1000;
  height: auto;
  transition: all 0.3s ease;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 255, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 2px;
  }

  @media (max-width: 1200px) {
    padding: 0.75rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    height: ${props => props.isOpen ? 'auto' : '50px'};
    flex-direction: column;
    align-items: stretch;
    overflow-x: hidden;
  }

  @media (max-width: 480px) {
    padding: 0.25rem;
    height: ${props => props.isOpen ? 'auto' : '45px'};
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  gap: 2rem;
  min-width: max-content;

  @media (max-width: 1200px) {
    max-width: 95%;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    max-width: 100%;
    gap: 0;
    min-width: auto;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  gap: 1rem;
  min-width: max-content;

  @media (max-width: 768px) {
    padding: 0.25rem;
    gap: 0.5rem;
    min-width: auto;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 480px) {
    min-width: 35px;
    min-height: 35px;
    font-size: 1.25rem;
  }
`;

const TerminalPrompt = styled(motion.div)`
  color: var(--text-color);
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &::before {
    content: 'user@portfolio:~$';
    margin-right: 0.5rem;
    color: var(--primary-color);
  }

  @media (max-width: 1200px) {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    flex: 1;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    
    &::before {
      content: 'user@:~$';
    }
  }
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 2rem;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
  min-width: max-content;

  @media (max-width: 1200px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
    width: 100%;
    display: ${props => props.isOpen ? 'flex' : 'none'};
    padding-top: 0.5rem;
    justify-content: flex-start;
    min-width: auto;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
  position: relative;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  text-transform: lowercase;
  white-space: nowrap;
  
  &::before {
    content: '>';
    margin-right: 0.5rem;
    opacity: ${props => props.isActive ? '1' : '0'};
    transition: opacity 0.3s ease;
    color: var(--primary-color);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--primary-color);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  @media (max-width: 1200px) {
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
    padding: 0.75rem 1rem;
    border-top: 1px solid rgba(0, 255, 0, 0.1);
    font-size: 1.1rem;
    
    &:hover {
      background: rgba(0, 255, 0, 0.1);
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
  }
`;

const TerminalStatus = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.7;
  margin-left: auto;

  @media (max-width: 1200px) {
    font-size: 0.75rem;
  }

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    justify-content: flex-start;
    padding: 0.75rem 1rem;
    border-top: 1px solid rgba(0, 255, 0, 0.1);
    font-size: 0.8rem;
    margin-left: 0;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.color};
  box-shadow: 0 0 5px ${props => props.color};
  animation: ${props => props.color === '#00ff00' ? 'pulse 2s infinite' : 'none'};

  @media (max-width: 480px) {
    width: 6px;
    height: 6px;
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <NavContainer
      initial="hidden"
      animate="visible"
      isOpen={isOpen}
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        boxShadow: visible ? '0 2px 10px rgba(0, 255, 0, 0.1)' : 'none'
      }}
    >
      <NavContent>
        <TopBar>
          <TerminalPrompt>portfolio</TerminalPrompt>
          <MenuButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '×' : '≡'}
          </MenuButton>
        </TopBar>

        <NavLinks isOpen={isOpen}>
          <NavLink 
            to="/" 
            isActive={location.pathname === '/'}
            onClick={handleLinkClick}
          >
            profile
          </NavLink>
          <NavLink 
            to="/experience" 
            isActive={location.pathname === '/experience'}
            onClick={handleLinkClick}
          >
            experience
          </NavLink>
          <NavLink 
            to="/projects" 
            isActive={location.pathname === '/projects'}
            onClick={handleLinkClick}
          >
            projects
          </NavLink>
          <NavLink 
            to="/contact" 
            isActive={location.pathname === '/contact'}
            onClick={handleLinkClick}
          >
            contact
          </NavLink>

          <TerminalStatus isOpen={isOpen}>
            <StatusDot color="#00ff00" />
            <StatusDot color="#ffff00" />
            <StatusDot color="#ff0000" />
            <span>Terminal Active</span>
          </TerminalStatus>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
}

export default Navbar;