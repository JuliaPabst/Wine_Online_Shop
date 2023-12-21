import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Components/Header.js";
import Overview from "./Components/Overview.js";
import SignIn from "./Components/SignIn.js";
import Cart from "./Components/Cart.js";
import Register from "./Components/Register.js";
import Order from "./Components/Order.js";

function App() {
  let [state, setState] = useState("home");

  function changeState(state) {
    setState(state);
  }

  return (
    <div className="App">
      <Header changeState={changeState} />
      {state === "home" ? (
        <Overview />
      ) : state === "signIn" ? (
        <SignIn />
      ) : state === "register" ? (
        <Register />
      ) : state === "cart" ? (
        <Cart />
      ) : state === "order" ? (
        <Order />
      ) : (
        0
      )}
    </div>
  );
}

export default App;
