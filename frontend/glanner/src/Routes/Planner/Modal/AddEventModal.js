import { useState } from "react";

import styled from "styled-components";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EventModal from "./EventModal";

const AddEventModalDiv = styled.div``;

function AddEventsButton({ date, event }) {
  return (
    <button
      style={{
        width: "14px",
        height: "14px",
        border: "0",
        outline: "0",
        backgroundColor: "rgba(0,0,0,0)",
      }}
      onClick={event}
    >
      <FontAwesomeIcon
        icon={faPlus}
        className="plusButton"
        style={{
          color: "#FFFFFF",
          backgroundColor: "#959595",
          width: "16px",
          height: "16px",
          padding: "2px",
          textAlign: "center",
          borderRadius: "2px",
        }}
      />
    </button>
  );
}

// const StyledTextFieldElement = styledClass("textField")(
//   ({ theme }) => `
//   width: 100%;
//   font-size: 0.875rem;
//   font-family: "Noto Sans KR", sans-serif;
//   font-weight: 400;
//   line-height: 1.5;
//   color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
//   background: ${theme.palette.mode === "dark" ? grey[900] : "#FFFFFF"};
//   border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : "#E5E5E5"};
//   border-radius: 5px;
//   padding: 4px 12px;
//   height: 100px;
//   transition: all 150ms ease;

//   &:hover {
//     background: ${theme.palette.mode === "dark" ? "" : grey[100]};
//     border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
//   }

//   &:focus {
//     outline: 2px solid ${theme.palette.mode === "dark" ? blue[400] : blue[200]};
//     outline-offset: 2px;
//   }
// `
// );

export default function AddEventModal({ date, type, handleEvent, groupPlannerId }) {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AddEventModalDiv>
      <AddEventsButton date={date} event={handleOpen} />
      <EventModal
        handleClose={handleClose}
        open={open}
        specificEvent={null}
        type={type}
        handleEvent={handleEvent}
        groupPlannerId={groupPlannerId}
      />
    </AddEventModalDiv>
  );
}