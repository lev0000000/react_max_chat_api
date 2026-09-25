import React, { useContext, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from 'react-bootstrap/Form';
import { chats, currentChat } from "../http/getSettings";
import { ChatContext } from "../Providers/ChatContext";
export default function Chats() {
    const [allChats, setAllChats] = useState([])

    const {currChat,setCurrChat} = useContext(ChatContext)

    useEffect(()=>{
        const {data} = chats()
        .then((data)=> setAllChats(...allChats, data ))
    },[])

    const handleChat = async(item,name) => {
        const data = await currentChat(item)
        .then((data)=>{
            setCurrChat(...currChat, {data,name,item })
        })
    }   

    

  return (
    <div className="chat-sidebar d-flex flex-column gap-2 p-3 border-end w-25">
      <h3 className="chat-title text-white">Чаты</h3>

      <Form.Control className="chat-search" type="text" placeholder="Введите номер телефона" />

      <ListGroup className="chat-list">
        {allChats.map((item)=>{
            return(
                <ListGroup.Item action className="chat-item" key={item.chatId} onClick={()=>handleChat(item.chatId, item.name)}>
                <div className="chat-info">
                    <div className="chat-name">{item.name}</div>
                    <div className="chat-message">Привет, как дела?</div>
                </div>
                </ListGroup.Item>
            )
        })}

      </ListGroup>
    </div>
  );
}
