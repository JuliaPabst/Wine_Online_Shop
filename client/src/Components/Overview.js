import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Overview({ loggingStatus, changeOrders }) {
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [currentWine, setCurrentWine] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/wines")
      .then((response) => response.json())
      .then((data) => {
        setWines(data);
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

  const handleSubmit = async (wineId, amount, event) => {
    event.preventDefault();

    let updatedOrders = currentOrders.map((order) => {
      if (order._id === wineId) {
        return { ...order, amount: Number(amount) };
      }
      return order;
    });
    setCurrentOrders(updatedOrders);
    changeOrders(updatedOrders);
  };

  if (loading === true) {
    return <p>Loading</p>;
  } else {
    return (
      <Container>
        <Row className="justify-content-md-center">
          {wines.map((wine) => (
            <Col key={wine._id} xs="12" lg="4">
              <h2>{wine.name}</h2>
              <h3>{wine.taste}</h3>
              <p>{wine.description}</p>
              <img src={wine.pictureURL} alt={wine.name}></img>
              {loggingStatus ? (
                <div>
                  <form
                    onSubmit={(e) => handleSubmit(wine._id, currentAmount, e)}
                  >
                    <label>Menge:</label>{" "}
                    <input
                      type="number"
                      name="currentAmount"
                      onChange={(e) => setCurrentAmount(e.target.value)}
                    ></input>
                    <button type="submit">Zu Warenkorb hinzufügen</button>
                  </form>
                </div>
              ) : (
                ""
              )}
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
