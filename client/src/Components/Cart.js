import React from "react";
import { useState, useEffect } from "react";

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
    <div className="cart-container">
      <form onSubmit={handleFormSubmit}>
        <h2>Meine Bestellung</h2>
        <div>
          {orders.map((order, index) => (
            <div key={order.wine_id}>
              {wines
                .filter((wine) => wine._id == order.wine_id)
                .map((wine) => (
                  <div key={wine._id}>
                    <div>
                      <label className="bold centered">{wine.name}</label>
                    </div>
                    <div>
                      <input
                        type="number"
                        name={`amount_${wine._id}`}
                        defaultValue={order.amount}
                        onChange={(event) =>
                          changeAmount(wine._id, Number(event.target.value))
                        }
                      ></input>
                      <p key={wine._id}>Preis: {wine.price * order.amount}€</p>
                    </div>
                  </div>
                ))}
            </div>
          ))}
          <p className="gesamtpreis">Gesamtpreis: {totalPrice}€</p>
          <button type="submit">Bestellung aufgeben</button>
        </div>
      </form>
    </div>
  );
}
