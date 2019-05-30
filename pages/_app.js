import React from "react";
import App, { Container } from "next/app";
import { Provider } from "react-redux";
import configuredStore from "../redux/store";
import WithReduxAndSaga from "../libs/with-redux-and-saga";
import "antd/dist/antd.less";
import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;

class NextApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Layout className="layout">
            <Header>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                style={{ lineHeight: "64px" }}
              >
                <Menu.Item key="1">Home</Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: "0 50px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
                <Component {...pageProps} store={store} />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              ©2019 Created by Gerard
            </Footer>
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default WithReduxAndSaga(configuredStore())(NextApp);
