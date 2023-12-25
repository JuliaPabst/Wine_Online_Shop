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
  const [user_id, setUser_id] = useState("");
  const [firstName, setFirstName] = useState("");
  const [orders, setOrders] = useState([]);
  const [wines, setWines] = useState([]);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  function changeState(state) {
    setState(state);
  }

  function changeLoggingStatus(loggingStatus) {
    setOrderSubmitted(false);
    setLoggingStatus(loggingStatus);
  }

  function changeEmail(email) {
    setEmail(email);
  }

  function changePassword(password) {
    setPassword(password);
  }

  function changeUser_id(user_id) {
    setUser_id(user_id);
  }

  function changeOrders(orders) {
    setOrders(orders);
  }

  function changeWines(wines) {
    setWines(wines);
  }

  function changeOrderSubmitted(orderSubmitted) {
    setOrderSubmitted(orderSubmitted);
  }

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <div className="App">
      <Header
        changeState={changeState}
        loggingStatus={loggingStatus}
        changeLoggingStatus={changeLoggingStatus}
        firstName={firstName}
        orders={orders}
      />
      {state === "home" ? (
        <Overview
          loggingStatus={loggingStatus}
          changeOrders={changeOrders}
          user_id={user_id}
          wines={wines}
          changeWines={changeWines}
        />
      ) : state === "signIn" ? (
        <SignIn
          changeLoggingStatus={changeLoggingStatus}
          changeState={changeState}
          changeEmail={changeEmail}
          changePassword={changePassword}
          changeUser_id={changeUser_id}
          email={email}
          password={password}
        />
      ) : state === "register" ? (
        <Register
          changeLoggingStatus={changeLoggingStatus}
          changeState={changeState}
          changeEmail={changeEmail}
          changePassword={changePassword}
          changeUser_id={changeUser_id}
          email={email}
          password={password}
        />
      ) : state === "cart" ? (
        <Cart
          orders={orders}
          changeOrders={changeOrders}
          wines={wines}
          user_id={user_id}
          orderSubmitted={orderSubmitted}
          changeOrderSubmitted={changeOrderSubmitted}
        />
      ) : state === "order" ? (
        <Order user_id={user_id} wines={wines} state={state} />
      ) : (
        0
      )}
    </div>
  );
}

export default App;
