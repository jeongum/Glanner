import React from "react";
import styled from "styled-components";
import Calendar from "./FullCalendar/FullCalendarPage";

const MainPageContainer = styled.div`
  width: 100%;
  overflow: hidden;
  height: 100%;
  margin: auto;
  text-align: center;
`;

export default function MainPagePresenter({ state, eventList, handleEvent }) {
  return (
    <>
      <MainPageContainer>
        <Calendar eventList={eventList} handleEvent={handleEvent} />
      </MainPageContainer>
    </>
  );
}
