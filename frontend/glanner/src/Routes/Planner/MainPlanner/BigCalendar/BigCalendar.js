import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import * as dates from "../../../../utils/dates";
import events from "../../../../store/events";

let allViews = Object.keys(Views).map((k) => Views[k]);
const localizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });

let Basic = ({ localizer }) => (
  <Calendar
    events={events}
    views={allViews}
    step={60}
    showMultiDayTimes
    max={dates.add(dates.endOf(new Date(2015, 17, 1), "day"), -1, "hours")}
    defaultDate={new Date(2015, 3, 1)}
    components={{
      timeSlotWrapper: ColoredDateCellWrapper,
    }}
    localizer={localizer}
  />
);

export default function BigCalendar() {
  return (
    <>
      <Basic localizer={localizer} />
    </>
  );
}
