import React, { useEffect, useState } from "react";

import Helmet from "react-helmet";

import GroupPlannerPresenter from "./GroupPlannerPresenter";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function GroupPlannerContainer() {
  const [eventList, setEventList] = useState([
    {
      workId: 1,
      content: "알고리즘 스터디",
      end: "2022-02-14T17:00:00",
      start: "2022-02-14T15:00:00",
      title: "알고리즘 스터디",
    },
    {
      workId: 2,
      content: "과학 스터디",
      start: "2022-02-14T12:30",
      end: "2022-02-14T15:35",
      title: "과학 스터디",
    },
  ]);
  const groupPlannerId = useParams();
  const [date, setDate] = useState(
    new Date(new Date().getTime()).toISOString().substring(0, 10)
  );

  const [pickerOpen, setPickerOpen] = useState(false);
  const handlePickerOpen = () => setPickerOpen(true);
  const handlePickerClose = () => setPickerOpen(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const fetchEventList = (date) => {
    axios
      .get(`/api/glanner/${groupPlannerId.id}/${date}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEventList(date);
  })

  return (
    <>
      <Helmet>
        <title>Glanner | 그룹 플래너</title>
      </Helmet>
      <GroupPlannerPresenter
        groupPlannerId={groupPlannerId.id}
        eventList={eventList}
        handleModalOpen={handleModalOpen}
        handleModalClose={handleModalClose}
        modalOpen={modalOpen}
      />
    </>
  );
}
