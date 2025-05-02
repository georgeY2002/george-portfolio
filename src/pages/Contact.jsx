import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import myCV from '../assets/George_CV.pdf'; // Adjust the path as needed

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your public key

const ContactContainer = styled(motion.div)`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 60px;
  }
`;

const TerminalCommand = styled(motion.div)`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  &::before {
    content: '> ';
    color: var(--primary-color);
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CommandOutput = styled(motion.div)`
  margin-left: 2rem;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
  @media (max-width: 768px) {
    margin-left: 1rem;
    font-size: 1rem;
  }
`;

const DownloadButton = styled.a`
  display: inline-block;
  margin-left: 2rem;
  margin-bottom: 2rem;
  padding: 0.7rem 1.5rem;
  background: #00ff00;
  color: #000;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(0,255,0,0.08);
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #00cc00;
    color: #fff;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ContactCard = styled(motion.a)`
  padding: 2rem;
  background: rgba(0, 255, 0, 0.05);
  border: var(--terminal-border);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(0, 255, 0, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }
  &:hover::before {
    transform: translateX(100%);
  }
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.2);
  }
`;

const ContactIcon = styled.i`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  text-align: center;
`;

const ContactDescription = styled.p`
  font-size: 1rem;
  text-align: center;
  opacity: 0.8;
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

function Contact() {
  return (
    <ContactContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TerminalCommand>contact --list-methods</TerminalCommand>
      <CommandOutput>
        Available contact methods:
        • Direct Email
        • LinkedIn
        • GitHub
        • Download Resume
        • Response Time: 24-48 hours
      </CommandOutput>

      <ContactGrid>
        <ContactCard 
          href="mailto:georgeyoussef2002@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ContactIcon className="fas fa-envelope" />
          <ContactTitle>Email</ContactTitle>
          <ContactDescription>georgeyoussef2002@gmail.com</ContactDescription>
          <ContactDescription>Click to send an email directly</ContactDescription>
        </ContactCard>

        <ContactCard 
          href="https://www.linkedin.com/in/george-youssef-0a588a30b/"
          target="_blank"
          rel="noopener noreferrer"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ContactIcon className="fab fa-linkedin" />
          <ContactTitle>LinkedIn</ContactTitle>
          <ContactDescription>Connect with me professionally</ContactDescription>
          <ContactDescription>View my work experience</ContactDescription>
        </ContactCard>

        <ContactCard 
          href="https://github.com/georgeY2002"
          target="_blank"
          rel="noopener noreferrer"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ContactIcon className="fab fa-github" />
          <ContactTitle>GitHub</ContactTitle>
          <ContactDescription>Check out my projects</ContactDescription>
          <ContactDescription>View my code repositories</ContactDescription>
        </ContactCard>

        <ContactCard
          href={myCV}
          download="George_Youssef_CV.pdf"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ContactIcon className="fas fa-file-download" />
          <ContactTitle>Download Resume</ContactTitle>
          <ContactDescription>Download my resume as PDF</ContactDescription>
        </ContactCard>
      </ContactGrid>
    </ContactContainer>
  );
}

export default Contact; 