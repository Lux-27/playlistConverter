import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setClientToken } from "./spotify";
import SongList from "../components/SongList";
import "./App.css";
import Login from "./login";

export default function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const accessToken = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", accessToken);
      setToken(accessToken);
      setClientToken(accessToken);
    } else {
      setToken(token);
      setClientToken(token);
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
