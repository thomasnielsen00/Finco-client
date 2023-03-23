import React, { useState, useEffect } from "react";
import userService from "./user-service";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.get().then((message) => {
      console.log(message);
    });
    userService
      .getAllUsers()
      .then((users) => {
        //@ts-ignore
        setUsers(users);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="App">
      {users.map((user) => (
        //@ts-ignore
        <a>{user.full_name}</a>
      ))}
      <a>Test</a>
    </div>
  );
}

export default App;
