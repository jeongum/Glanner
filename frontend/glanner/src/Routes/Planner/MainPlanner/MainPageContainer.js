import React from "react";
import Helmet from "react-helmet";
import MainPagePresenter from "./MainPagePresenter";

export default class extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Glanner | 메인 플래너</title>
        </Helmet>
        <MainPagePresenter />
      </>
    );
  }
}
