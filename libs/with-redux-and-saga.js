import React from "react";
import App from "next/app";

const WithReduxAndSaga = store => WrappedComponent => {
  return class extends App {
    static async getInitialProps(context) {
      context.ctx.store = store;

      let appProps = {};

      if (typeof WithReduxAndSaga.getInitialProps === "function") {
        appProps = await WithReduxAndSaga.getInitialProps(context);
      }

      return {
        ...appProps
      };
    }

    render() {
      return <WrappedComponent {...this.props} store={store} />;
    }
  };
};

export default WithReduxAndSaga;
