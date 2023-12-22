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
  let [loggingStatus, setLoggingStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function changeState(state) {
    setState(state);
  }

  function changeLoggingStatus(loggingStatus) {
    setLoggingStatus(loggingStatus);
  }

  function changeEmail(email) {
    setEmail(email);
  }

  function changePassword(password) {
    setPassword(password);
  }

  return (
    <div className="App">
      <Header changeState={changeState} />
      {state === "home" ? (
        <Overview />
      ) : state === "signIn" ? (
        <SignIn
          changeLoggingStatus={changeLoggingStatus}
          changeState={changeState}
          changeEmail={changeEmail}
          changePassword={changePassword}
          email={email}
          password={password}
        />
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
