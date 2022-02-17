import React, { useState, useRef, useEffect } from "react";

import styled from "styled-components";
import {
  faCircle,
  faAngleDown,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// import DatePicker from "react-date-picker";

import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";

import monthName from "../../../../store/monthName";
import { Typography } from "@mui/material";

import AddEventModal from "../../Modal/AddEventModal";
import EventModal from "../../Modal/EventModal";

const CalendarDiv = styled.div`
  width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  color: #5f5f5f;
  font-size: 20px;
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
    font-size: 16px;
    color: #000000;
  }
  thead {
    height: 30px;
    line-height: 30px;
    color: #5f5f5f;
    .fc-scrollgrid-sync-inner {
      text-align: left;
      padding-left: 10px;
    }
  }
  .fc-daygrid-day-top {
    text-align: left;
    padding-left: 10px;
  }

  .fc-daygrid-day-top {
    flex-direction: row;
  }
  .fc-daygrid-day-number {
    width: 100%;
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

  .fc-scroller-harness::webkit-scrollbar {
    display: none;
  }

  .fc-daygrid-day-events {
    margin: 0 10px;
    margin-bottom: 5px;
  }
  .fc-h-event {
    background-color: #f6f6f6;
    height: 25px;
    color: #5f5f5f;
    border-radius: 5px;
    border: 0px solid rgba(255, 255, 255, 0);
    box-shadow: 0.5px 1px 2px 0.5px rgba(130, 130, 130, 0.3);
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
  .fc-event-main {
    color: #5f5f5f;
    font-size: 14px;
  }
  .fc-daygrid-block-event {
    padding: 5px 10px;
  }

  .fc-day-today > div > div.fc-daygrid-day-top {
    border-top: 5px solid #f2d0d9;
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

function renderEventContent(events) {
  //console.log(events);
  return (
    <div>
      {events.event._def.extendedProps.type === "groupPlanner" ? (
        <FontAwesomeIcon
          icon={faCircle}
          className="circle"
          style={{ width: 14 + "px", color: "#ABC3FF" }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faCircle}
          className="circle"
          style={{ width: 14 + "px", color: "#FFABAB" }}
        />
      )}
      {"  "}
      {events.event._def.title}
    </div>
  );
}

export default function Calendar({ eventList, handleEvent }) {
  const [date, setDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 2)
      .toISOString()
      .substring(0, 10)
  );
  const [specificEvent, setSpecificEvent] = useState({});
  const [eventId, setEventId] = useState();

  const [pickerOpen, setPickerOpen] = useState(false);
  const handlePickerOpen = () => setPickerOpen(true);
  const handlePickerClose = () => setPickerOpen(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const calendarRef = useRef();

  useEffect(() => {}, [eventList, date]);

  return (
    <CalendarDiv>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        ref={calendarRef}
        headerToolbar={{
          start: "title gotoDate",
          center: "prevYear prev next nextYear",
          end: "filtering today",
        }}
        customButtons={{
          gotoDate: {
            text: (
              <FontAwesomeIcon
                icon={faAngleDown}
                className="angleDown"
                style={{ width: 14 + "px", color: "#000000" }}
              />
            ),
            click: () => {
              if (pickerOpen) {
                handlePickerClose();
              } else {
                handlePickerOpen();
              }
              console.log(pickerOpen);
            },
          },
          filtering: {
            text: (
              <div style={{ color: "#5F5F5F" }}>
                <FontAwesomeIcon
                  icon={faFilter}
                  className="filter"
                  style={{
                    width: 14 + "px",
                    color: "#5F5F5F",
                    marginRight: "5px",
                  }}
                />
                Filter
              </div>
            ),
            click: () => {},
          },
        }}
        locale={"ko"}
        initialDate={date}
        dayCellDidMount={(date) => {
          var newDay = new Date(date.date);
          console.log(newDay.toISOString().substring(0, 10));
          // console.log(eventList);
          if (newDay.toISOString().substring(8, 10) === "15") {
            setDate(newDay.toISOString().substring(0, 8)+"01");
            handleEvent(newDay.toISOString().substring(0, 8)+"01");
          }
        }}
        events={eventList}
        eventColor={"#F6F6F6"}
        eventTextColor={"#5F5F5F"}
        eventDisplay="block"
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => {
          handleModalOpen();
          console.log(e.event);
          const newEvent = {
            title: e.event.title,
            startDate: String(e.event.startStr)
              .replaceAll("T", " ")
              .substring(0, 16),
            endDate: String(e.event.endStr)
              .replaceAll("T", " ")
              .substring(0, 16),
            content: e.event._def.extendedProps.content,
            alarmDate: "",
          };
          setSpecificEvent(newEvent);
          setEventId(e.event._def.extendedProps.workId);
        }}
        contentHeight={780}
        expandRows={false}
        titleFormat={function (date) {
          //console.log(date)
          return (
            <div>
              <Typography
                style={{ fontSize: "20px", fontFamily: "Noto Sans KR" }}
              >
                {date.date.year} {monthName[date.date.month]}{" "}
                {new Date().getDate()}
              </Typography>
            </div>
          );
        }}
        dayCellContent={function (date) {
          return (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              <div style={{ float: "left", width: "50%" }}>
                {String(date.date).substring(8, 10)}
              </div>
              <div
                style={{
                  width: "50%",
                  textAlign: "right",
                  marginRight: "20px",
                }}
              >
                <AddEventModal
                  date={date.date}
                  type={"myPlanner"}
                  handleEvent={handleEvent}
                />
              </div>
            </div>
          );
        }}
        eventContent={renderEventContent}
        editable={true}
      />
      <EventModal
        open={modalOpen}
        handleClose={handleModalClose}
        specificEvent={specificEvent}
        eventId={eventId}
        type={"myPlanner"}
      />
    </CalendarDiv>
  );
}
