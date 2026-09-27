import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../Providers/ChatContext";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { currentChat, getNotification, send } from "../http/getSettings";
import { observer } from "mobx-react-lite";

const Chat = observer(() => {
  const [message, setMessage] = useState([]);
  const [value, setValue] = useState("");
  const { currChat, setCurrChat, notification } = useContext(ChatContext);
  const [chatId, setChatId] = useState(null);
  const bottomRef = useRef(null);
  useEffect(() => {
    setMessage(currChat);
    setChatId(currChat.item);
    setTimeout(() => {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [currChat]);


  useEffect(() => {
    if (!chatId) return;

    currentChat(chatId).then((data) => {
      setMessage((prev) => ({
        ...prev,
        data,prev,chatId
      }));
    });
  }, [notification.updateTrigger]);

  const sendMessage = async (chatId, value, name) => {
    const  data  = await send(chatId, value)
      .then(async () => {
        const data = await currentChat(chatId);
        setCurrChat({ ...currChat, data, name, chatId });
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      })
      .then(() => setValue(""));
  };
  return (
    <Container fluid className="" style={{ maxWidth: 900, marginLeft: 0 }} >
      <h5 className="p-2 mb-3 text-white">{message.name}</h5>
      <div className="overflow-auto p-4 bg-light" style={{ maxHeight: 900 }}>
        {Object.keys(message).length > 0 ? (
          message.data.map((item) => (
            <Row className="" key={Math.random()}>
              {item.type === "incoming" ? (
                <Col className="p-0 d-flex flex-column">
                  {/* Сообщения */}
                  <div className="flex-grow-1 overflow-auto p-3 bg-transparent">
                    <div className="d-flex mb-3">
                      <Card>
                        <Card.Body className="py-2 px-3">
                          {" "}
                          {item.senderContactName}
                          {item.textMessage}
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </Col>
              ) : (
                <Col className="p-0 d-flex flex-column align-items-end">
                  {/* Сообщения */}
                  <div className="flex-grow-1 overflow-auto p-3 bg-transparent">
                    <div className="d-flex mb-3">
                      <Card>
                        <Card.Body className="py-2 px-3">
                          {" "}
                          {item.extendedTextMessage.text}
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          ))
        ) : (
          <span>Пусто</span>
        )}
        <div ref={bottomRef}></div>
      </div>
      <div className="p-3 border-top">
        <InputGroup>
          <Form.Control
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Написать сообщение..."
          />

          <Button
            onClick={() => sendMessage(chatId, value, message.name)}
            variant="primary"
          >
            Отправить
          </Button>
        </InputGroup>
      </div>
    </Container>
  );
}
)

export default Chat
