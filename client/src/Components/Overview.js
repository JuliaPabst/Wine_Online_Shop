import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Overview({
  loggingStatus,
  changeOrders,
  changeWines,
  user_id,
  wines,
}) {
  const [loading, setLoading] = useState(true);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [currentWine, setCurrentWine] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/wines")
      .then((response) => response.json())
      .then((data) => {
        changeWines(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
    setLoading(true);
  }, []);

  useEffect(() => {
    const newOrders = wines.map((wine) => ({
      _id: wine._id,
      amount: 0,
    }));
    setCurrentOrders(newOrders);
  }, [wines]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const newOrders = wines
      .map((wine) => {
        const amountInput = form[`amount_${wine._id}`];
        const amount = amountInput ? Number(amountInput.value) : 0;
        return { wine_id: wine._id, amount };
      })
      .filter((order) => order.amount > 0);
    setCurrentOrders(newOrders);
    changeOrders(newOrders);
  };

  if (loading === true) {
    return <p>Loading</p>;
  } else {
    return (
      <Container>
        <form onSubmit={handleFormSubmit}>
          <Row className="justify-content-md-center">
            {wines.map((wine) => (
              <Col key={wine._id} xs="12" lg="4">
                <h2>{wine.name}</h2>
                <h3>{wine.taste}</h3>
                <p>{wine.description}</p>
                <img src={wine.pictureURL} alt={wine.name}></img>
                {loggingStatus && (
                  <div>
                    <label>Menge:</label>{" "}
                    <input
                      type="number"
                      name={`amount_${wine._id}`}
                      defaultValue="0"
                    ></input>
                  </div>
                )}
              </Col>
            ))}
          </Row>
          {loggingStatus && <button type="submit">Bestellung aufgeben</button>}
        </form>
      </Container>
    );
  }
}
