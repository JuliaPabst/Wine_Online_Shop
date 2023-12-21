import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Overview() {
  const [wines, setWines] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/wines")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWines(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container>
      <Row className="justify-content-md-center">
        {wines.map((wine) => (
          <Col xs="12" lg="4">
            <h2>{wine.name}</h2>
            <h3>{wine.taste}</h3>
            <p>{wine.description}</p>
            <img src={wine.pictureURL}></img>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
