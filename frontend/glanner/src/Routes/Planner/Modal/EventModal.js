import { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { Box, Typography, Modal, Grid } from "@mui/material";
import { InputUnstyled, TextareaAutosize } from "@mui/base";
import { styled as styledClass } from "@mui/system";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ReactComponent as XMark } from "../../../assets/xmark-solid.svg";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 1300,
  minWidth: 800,
  bgcolor: "background.paper",
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

const formTextStyle = {
  fontSize: "16px",
  color: "#5F5F5F",
};

const reserveRadioStyle = {
  fontSize: "16px",
  color: "#262626",
  lineHeight: 2,
  ml: 1,
};

export default function EventModal({
  handleClose,
  open,
  specificEvent,
  type,
  groupPlannerId,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    content: "",
    startDate: "",
    endDate: "",
    alarmDate: "",
  });

  useEffect(() => {
    if (specificEvent !== null) {
      setData(specificEvent);
    }
  }, [data, specificEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.title === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    if (data.content === "") {
      alert("내용을 입력해주세요.");
      return;
    }
    if (data.startDate === "") {
      alert("시작일을 입력해주세요.");
      return;
    }
    if (data.endDate === "") {
      alert("마감일을 입력해주세요.");
      return;
    }

    // 기존 이벤트 수정
    if (specificEvent != null) {
      if (type === "groupPlanner") {
        axios
          .put("/api/glanner/work", data)
          .then((res) => {
            alert("수정 성공!");
            setData({});
            console.log(res.data);
            navigate(`/group/${groupPlannerId}`);
          })
          .catch((err) => {
            console.log(err);
            alert("작성 실패!");
          });
      } else if (type === "myPlanner") {
        axios
          .put("", data)
          .then((res) => {
            alert("수정 성공!");
            console.log(res.data);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
            alert("작성 실패!");
          });
      }
    } else if(specificEvent == null) {
      // 새로운 일정 추가
      if (type === "groupPlanner") {
        axios
          .post("/api/glanner/work", data)
          .then((res) => {
            alert("작성 성공!");
            setData({});
            console.log(res.data);
            navigate(`/group/${groupPlannerId}`);
          })
          .catch((err) => {
            console.log(err);
            alert("작성 실패!");
          });
      } else if (type === "myPlanner") {
        axios
          .post("/api/user/planner/work", data)
          .then((res) => {
            alert("작성 성공!");
            console.log(res.data);
            navigate("/");
          })
          .catch((err) => {
            console.log(err, data);
            alert("작성 실패!");
          });
      }
    }
  };

  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  return (
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
            <h3 style={{ lineHeight: "27px" }}>
              {type === "myPlanner" ? "개인" : "그룹"}{" "}
              {specificEvent ? "일정 수정하기" : "일정 추가하기"}
            </h3>
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
          <form noValidate onSubmit={handleSubmit}>
            <input
              type="hidden"
              value={data.workId ? data.workId : data.glannerWorkId}
              id={data.workId ? "workId" : "glannerWorkId"}
            />
            <Grid container sx={{ mb: 2 }}>
              <Grid item xs={3} sx={{ textAlign: "left" }}>
                <Typography className="title" sx={formTextStyle}>
                  제목
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <InputUnstyled
                  components={{ Input: StyledInputElement }}
                  id="title"
                  onChange={(e) => handle(e)}
                  value={data.title}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ mb: 2 }}>
              <Grid item xs={3} sx={{ textAlign: "left" }}>
                <Typography className="start" sx={formTextStyle}>
                  시작일
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <InputUnstyled
                  components={{ Input: StyledInputElement }}
                  id="startDate"
                  onChange={(e) => handle(e)}
                  value={data.startDate}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ mb: 2 }}>
              <Grid item xs={3} sx={{ textAlign: "left" }}>
                <Typography className="end" sx={formTextStyle}>
                  마감일
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <InputUnstyled
                  components={{ Input: StyledInputElement }}
                  id="endDate"
                  onChange={(e) => handle(e)}
                  value={data.endDate}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ mb: 2 }}>
              <Grid item xs={3} sx={{ textAlign: "left" }}>
                <Typography className="content" sx={formTextStyle}>
                  설명
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextareaAutosize
                  maxRows={3}
                  minRows={3}
                  id="content"
                  style={{
                    width: "100%",
                    fontSize: "16px",
                    color: "#959595",
                    border: "1px solid #E5E5E5",
                    borderRadius: "8px",
                    boxShadow: "0.5px 1px 2px 0.5px rgba(130, 130, 130, 0.3)",
                  }}
                  onChange={(e) => {
                    handle(e);
                  }}
                  value={data.content}
                />
              </Grid>
            </Grid>
            {/* <Grid container sx={{ mb: 2 }}>
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
              </Grid> */}
            <Grid container sx={{ mb: 2 }}>
              <Grid item xs={3} sx={{ textAlign: "left" }}>
                <Typography className="alarm" sx={formTextStyle}>
                  알림
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <InputUnstyled
                  id="alarmDate"
                  components={{ Input: StyledInputElement }}
                  onChange={(e) => handle(e)}
                  value={data.alarmDate}
                />
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
            <ModalFooterDiv>
              <SubmitButton type="submit">OK</SubmitButton>
            </ModalFooterDiv>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}
