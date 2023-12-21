import React from "react";
import { Container, Nav, Navbar} from "react-bootstrap";

export default function header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Coloreti Suffumbergi</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <button className="btn btn-primary">Einkaufswagen</button>
            <button className="btn btn-primary">Meine Bestellungen</button>
            <button className="btn btn-primary">Anmelden</button>
            <button className="btn btn-primary">Registrieren</button>
            <button className="btn btn-primary">Abmelden</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
