import React from "react";

export default function SignIn({
  changeLoggingStatus,
  changeState,
  changePassword,
  changeEmail,
  changeUser_id,
  email,
  password,
}) {
  const handleSubmit = async (event) => {
    event.preventDefault();

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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            className="input-signIn-register"
            onChange={(e) => changeEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Passwort: </label>
          <input
            type="password"
            className="input-signIn-register"
            onChange={(e) => changePassword(e.target.value)}
          ></input>
        </div>
        <button className="small-button" type="submit">Senden</button>
      </form>
    </div>
  );
}
