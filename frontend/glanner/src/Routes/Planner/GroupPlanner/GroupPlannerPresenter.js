import React, { useState } from "react";

import styled from "styled-components";
import {
  faCircle,
  faAngleDown,
  faFilter,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Paper, Box, Typography } from "@mui/material";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import momentPlugin from "@fullcalendar/moment";

import monthName from "../../../store/monthName";
import AddEventModal from "../Modal/AddEventModal";
import { Link } from "react-router-dom";

const CalendarDiv = styled.div`
  width: 100%;
  height: 100%;
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
  thead,
  .fc-col-header-cell {
    height: 30px;
    text-align: left;
    line-height: 30px;
    color: #5f5f5f;
    padding-left: 10px;
  }

  .fc-daygrid-day-top {
    text-align: left;
    padding-left: 10px;
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
  .fc-h-event {
    background-color: #f6f6f6;
    height: 25px;
    color: #5f5f5f;
    border-radius: 5px;
    margin-bottom: 1px;
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

  .fc-day-today > div.fc-daygrid-day-frame {
    border-top: 5px solid #f2d0d9;
  }
  .fc-scroller-harness::webkit-scrollbar {
    display: none;
  }

  .fc-button {
    background-color: #ffffff;
    color: #8c7b80;
    font-size: 18px;
    line-height: 14px;
    border: 0px solid #8c7b80;
    height: 35px;
    &:hover {
      color: #ffffff;
      background-color: #8c7b8066;
      border: 0px solid #8c7b8066;
    }
  }
  .fc-updateBoard-button {
    border: 1px solid #8c7b80;
    border-radius: 8px;
    &:hover {
      color: #ffffff;
      background-color: #8c7b8066;
      border: 1px solid #8c7b8066;
    }
  }
  .fc-member-button {
    &:hover {
      background-color: rgba(0, 0, 0, 0);
    }
  }
`;

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
    start: "2022-02-04T13:00:00",
    end: "2022-02-04T18:00:00",
  },
  { id: 3, title: "event 3", start: "2022-02-15", end: "2022-02-20" },
  {
    id: 4,
    title: "event 4",
    type: "groupPlanner",
    start: "2022-02-04T13:00:00",
    end: "2022-02-04T18:00:00",
  },
  {
    id: 5,
    title: "event 4",
    type: "myPlanner",
    start: "2022-02-04T13:00:00",
    end: "2022-02-04T18:00:00",
  },
  {
    id: 6,
    title: "event 4",
    type: "groupPlanner",
    start: "2022-02-04T13:00:00",
    end: "2022-02-04T18:00:00",
  },
  {
    id: 7,
    title: "event 4",
    type: "groupPlanner",
    start: "2022-02-04T13:00:00",
    end: "2022-02-04T18:00:00",
  },
  {
    id: 8,
    title: "event 4",
    type: "myPlanner",
    start: "2022-02-04T13:00:00",
    end: "2022-02-04T18:00:00",
  },
  {
    id: 9,
    title: "event 4",
    type: "myPlanner",
    start: "2022-02-04T13:00:00",
    end: "2022-02-04T18:00:00",
  },
  {
    id: 10,
    title: "event 4",
    type: "groupPlanner",
    start: "2022-02-04T13:00:00",
    end: "2022-02-04T18:00:00",
  },
];

const intendedPlans = [
  {
    id: 1,
    title: "BFS, DFS",
    start: "2022-02-04T13:00:00",
    end: "2022-02-04T18:00:00",
    content: "백준 1234, 5678번 풀어오시길 바랍니다.",
  },
  {
    id: 2,
    title: "BFS, DFS",
    start: "2022-02-04T13:00:00",
    end: "2022-02-04T18:00:00",
    content: "백준 1234, 5678번 풀어오시길 바랍니다.",
  },
];

const latestWrite = [
  {
    id: 1,
    title: "이번주 스터디 시간 바꿀 수 있나요?",
    author: "이정음",
    writeDate: "2022.01.16 14:00",
    content: "일요일에 사정이 생겨, 참여하지 못할 것 같습니다.",
  },
  {
    id: 2,
    title: "완전탐색 요약 자료 입니다.",
    author: "김육조",
    writeDate: "2022.01.10 20:00",
    content:
      "완전탐색 스터디 내용 요약본 입니다. 참고하세요. 다른 내용은 더보기",
  },
];

