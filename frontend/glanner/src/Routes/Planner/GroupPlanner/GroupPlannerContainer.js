import React from "react";

import Helmet from "react-helmet";

import GroupPlannerPresenter from "./GroupPlannerPresenter";
import { findGlannerList } from "../../../Api/api";

export default function GroupPlannerContainer() {
  const [eventList, setEventList] = React.useState(null);

  const fetchEvent = async () => {
    
  }

  console.log(eventList);
  return (
    <>
      <Helmet>
        <title>Glanner | 그룹 플래너</title>
      </Helmet>
      <GroupPlannerPresenter />
    </>
  );
}
