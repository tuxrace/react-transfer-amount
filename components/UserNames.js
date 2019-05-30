import React from "react";
import { Radio, Form } from "antd";

const UserNames = ({ names, getFieldDecorator }) => {
  return (
    <Form.Item label="User Names">
      {getFieldDecorator("userName", {
        rules: [
          {
            required: true,
            message: "User Names Modes is required"
          }
        ]
      })(
        <Radio.Group buttonStyle="solid">
          {names.map(item => (
            <>
              <Radio.Button value={item.name}>{item.name}</Radio.Button>
              <br />
            </>
          ))}
        </Radio.Group>
      )}
    </Form.Item>
  );
};

export default UserNames;
