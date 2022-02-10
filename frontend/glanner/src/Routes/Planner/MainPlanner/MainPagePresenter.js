import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import BigCalendar from "./BigCalendar/BigCalendar";
import Calendar from "./FullCalendar/FullCalendarPage";

const MainPageContainer = styled.div`
  width: 100%;
  overflow: hidden;
  height: 100%;
  margin: auto;
  text-align: center;
`;

export default function MainPagePresenter() {
  return (
    <>
      <Helmet>
        <title>Glanner | 메인 플래너</title>
      </Helmet>
      <MainPageContainer>
        <Calendar />
      </MainPageContainer>
    </>
  );
}
