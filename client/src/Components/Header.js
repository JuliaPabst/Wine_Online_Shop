import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function header({
  changeState,
  loggingStatus,
  changeLoggingStatus,
  orders,
}) {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <button onClick={() => changeState("home")}>
            Coloreti Suffumbergi
          </button>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {loggingStatus ? (
              <span>
                <button
                  className="btn btn-primary"
                  onClick={(event) => {
                    changeState("cart");
                  }}
                >
                  {" "}
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
              </span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
