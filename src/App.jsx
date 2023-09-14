import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setClientToken } from "./spotify";
import SongList from "../components/SongList";
import "./App.css";
import Login from "./login";

export default function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    const storedTokenTime = window.localStorage.getItem("tokenTime");

    const hash = window.location.hash;
    window.location.hash = "";

    if (!storedToken && hash) {
      const accessToken = hash.split("&")[0].split("=")[1];
      const currentTime = new Date().getTime();
      window.localStorage.setItem("token", accessToken);
      window.localStorage.setItem("tokenTime", currentTime);
      setToken(accessToken);
      setClientToken(accessToken);
    } else if (storedToken && storedTokenTime) {
      const currentTime = new Date().getTime();
      const tokenTime = parseInt(storedTokenTime);

      // Check if more than 10 minutes have passed since token creation
      if (currentTime - tokenTime > 600000) {
        // Clear token and tokenTime from local storage
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenTime");
        setToken("");
        setClientToken("");
      } else {
        setToken(token);
        setClientToken(token);
      }
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<SongList token={token} />} />
      </Routes>
    </Router>
  );
}
