import React from "react";
import { useState, useEffect } from "react";

export default function Order({ user_id, wines, state }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
    setLoading(true);
  }, [state]);

  function deleteOrder(orderId) {
    fetch(`http://localhost:3000/api/orders/${orderId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order deleted:", data);
        setOrders(orders.filter((order) => order._id !== orderId));
      })
      .catch((error) => console.error("Error deleting order:", error));
  }
  return loading ? (
    <div>Loading</div>
  ) : (
    <div>
      {orders.map((order, index) => (
        <div key={index}>
          <h2>Bestellung {index + 1}</h2>
          <span>
            {order.order.map((orderWine, wineIndex) => {
              const matchedWine = wines.find(
                (wine) => wine._id === orderWine.wine_id
              );
              return (
                matchedWine && (
                  <div key={wineIndex}>
                    <span>{matchedWine.name}: </span>
                    <span>{orderWine.amount}</span>
                  </div>
                )
              );
            })}
            <button onClick={() => deleteOrder(order._id)}>
              Bestellung löschen
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}
