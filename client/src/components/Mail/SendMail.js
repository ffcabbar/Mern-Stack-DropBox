import React, { useState } from "react";
import { Divider, Button, Form, Input } from "antd";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendMail = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const notify = () =>
    toast.success("📩 👌 Mail gönderme işlemi başarılı..", {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleChange = (e) => {
    if (e.target.id === "name") {
      setName(e.target.value);
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
    } else {
      setMessage(e.target.value);
    }
  };

  const submit = () => {
    try {
      const dataToSubmit = {
        name,
        email,
        message,
      };
      notify();
      setAlertOpen(true);
      Axios.post("http://localhost:5000/api/form", dataToSubmit)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {alertOpen && (
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}
      <h2>Send Mail</h2>
      <Divider />

      <Form style={{ margin: "120px" }} onFinish={submit}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
          style={{ marginTop: "100px" }}
        >
          <Input
            type="text"
            size="large"
            placeholder="Name"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            type="email"
            size="large"
            placeholder="Email"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          name="message"
          rules={[{ required: true, message: "Please write a message!" }]}
        >
          <Input.TextArea
            size="large"
            placeholder="Message"
            style={{ height: "100px" }}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Send
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SendMail;
