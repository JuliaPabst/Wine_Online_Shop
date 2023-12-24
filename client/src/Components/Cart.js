import React from "react";

export default function Cart() {
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
      })
      .catch((error) => {
        console.error("Error posting order:", error);
      });
  }
  return <div>cart</div>;
}
