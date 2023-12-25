import React from "react";
import { useState } from "react";

export default function Register({
  changeLoggingStatus,
  changeState,
  changePassword,
  changeEmail,
  changeUser_id,
  email,
  password,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ZIPCode, setZIPCode] = useState(0);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date());
  const [updatedAt, setUpdatedAt] = useState(new Date());

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        ZIPCode,
        city,
        street,
        houseNumber,
        flatNumber,
        email,
        password,
        createdAt,
        updatedAt,
      }),
    })
      .then((response) => {
        if (response.ok) {
          changeLoggingStatus(true);
          changeState("home");
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch("http://localhost:3000/api/users/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          changeLoggingStatus(true);
          changeState("home");
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Success:", data);
        changeUser_id(data.user_id);
        console.log(data.user_id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vorname</label>
          <input
            type="text"
            className="input-signIn-register"
            onChange={(e) => setFirstName(e.target.value)}
            required
          ></input>
        </div>
        <div className="register-element">
          <label>Nachname</label>
          <input
            type="text"
            className="input-signIn-register"
            onChange={(e) => setLastName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label>Postleitzahl</label>
          <input
            type="number"
            className="input-signIn-register"
            onChange={(e) => setZIPCode(e.target.value)}
            required
          ></input>
        </div>
        <div className="register-element">
          <label>Stadt</label>
          <input
            type="text"
            className="input-signIn-register"
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label>Straße</label>
          <input
            type="text"
            className="input-signIn-register"
            onChange={(e) => setStreet(e.target.value)}
            required
          ></input>
          <label>Hausnummer</label>
          <input
            type="text"
            className="input-signIn-register"
            onChange={(e) => setHouseNumber(e.target.value)}
            required
          ></input>
          <div className="register-element">
            <label>Wohnungsnummer</label>
            <input
              type="text"
              className="input-signIn-register"
              onChange={(e) => setFlatNumber(e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            className="input-signIn-register"
            onChange={(e) => changeEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className="register-element">
          <label>Passwort</label>
          <input
            type="password"
            className="input-signIn-register"
            onChange={(e) => changePassword(e.target.value)}
            required
          ></input>
        </div>
        <button type="submit">Senden</button>
      </form>
    </div>
  );
}
