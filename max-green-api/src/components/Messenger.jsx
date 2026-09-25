import React from "react";
import NavBar from "./NavBar";
import Chats from "./Chats";
import { Container } from "react-bootstrap";
import Chat from "./Chat";


export default function Messenger() {
  return (
    <div className="d-flex gap-3">
      <NavBar />
      <Chats />
      <Chat />
    </div>
  );
}
