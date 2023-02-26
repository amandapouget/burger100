import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import burgerLogo from '../logo.png';
import '../css/Header.css';

export const Header = () => (
  <header className="bg-dark text-light py-3 mb-4 border-bottom">
    <Container fluid>
      <div className="d-flex flex-row">
        <Image width="100" height="85" className="burger-logo me-2" src={burgerLogo} alt="Burger Logo"/>
        <div>
          <div className="burger-title fs-1">Burger: 100</div>
          <div className="fs-6">A Quest to Find the Perfect Burger</div>
        </div>
      </div>
    </Container>
  </header>
);