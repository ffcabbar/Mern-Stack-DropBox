import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LayoutPage from "./Layout/LayoutPage";
import UserContext from "./context/UserContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Axios from "axios";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");

    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }

    const tokenRes = await Axios.post(
      "http://localhost:5000/users/tokenIsValid",
      null,
      { headers: { "x-auth-token": token } }
    );

    if (tokenRes.data) {
      const userRes = await Axios.get("http://localhost:5000/users/", {
        headers: { "x-auth-token": token },
      });

      setUserData({
        token,
        user: userRes.data,
      });
    }
  };
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route exact path="/" component={LayoutPage} />
            <Route exact path="/video/:videoTitle" component={VideoPlayer} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
