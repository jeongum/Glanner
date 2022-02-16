import React, { useEffect } from "react";

import Helmet from "react-helmet";
import jwt_decode from "jwt-decode";

import MainPagePresenter from "./MainPagePresenter";
import axios from "axios";

export default function MainPageContainer() {
  const [eventList, setEventList] = React.useState([]);
  const [date, setDate] = React.useState();
  const bodyParams = {
    id: jwt_decode(localStorage.getItem("token")),
  };

  useEffect(() => {}, [date]);

  const fetchPEventList = (moveDay) => {
    if (moveDay !== undefined) {
      setDate(moveDay);
      console.log(date);
    } else {
      const nowDate = new Date(new Date().getTime())
        .toISOString()
        .substring(0, 8)+"01";
      setDate(nowDate);
    }
    axios
      .get(`/api/user/planner/${moveDay}`, bodyParams)
      .then((res) => {
        setEventList(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Helmet>
        <title>Glanner | 메인 플래너</title>
      </Helmet>
      <MainPagePresenter eventList={eventList} handleEvent={fetchPEventList} />
    </>
  );
}
