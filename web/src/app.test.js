import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';


describe('HomePage Component Tests', () => {
  test('renders the hero section with main text', () => {
    render(<App />);
    const mainText = screen.getByText(/Empowering Your Independence, Enriching Your Choices/i);
    expect(mainText).toBeInTheDocument();
  });

  test('renders the mission section', () => {
    render(<App />);
    const missionSection = screen.getByText(/Our Mission/i);
    expect(missionSection).toBeInTheDocument();
  });

  test('renders the services section', () => {
    render(<App />);
    const servicesSection = screen.getByText(/Services/i);
    expect(servicesSection).toBeInTheDocument();
  });

  test('renders the contact section', () => {
    render(<App />);
    const contactSection = screen.getByText(/Contact Us/i);
    expect(contactSection).toBeInTheDocument();
  });

  // test('opens login modal on client login button click', () => {
  //   render(<App />);
  //   const clientLoginButton = screen.getByText(/Client Login/i);
  //   fireEvent.click(clientLoginButton);
  //   // Check if the login modal is rendered with "client" role
  //   const loginModal = screen.getByText(/Login/i);
  //   expect(loginModal).toBeInTheDocument();
  // });

  // test('opens register modal on "Get Started" button click', () => {
  //   render(<App />);
  //   const heroSection = screen.getByTestId('hero-section'); // Add data-testid="hero-section" to the hero section in your component
  //   const registerButton = within(heroSection).getByText(/Get Started/i);
  //   fireEvent.click(registerButton);
  
  //   // Check if the register modal is rendered
  //   const registerModal = screen.getByText(/Register/i);
  //   expect(registerModal).toBeInTheDocument();
  // });

  // Additional tests can be added here
});
