import * as React from "react";

import styled from "styled-components";

import { Box, Typography, Modal, Grid } from "@mui/material";
import { InputUnstyled, TextareaAutosize } from "@mui/base";
import { styled as styledClass } from "@mui/system";

import { ReactComponent as XMark } from "../../../assets/xmark-solid.svg";
import { faPlus, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddEventModalDiv = styled.div`
`;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 1300,
  minWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  px: 1.5,
  py: 2,
  borderRadius: 2,
  border: "0px solid #FFFFFF",
  fontFamily: "Noto Sans KR, sans-serif",
};

const ModalHeaderDiv = styled.div`
  width: 100%;
  border-bottom: 2px solid #e5e5e5;
  display: flex;
  padding-bottom: 5px;
`;

const ModalFooterDiv = styled.div`
  width: 100%;
  text-align: right;
`;

const SubmitButton = styled.button`
  background-color: #8c7b80;
  color: #ffffff;
  font-size: 18px;
  line-height: 14px;
  border: 0px solid #8c7b80;
  border-radius: 6px;
  height: 35px;
  width: 55px;
  &:hover {
    color: #ffffff;
    background-color: #8c7b8066;
    border: 0px solid #8c7b8066;
  }
`;

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

const blue = {
  200: "#80BFFF",
  400: "#3399FF",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledInputElement = styledClass("input")(
  ({ theme }) => `
  width: 100%;
  font-size: 0.875rem;
  font-family: "Noto Sans KR", sans-serif;;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#FFFFFF"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : "#E5E5E5"};
  border-radius: 8px;
  padding: 4px 12px;
  transition: all 150ms ease;
  box-shadow: 0.5px 1px 2px 0.5px rgba(130, 130, 130, 0.3);

  &:hover {
    background: ${theme.palette.mode === "dark" ? "" : grey[100]};
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:focus {
    outline: 2px solid ${theme.palette.mode === "dark" ? blue[400] : blue[200]};
    outline-offset: 2px;
  }
`
);

const StyledTextFieldElement = styledClass("textField")(
  ({ theme }) => `
  width: 100%;
  font-size: 0.875rem;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#FFFFFF"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : "#E5E5E5"};
  border-radius: 5px;
  padding: 4px 12px;
  height: 100px;
  transition: all 150ms ease;

  &:hover {
    background: ${theme.palette.mode === "dark" ? "" : grey[100]};
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:focus {
    outline: 2px solid ${theme.palette.mode === "dark" ? blue[400] : blue[200]};
    outline-offset: 2px;
  }
`
);

const formTextStyle = {
  fontSize: "16px",
  color: "#5F5F5F",
};

const reserveRadioStyle = {
  fontSize: "16px",
  color: "#262626",
  lineHeight: 2,
  ml: 1
}

export default function AddEventModal(date) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AddEventModalDiv>
      <AddEventsButton date={date} event={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <ModalHeaderDiv>
            <div
              style={{
                width: "50%",
                textAlign: "left",
                color: "#262626",
                display: "flex",
                fontSize: "22px",
              }}
            >
              <FontAwesomeIcon
                icon={faCalendarPlus}
                className="calendarPlus"
                style={{
                  color: "#8C7B80",
                  fontSize: "25px",
                  padding: "2px",
                  margin: "3",
                  textAlign: "center",
                  borderRadius: "2px",
                }}
              />
              <h3 style={{ lineHeight: "27px" }}>일정 추가하기</h3>
            </div>
            <div style={{ width: "50%", textAlign: "right" }}>
              <button
                style={{
                  border: "0",
                  outline: "0",
                  backgroundColor: "rgba(0,0,0,0)",
                }}
                onClick={handleClose}
              >
                <XMark
                  style={{
                    color: "#959595",
                    fontSize: "25px",
                    padding: "2px",
                    textAlign: "center",
                  }}
                />
              </button>
            </div>
          </ModalHeaderDiv>

          {/* 폼 작성 부분 */}
          <Box
            sx={{
              color: "#5F5F5F",
              pt: 3,
              px: 4,
            }}
          >
            <form>
              <Grid container sx={{ mb: 2 }}>
                <Grid item xs={3} sx={{ textAlign: "left" }}>
                  <Typography className="title" sx={formTextStyle}>
                    제목
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <InputUnstyled components={{ Input: StyledInputElement }} />
                </Grid>
              </Grid>
              <Grid container sx={{ mb: 2 }}>
                <Grid item xs={3} sx={{ textAlign: "left" }}>
                  <Typography className="start" sx={formTextStyle}>
                    시작일
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <InputUnstyled components={{ Input: StyledInputElement }} />
                </Grid>
              </Grid>
              <Grid container sx={{ mb: 2 }}>
                <Grid item xs={3} sx={{ textAlign: "left" }}>
                  <Typography className="end" sx={formTextStyle}>
                    마감일
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <InputUnstyled components={{ Input: StyledInputElement }} />
                </Grid>
              </Grid>
              <Grid container sx={{ mb: 2 }}>
                <Grid item xs={3} sx={{ textAlign: "left" }}>
                  <Typography className="content" sx={formTextStyle}>
                    설명
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextareaAutosize maxRows={3} minRows={3} style={{
                    width: "100%",
                    fontSize: "16px",
                    color: "#959595",
                    border: "1px solid #E5E5E5",
                    borderRadius: "8px",
                    boxShadow: "0.5px 1px 2px 0.5px rgba(130, 130, 130, 0.3)"
                  }} />
                </Grid>
              </Grid>
              <Grid container sx={{ mb: 2 }}>
                <Grid item xs={3} sx={{ textAlign: "left" }}>
                  <Typography className="category" sx={formTextStyle}>
                    카테고리
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <InputUnstyled
                    type="select"
                    components={{ Input: StyledInputElement }}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ mb: 2 }}>
                <Grid item xs={3} sx={{ textAlign: "left" }}>
                  <Typography className="alarm" sx={formTextStyle}>
                    알림
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <InputUnstyled components={{ Input: StyledInputElement }} />
                </Grid>
              </Grid>
              <Grid container sx={{ mb: 2 }}>
                <Grid item xs={3} sx={{ textAlign: "left" }}>
                  <Typography className="alarm" sx={formTextStyle}>
                    화상회의 예약
                  </Typography>
                </Grid>
                <Grid item xs={9} sx={{ display: "flex" }}>
                  <Grid item xs={3} sx={{ display: "flex" }}>
                    <InputUnstyled
                      type="radio"
                      id="yes"
                      name="conferenceReserve"
                    />
                    <Typography sx={reserveRadioStyle}>YES</Typography>
                  </Grid>
                  <Grid item xs={3} sx={{ display: "flex" }}>
                    <InputUnstyled
                      type="radio"
                      id="no"
                      name="conferenceReserve"
                    />
                    <Typography sx={reserveRadioStyle}>NO</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>
          {/* 전송 버튼과 같이 푸터 부분 */}
          <ModalFooterDiv>
            <SubmitButton>OK</SubmitButton>
          </ModalFooterDiv>
        </Box>
      </Modal>
    </AddEventModalDiv>
  );
}
