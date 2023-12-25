import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function header({
  changeState,
  loggingStatus,
  changeLoggingStatus,
}) {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="#home">
          <button onClick={() => changeState("home")} className="navbar-button">
            Coloreti Suffumbergi
          </button>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {loggingStatus ? (
              <span>
                <button
                  className="navbar-menu-button"
                  onClick={(event) => {
                    changeState("cart");
                  }}
                >
                  {" "}
                  Einkaufswagen
                </button>
                <button
                  className="navbar-menu-button"
                  onClick={() => changeState("order")}
                >
                  Meine Bestellungen
                </button>
                <button
                  className="navbar-menu-button"
                  onClick={() => {
                    changeLoggingStatus(false);
                    changeState("home");
                  }}
                >
                  Abmelden
                </button>
              </span>
            ) : (
              <span>
                <button
                  className="navbar-menu-button"
                  onClick={() => changeState("signIn")}
                >
                  Anmelden
                </button>
                <button
                  className="navbar-menu-button"
                  onClick={() => changeState("register")}
                >
                  Registrieren
                </button>
              </span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
