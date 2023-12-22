import React from "react";
import { useState, useEffect } from "react";

export default function SignIn() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [correctSignIn, setCorrectSignIn] = useState(false);

  useEffect(() => {}, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    users.map((user) => {
      if (user.email === email) {
        if (user.password == password) {
          setCorrectSignIn(true);
          console.log("correctPassword");
        }
      }
    });
  };

  if (loading) {
    return <p>Loading</p>;
  } else {
    if (correctSignIn) {
      return <div>correct password</div>;
    } else
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label>Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button type="submit">Senden</button>
          </form>
        </div>
      );
  }
}
