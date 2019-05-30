import React from "react";
import { Radio, Form } from "antd";

const PaymentModes = ({ modes, getFieldDecorator }) => {
  return (
    <Form.Item label="Payment Modes">
      {getFieldDecorator("paymentMode", {
        rules: [
          {
            required: true,
            message: "Payment Mode is required"
          }
        ]
      })(
        <Radio.Group buttonStyle="solid">
          {modes.map(item => (
            <div key={item.mode}>
              <Radio value={item.mode}>{item.mode}</Radio>
              <br />
            </div>
          ))}
        </Radio.Group>
      )}
    </Form.Item>
  );
};

export default PaymentModes;
