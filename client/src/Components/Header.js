import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function header({ changeState }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <button onClick={() => changeState("home")}>
            Coloreti Suffumbergi
          </button>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <button
              className="btn btn-primary"
              onClick={() => changeState("cart")}
            >
              Einkaufswagen
            </button>
            <button
              className="btn btn-primary"
              onClick={() => changeState("order")}
            >
              Meine Bestellungen
            </button>
            <button
              className="btn btn-primary"
              onClick={() => changeState("signIn")}
            >
              Anmelden
            </button>
            <button
              className="btn btn-primary"
              onClick={() => changeState("register")}
            >
              Registrieren
            </button>
            <button
              className="btn btn-primary"
              onClick={() => changeState("home")}
            >
              Abmelden
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
