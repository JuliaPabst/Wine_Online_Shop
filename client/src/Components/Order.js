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
                    <button>Bestellung löschen</button>
                  </div>
                )
              );
            })}
          </span>
        </div>
      ))}
    </div>
  );
}
