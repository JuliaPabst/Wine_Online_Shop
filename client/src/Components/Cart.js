import React from "react";
import { useState, useEffect } from "react";

export default function Cart({ orders, wines, user_id, changeOrders }) {
  const [orderSubmitted, setOrderSubmitted] = useState(false);

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
    postOrder(newOrders);
  };

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
        changeOrders([]);
      })
      .catch((error) => {
        console.error("Error posting order:", error);
      });
  }
  return orderSubmitted ? (
    <div>
      Danke für Ihre Bestellung! Sie erhalten als Bestätigung eine Email!
    </div>
  ) : orders.length == 0 ? (
    <div>Der Warenkorb ist leer.</div>
  ) : (
    <div>
      <form onSubmit={handleFormSubmit}>
        {orders.map((order, index) => (
          <div key={index}>
            {wines
              .filter((wine) => wine._id == order.wine_id)
              .map((wine) => (
                <div key={wine._id}>
                  <label>{wine.name}</label>
                  <input
                    type="number"
                    name={`amount_${wine._id}`}
                    defaultValue={order.amount}
                  ></input>
                </div>
              ))}
          </div>
        ))}
        <button type="submit">Bestellung aufgeben</button>
      </form>
    </div>
  );
}
