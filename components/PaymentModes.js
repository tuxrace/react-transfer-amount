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
            <>
              <Radio value={item.mode}>{item.mode}</Radio>
              <br />
            </>
          ))}
        </Radio.Group>
      )}
    </Form.Item>
  );
};

export default PaymentModes;
