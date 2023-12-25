import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// todo: add dynamic prices

export default function Cart({
  orders,
  wines,
  user_id,
  orderSubmitted,
  changeOrderSubmitted,
  changeOrders,
}) {
  const [totalPrice, setTotalPrice] = useState(0);

  function changeAmount(wineId, newAmount) {
    const updatedOrders = orders.map((order) => {
      if (order.wine_id === wineId) {
        return { ...order, amount: newAmount };
      }
      return order;
    });

    changeOrders(updatedOrders);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const newOrders = wines
      .map((wine) => {
        const amountInput = form[`amount_${wine._id}`];
        const amount = amountInput ? Number(amountInput.value) : 0;
        return { wine_id: wine._id, amount };
      })
      .filter((order) => order.amount > 0);
    postOrder(newOrders);
  }

  function postOrder(newOrders) {
    fetch("http://localhost:3000/api/orders/newOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        order: newOrders,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order posted:", data);
        console.log("hi");
        console.log(user_id);
        changeOrders([]);
        changeOrderSubmitted(true);
        setTotalPrice(0);
      })
      .catch((error) => {
        console.error("Error posting order:", error);
      });
  }

  function calculateTotalPrice() {
    let total = 0;
    orders.forEach((order) => {
      const wine = wines.find((wine) => wine._id === order.wine_id);
      if (wine) {
        total += wine.price * order.amount;
      }
    });
    setTotalPrice(total);
  }

  useEffect(() => {
    calculateTotalPrice();
  }, [orders]);

  return orderSubmitted ? (
    <div className="cart-status">Danke für Ihre Bestellung!</div>
  ) : orders.length == 0 ? (
    <div className="cart-status">Der Warenkorb ist leer.</div>
  ) : (
    <div>
      <form onSubmit={handleFormSubmit}>
        <h2>Meine Bestellung</h2>
        <Container>
          <Row className="justify-content-md-center overview-wines-row">
            {orders.map((order, index) => (
              <div key={order.wine_id}>
                {wines
                  .filter((wine) => wine._id == order.wine_id)
                  .map((wine) => (
                    <div key={wine._id}>
                      <Col key={wine._id} xs="12" sm="6">
                        <label className="bold">{wine.name}</label>
                      </Col>
                      <Col key={index} xs="12" sm="6">
                        <input
                          type="number"
                          name={`amount_${wine._id}`}
                          defaultValue={order.amount}
                          onChange={(event) =>
                            changeAmount(wine._id, Number(event.target.value))
                          }
                        ></input>
                        <p key={wine._id}>
                          Preis: {wine.price * order.amount}€
                        </p>
                      </Col>
                    </div>
                  ))}
              </div>
            ))}
            <p className="gesamtpreis">Gesamtpreis: {totalPrice}€</p>
          </Row>
          <button type="submit">Bestellung aufgeben</button>
        </Container>
      </form>
    </div>
  );
}
