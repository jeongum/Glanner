import React from "react";

import Helmet from "react-helmet";

import GroupPlannerPresenter from "./GroupPlannerPresenter";
import axios from "axios";

export default function GroupPlannerContainer() {
  const [eventList, setEventList] = React.useState(null);
  const [usedId, setUserId] = React.useState("test2@naver.com");

  // console.log(eventList);
  return (
    <>
      <Helmet>
        <title>Glanner | 그룹 플래너</title>
      </Helmet>
      <GroupPlannerPresenter />
    </>
  );
}
