import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form, Table, Layout, Row, Col, Button, Spin } from "antd";
import { compose } from "redux";
import UserNames from "../components/UserNames";
import PaymentModes from "../components/PaymentModes";
import Amount from "../components/Amount";
import isEmpty from "lodash/isEmpty";
import { saveData } from "../redux/actions";

const transformData = data => {
  return data.map(item => ({ ...item, id: item._id }));
};

const Home = ({ name, form, store, data: propsData, saveData, isLoading }) => {
  const userNames = [
    { name: "USER - A" },
    { name: "USER - B" },
    { name: "USER - C" }
  ];
  const paymentModes = [
    { mode: "American Express" },
    { mode: "VISA" },
    { mode: "DBS PayLa" }
  ];
  const columns = [
    {
      title: "Transaction Id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName"
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      key: "paymentMode"
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount"
    }
  ];

  const handleClick = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        saveData(values);
        console.log("Received values of form: ", values);
      }
    });
  };

  const validateAmount = (rule, value, callback) => {
    if (value && value > 5000) {
      callback("Cannot proceed amount is greater than 5000");
    } else {
      callback();
    }
  };

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    store.dispatch({ type: "LOAD_DATA" });
    if (
      Object.keys(form.getFieldsValue()).every(
        key => form.getFieldsValue()[key] !== undefined
      )
    ) {
      setDisabled(false);
    }
  }, [form.getFieldsValue()]);

  const { getFieldDecorator } = form;

  let data = [];

  if (!isEmpty(propsData)) {
    data = transformData(propsData);
  }

  return (
    <div>
      <Form>
        <Row>
          <Col span={6}>
            <UserNames
              names={userNames}
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col span={6}>
            <PaymentModes
              modes={paymentModes}
              getFieldDecorator={getFieldDecorator}
            />
          </Col>
          <Col span={12}>
            <Amount
              getFieldDecorator={getFieldDecorator}
              validator={validateAmount}
              btnComponent={
                <Button
                  type="primary"
                  onClick={handleClick}
                  disabled={disabled}
                >
                  Transfer
                </Button>
              }
            />
          </Col>
        </Row>
      </Form>
      <Row>
        <Spin spinning={isEmpty(data) || isLoading}>
          <Table columns={columns} dataSource={data} />
        </Spin>
      </Row>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  saveData: data => dispatch(saveData(data))
});
const mapStateToProps = state => ({
  data: state.transfers,
  isLoading: state.isLoading
});

export default compose(
  Form.create(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);
