import React from "react";
import styled from "styled-components";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import bootstrapPlugin from "@fullcalendar/bootstrap";

const CalendarDiv = styled.div`
  width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  color: #5f5f5f;
  .fc-button-group > button {
    background-color: #f2d0d9;
    color: #5f5f5f;
    border: 0px solid #ffffff;
    font-size: 20px;
    &:hover {
      background-color: #5f5f5f;
      color: #f2d0d9;
    }
  }

  td, th {
    border: 2px solid #E5E5E5;
  }
  .fc-header-toolbar {
    margin: 10px 40px;
  }
  .fc-toolbar-title {
    font-size: 24px;
  }

  .fc-scrollgrid {
    font-size: 20px;
    color: #000000;
  }
  .fc-daygrid-day-top {
    flex-direction: row;
  }

  .fc .fc-daygrid-day.fc-day-today {
    background-color: #f2d0d9;
  }
  .fc-h-event {
    background-color: #f6f6f6;
    font-size: 20px;
    color: black;
    vertical-align: middle;
    border-radius: 5px;
    border: 0px solid rgba(255, 255, 255, 0);
    box-shadow: 0.5px 1px 2px 0.5px rgba(130, 130, 130, 0.3);
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

const events = [
  {
    id: 1,
    title: "event 1",
    type: "myPlanner",
    start: "2022-02-14T10:00:00",
    end: "2022-02-14T12:00:00",
  },
  {
    id: 2,
    title: "event 2",
    type: "groupPlanner",
    start: "2022-02-16T13:00:00",
    end: "2022-02-16T18:00:00",
  },
  { id: 3, title: "event 3", start: "2022-02-15", end: "2022-02-20" },
];

export default function Calendar(props) {
  //const segs = sliceEvents(props, true);

  return (
    <CalendarDiv>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          center: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        customButtons={
          {
            new: {
              text: "new",
              click: () => console.log("new event"),
            },
          }
        }
        locale={"ko"}
        events={events}
        eventColor={"#F6F6F6"}
        eventTextColor={"#5F5F5F"}
        eventDisplay="block"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={function (info) {
          alert(info.event.title);
        }}
        height={780}
        handleWindowResize
        expandRows={true}
      />
      {/* <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          bootstrapPlugin,
        ]}
        themeSystem="bootstrap"
        initialView="dayGridMonth"
        headerToolbar={{
          center: "dayGridMonth,timeGridWeek,timeGridDay new",
        }}
        weekends={true}
        navLinks={true} // can click day/week names to navigate views
        editable={true}
        buttonText={{
          today: "오늘",
          month: "month",
          week: "week",
          day: "day",
          list: "list",
        }}
        dayNames={[
          "일요일",
          "월요일",
          "화요일",
          "수요일",
          "목요일",
          "금요일",
          "토요일",
        ]}
        eventTextColor={"#5F5F5F"}
        eventDisplay="block"
        dayMaxEvents={true}
        events={[
          // ! 나중에 이벤트 목록 받아오면 넣어줄 곳
          { title: "event 1", date: "2022-01-01" },
          { title: "event 2", date: "2022-01-27" },
        ]}
        eventContent={renderEventContent}
        height={"auto"}
        handleWindowResize
        expandRows={true}
        eventClick={function (info) {
          alert(info.event.title);
        }}
      /> */}
    </CalendarDiv>
  );
}
