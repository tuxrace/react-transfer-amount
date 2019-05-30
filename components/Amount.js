import React from "react";
import { Input, Form, Row, Col } from "antd";
import FormItem from "antd/lib/form/FormItem";

const Amount = ({ getFieldDecorator, btnComponent, validator }) => {
  const handleChange = e => {
    const regex = /^-?\d+\.?\d*$/;
    if (!regex.test(e.target.value)) {
      e.target.value = "";
    }
  };
  return (
    <>
      <Row>
        <Col span={18}>
          <Form.Item hasFeedback label="Amount">
            {getFieldDecorator("amount", {
              rules: [
                {
                  required: true,
                  message: "Amount is require in number format"
                },
                validator
              ]
            })(<Input placeholder="amount" onChange={handleChange} />)}
          </Form.Item>
          <small> *** Maximum Allowed amount is 5000 INR</small>
        </Col>
        <Col span={6}>
          <Form.Item label="Transfer">{btnComponent}</Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default Amount;