function renderEventContent(events) {
  //console.log(events);
  return (
    <div style={{ textAlign: "left", marginLeft: "5px" }}>
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

const DdayDiv = styled.div`
  background-color: #8c7b80;
  color: #ffffff;
  font-size: 12px;
  border-radius: 5px;
  height: 50%;
  margin: auto 20px;
  padding: 0 7px;
`;

function Dday(date) {
  const diff =
    new Date(
      parseInt(date.date.substring(0, 4)),
      parseInt(date.date.substring(5, 7)),
      parseInt(date.date.substring(8, 10))
    ).getDate() - new Date().getDate();

  return <DdayDiv>D{diff < 0 ? "+" + diff * -1 : "-" + diff}</DdayDiv>;
}

export default function GroupPlannerPresenter() {
  const [date, setDate] = useState(new Date());
  const emptyPlans = [];
  const emptyWrite = [];

  for (var i = 0; i < 3 - intendedPlans.length; i++) {
    emptyPlans.push(i);
  }
  for (var i = 0; i < 3 - latestWrite.length; i++) {
    emptyWrite.push(i);
  }

  return (
    <CalendarDiv class="calendar-div">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, momentPlugin]}
        initialView="dayGridWeek"
        contentHeight={180}
        events={events}
        eventDisplay="block"
        titleFormat={function (date) {
          //console.log(date)
          return `${monthName[date.date.month]} Week ${
            Math.floor(date.date.day / 7) + 1
          }, ${date.date.year}`;
        }}
        headerToolbar={{
          start: "title gotoDate",
          center: "",
          end: "member filtering prev next updateBoard",
        }}
        customButtons={{
          updateBoard: {
            text: "모집하기",
            click: () => {
              alert("모집하기");
            },
          },
          gotoDate: {
            text: (
              <FontAwesomeIcon
                icon={faAngleDown}
                className="angleDown"
                style={{ width: 14 + "px", color: "#000000" }}
              />
            ),
            click: () => {
              setDate(new Date(2022, 1, 1));
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
          member: {
            text: (
              <div style={{ color: "#5F5F5F" }}>
                <FontAwesomeIcon
                  icon={faUser}
                  className="user"
                  style={{
                    width: 14 + "px",
                    color: "#959595",
                    marginRight: "5px",
                  }}
                />
                3
              </div>
            ),
          },
        }}
        initialDate={date}
        locale={"ko"}
        dayHeaderFormat={{
          weekday: "short",
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
                <AddEventModal date={date.date} />
              </div>
            </div>
          );
        }}
        eventContent={renderEventContent}
      ></FullCalendar>

      {/* 플래너 예정된 일정, 최근 글 파트 */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          marginTop: "20px",
          textAlign: "left",
          mx: "15px",
        }}
      >
        {/* 예정된 일정 파트 */}
        <Typography sx={{ mx: "7px" }}>예정된 일정</Typography>
        <Box
          sx={{
            width: "auto",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {intendedPlans.map(({ id, title, start, end, content }) => {
            // console.log("그룹 플래너 파트" + id);
            return (
              <Link to="">
                <Paper
                  elevation={0}
                  sx={{
                    width: "400px",
                    height: "180px",
                    my: "10px",
                    mx: "7px",
                    boxShadow: "0px 2px 4px 2px rgba(130, 130, 130, 0.3)",
                    py: "10px",
                    px: "20px",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{ color: "#262626", fontSize: "20px", display: "flex" }}
                  >
                    {title}
                    <Dday date={start} />
                  </Typography>
                  <Typography
                    sx={{ color: "#262626", fontSize: "18px", mt: "5px" }}
                  >
                    {String(start).substring(0, 10).replaceAll("-", ".")}{" "}
                    {String(start).substring(11, start.length)} -
                    {String(end).substring(11, end.length)}
                  </Typography>
                  <Typography
                    sx={{ color: "#5F5F5F", fontSize: "16px", mt: "10px" }}
                  >
                    {content.length > 30
                      ? String(content).substring(0, 30)
                      : content}
                  </Typography>
                  <Typography
                    sx={{ display: "flex", alignItems: "center", mt: "24px" }}
                  >
                    화상회의
                    <Typography sx={{ ml: "8px", color: "#929292" }}>
                      ON
                    </Typography>
                  </Typography>
                </Paper>
              </Link>
            );
          })}
          {emptyPlans.map(() => {
            return (
              <Paper
                elevation={0}
                sx={{
                  width: "400px",
                  height: "180px",
                  my: "10px",
                  mx: "7px",
                  boxShadow: "0px 2px 4px 2px rgba(130, 130, 130, 0.3)",
                  py: "10px",
                  px: "20px",
                  overflow: "hidden",
                  textAlign: "center",
                  color: "#C4C4C4",
                }}
              >
                <Typography>예정된 일정이 없습니다.</Typography>
              </Paper>
            );
          })}
        </Box>

        {/* 최근 글 부분 */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            marginTop: "20px",
            textAlign: "left",
          }}
        >
          <Typography sx={{ mx: "7px" }}>최근 글</Typography>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {latestWrite.map(({ id, title, author, writeDate, content }) => {
              return (
                <Link to="">
                  <Paper
                    elevation={0}
                    sx={{
                      width: "400px",
                      height: "180px",
                      my: "10px",
                      mx: "7px",
                      boxShadow: "0px 2px 4px 2px rgba(130, 130, 130, 0.3)",
                      py: "10px",
                      px: "20px",
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#262626",
                        fontSize: "20px",
                        display: "flex",
                        mb: "10px",
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#5F5F5F",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      작성자{" "}
                      <Typography
                        sx={{ ml: "5px", fontSize: "18px", color: "#262626" }}
                      >
                        {author}
                      </Typography>
                    </Typography>
                    <Typography
                      sx={{
                        color: "#5F5F5F",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      작성일{" "}
                      <Typography
                        sx={{ ml: "5px", fontSize: "18px", color: "#262626" }}
                      >
                        {writeDate}
                      </Typography>
                    </Typography>
                    <Typography
                      sx={{ color: "#262626", fontSize: "16px", mt: "20px" }}
                    >
                      {content.length > 30
                        ? String(content).substring(0, 30) + "..."
                        : content}
                    </Typography>
                  </Paper>
                </Link>
              );
            })}
            {emptyWrite.map(() => {
              return (
                <Paper
                  elevation={0}
                  sx={{
                    width: "400px",
                    height: "180px",
                    my: "10px",
                    mx: "7px",
                    boxShadow: "0px 2px 4px 2px rgba(130, 130, 130, 0.3)",
                    py: "10px",
                    px: "20px",
                    overflow: "hidden",
                    textAlign: "center",
                    color: "#C4C4C4",
                  }}
                >
                  <Typography>작성된 게시물이 없습니다.</Typography>
                </Paper>
              );
            })}
          </Box>
        </Box>
      </Box>
    </CalendarDiv>
  );
}
