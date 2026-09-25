import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../components/Auth";
import Messenger from "../components/Messenger";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/messenger" element={<Messenger/>} />
    </Routes>
  );
}
