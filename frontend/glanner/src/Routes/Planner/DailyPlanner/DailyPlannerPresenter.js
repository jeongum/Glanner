import React, { useState } from "react";

import styled from "styled-components";

import { faCircle, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";

import monthName from "../../../store/monthName";

const CalendarDiv = styled.div`
  width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  color: #5f5f5f;
  font-family: "Noto Sans KR", sans-serif;

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

  td,
  th {
    border: 1px solid #e5e5e5;
    background-color: #ffffff;
  }
  .fc-header-toolbar {
    margin: 10px 40px;
  }
  .fc-header-toolbar {
    margin: 0 25px;
    margin-bottom: 0 !important;
    height: 50px;
  }

  .fc-toolbar-title {
    font-size: 20px;
    color: #000000;
  }
  .fc-toolbar-chunk {
    display: flex;
    justify-content: center;
    align-items: center;
    .fc-gotoDate-button {
      margin: 0 !important;
    }
  }

  .fc-scrollgrid {
    font-size: 20px;
    color: #000000;
  }
  .fc-daygrid-day-top {
    flex-direction: row;
  }

  .fc-today-button {
    background-color: #f2d0d9;
    border: 0px solid #f2d0d9;
    height: 50px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .fc .fc-daygrid-day.fc-day-today {
    background-color: #e5e5e5;
  }
  .fc-day-today > div > div.fc-daygrid-day-top {
    border-top: 5px solid #f2d0d9;
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
  .fc-event-main {
    overflow: scroll;
  }

  .fc-button {
    background-color: #ffffff;
    color: #8c7b80;
    font-size: 18px;
    line-height: 14px;
    border: 0px solid #8c7b80;
    border-radius: 8px;
    height: 35px;
    &:hover {
      color: #ffffff;
      background-color: #8c7b8066;
      border: 0px solid #8c7b8066;
    }
  }
`;

const HeaderDiv = styled.div`
  display: flex;
`;

const TotalCountDiv = styled.div`
  margin: 0 30px;
  font-size: 18px;
  color: #5f5f5f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EachCountDiv = styled.div`
  margin: 0 30px;
  font-size: 16px;
  color: #5f5f5f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const events = [
  {
    id: 1,
    title: "독서모임",
    type: "myPlanner",
    content: "1월 신간 서적 리뷰",
    start: "2022-02-08T10:00:00",
    end: "2022-02-08T12:00:00",
  },
  {
    id: 2,
    title: "event 2",
    type: "groupPlanner",
    content: "UI 마무리 얼른 해야....",
    start: "2022-02-08T13:00:00",
    end: "2022-02-08T18:00:00",
  },
  {
    id: 3,
    title: "UI 마무리",
    type: "myPlanner",
    content: "UI 마무리 얼른 해야....",
    start: "2022-02-08T13:00:00",
    end: "2022-02-08T18:00:00",
  },
  {
    id: 4,
    title: "event 3",
    type: "groupPlanner",
    content: "UI 마무리 얼른 해야....",
    start: "2022-02-08T13:00:00",
    end: "2022-02-08T18:00:00",
  },
];

function renderEventContent(events) {
  console.log(events);
  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        textAlign: "center",
        borderTop: `${
          events.event._def.extendedProps.type === "groupPlanner"
            ? "5px solid #ABC3FF"
            : "5px solid #FFABAB"
        }`,
      }}
    >
      <div
        class="event_title"
        style={{
          marginBottom: "14px",
          fontSize: "20px",
        }}
      >
        {events.event._def.title}
      </div>
      <div
        class="event_content"
        style={{
          fontSize: "20px",
          color: "#000000",
          marginBottom: "10px",
        }}
      >
        {events.event._def.extendedProps.content}
      </div>
      <div
        class="event_time"
        style={{
          fontSize: "18px",
          color: "#5F5F5F",
        }}
      >
        {events.event._instance.range.start.getMonth() + 1}.
        {events.event._instance.range.start.getDate()}{" "}
        {String(events.timeText).substring(3, 8)}~
        {String(events.timeText).substring(13, events.timeText.length)}
      </div>
    </div>
  );
}

export default function DailyPlannerPresenter(plannerEvent) {
  const [myCount, setMyCount] = useState(2);
  const [groupCount, setGroupCount] = useState(2);

  return (
    <CalendarDiv>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridDay"
        headerToolbar={{
          start: "title",
          center: "",
          end: "prev next",
        }}
        locale={"ko"}
        height={780}
        titleFormat={function (date) {
          return (
            <HeaderDiv>
              {monthName[date.date.month]} {date.date.day}, {date.date.year}
              <button
                style={{
                  backgroundColor: "rgba(0,0,0,0)",
                  border: "0",
                }}
              >
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className="angleDown"
                  style={{ fontSize: "18px", color: "#000000", marginLeft: "6px" }}
                />
              </button>
              <TotalCountDiv>
                총 일정{" "}
                <p
                  style={{
                    fontSize: "20px",
                    color: "#8C7B80",
                    marginLeft: "10px",
                  }}
                >
                  {myCount + groupCount}개
                </p>
              </TotalCountDiv>
              <EachCountDiv>
                <FontAwesomeIcon
                  icon={faCircle}
                  className="circle"
                  style={{
                    width: 14 + "px",
                    color: "#FFABAB",
                    marginRight: "5px",
                  }}
                />
                개인 일정
                <p
                  style={{
                    color: "#8C7B80",
                    marginLeft: "5px",
                  }}
                >
                  {myCount}개
                </p>
                <FontAwesomeIcon
                  icon={faCircle}
                  className="circle"
                  style={{
                    width: 14 + "px",
                    color: "#ABC3FF",
                    marginLeft: "30px",
                    marginRight: "5px",
                  }}
                />
                그룹 일정
                <p
                  style={{
                    color: "#8C7B80",
                    marginLeft: "5px",
                  }}
                >
                  {groupCount}개
                </p>
              </EachCountDiv>
            </HeaderDiv>
          );
        }}
        dayHeaders={false}
        scrollTime="00:00"
        allDaySlot={false}
        slotDuration={"01:00:00"}
        slotLabelContent={function (date) {
          // console.log(date);
          return (
            <div
              style={{
                width: "180px",
                display: "flex",
                justifyContent: "center",
                margin: "10px 0",
                fontSize: "24px",
                color: "#5F5F5F",
              }}
            >
              {String(date.date).substring(16, 21)}
            </div>
          );
        }}
        customButtons={{
          toggle: {
            text: "",
            click: {},
          },
        }}
        events={events}
        eventColor={"#F6F6F6"}
        eventTextColor={"#5F5F5F"}
        eventDisplay="block"
        eventOverlap="false"
        eventContent={renderEventContent}
      ></FullCalendar>
    </CalendarDiv>
  );
}
