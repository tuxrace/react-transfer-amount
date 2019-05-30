import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form, Table, Layout, Row, Col, Button, Spin } from "antd";
import { compose } from "redux";
import UserNames from "../components/UserNames";
import PaymentModes from "../components/PaymentModes";
import Amount from "../components/Amount";
import isEmpty from "lodash/isEmpty";
import { saveData } from "../redux/actions";
import LineChart from "../components/LineChart";

const transformData = data => {
  return data.map(item => ({ ...item, id: item._id }));
};

const transformChartData = data => {
  const groupedData = data.reduce((acc, cur) => {
    if (acc[cur.paymentMode]) {
      acc[cur.paymentMode] = {
        ...acc[cur.paymentMode],
        data: [...acc[cur.paymentMode].data, cur.amount]
      };
    } else {
      acc[cur.paymentMode] = { name: cur.paymentMode, data: [cur.amount] };
    }
    return acc;
  }, {});

  console.log(
    Object.keys(groupedData).map(key => ({
      name: key,
      data: groupedData[key].data,
      animation: false
    }))
  );
  return Object.keys(groupedData).map(key => ({
    name: key,
    data: groupedData[key].data
  }));
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
  }, [form]);

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
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
          />
        </Spin>
      </Row>
      <Row>
        <Spin spinning={isEmpty(data) || isLoading}>
          <LineChart chartData={transformChartData(data)} />
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
