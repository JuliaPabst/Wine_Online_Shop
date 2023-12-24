import React from "react";

export default function Cart({ orders, wines, user_id, changeOrders }) {
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
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {orders.map((order) => (
          <div>
            {wines
              .find((wine) => wine._id == order.wine_id)
              .map((wine) => (
                <div>
                  <label>{wine.name}</label>
                  <input
                    type="number"
                    name={`amount_${wine._id}`}
                    defaultValue="0"
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
