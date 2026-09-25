import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { login } from "../http/getSettings";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [Id, setId] = useState("");
  const [ApiToken, setApiToken] = useState("");
  const navigate = useNavigate();

  const click = async () => {
    let data;

    data = await login(Id,ApiToken)
    .then(()=>(navigate('/messenger')))
  }
  return (
    <Container>
      <Card className="my-5 px-5 py-3">
        <Form>
          <Form.Group className="mb-2" controlId="IdInstance">
            <Form.Label>Ваш IdInstance</Form.Label>
            <Form.Control
              type="text"
              value={Id}
              onChange={(e)=>setId(e.target.value)}
              placeholder="ID"
              name="Id"
              required
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="ApiToken">
            <Form.Label>Ваш ApiToken</Form.Label>
            <Form.Control
              type="text"
              value={ApiToken}
              onChange={(e)=>setApiToken(e.target.value)}
              placeholder="ApiToken"
              name="ApiToken"
              required
            />
          </Form.Group>
          <Button className="btn-primary" onClick={()=>click()}>
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
