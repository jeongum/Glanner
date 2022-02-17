import React from "react";
import { useParams } from "react-router";

import styled from "styled-components";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Paper,
  styled as St,
  ListItemText,
  ListItem,
  List,
  Input,
  Grid,
} from "@mui/material";

const groupSearchList = [];

const latestNoticeList = [
  {
    id: 1,
    title: "공지 1",
    writer: "관리자",
    date: "22.01.15",
  },
];
const boardList = [
  {
    id: 1,
    title: "예시 1",
    writer: "관리자",
    date: "22.01.20",
  },
  {
    id: 2,
    title: "예시 2",
    writer: "관리자",
    date: "22.01.20",
  },
  {
    id: 3,
    title: "예시 3",
    writer: "관리자",
    date: "22.01.20",
  },
  {
    id: 4,
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    writer: "관리자",
    date: "22.01.20",
  },
];

const WriteButton = St(Button)({
  height: "30px",
  border: "1px solid #8C7B80",
  color: "#8C7B80",
  borderRadius: "5px",
  "&:hover": {
    color: "#FFFFFF",
    backgroundColor: "#8C7B80",
    borderColor: "#8C7B80",
    boxShadow: "none",
  },
});

const BoardDiv = styled.div`
  font-family: 'Noto Sans KR' !important;
`;

export default function BoardPageContainer() {
  const { type } = useParams();
  return (
    <BoardDiv>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          textAlign: "right",
          width: "95%",
          minHeight: "100%",
          m: 0,
          fontFamily: "Noto Sans KR",
        }}
      >
        <FormControl sx={{ m: 1, width: "25ch" }} size="small">
          <InputLabel htmlFor="search-board">이름, 제목</InputLabel>
          <Input
            id="search-board"
            variant="filled"
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="search-button" onClick={""} edge="end">
                  <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Box>
      {type == "group" ? (
        <>
          <Box
            sx={{ textAlign: "center", minHeight: "100%", maxHeight: "100%" }}
          >
            <List
              sx={{
                width: "90%",
                bgcolor: "background.paper",
                margin: "0 auto",
                borderTop: "2px solid #e5e5e5",
                borderBottom: "2px solid #e5e5e5",
                minHeight: "100%",
              }}
            >
              {groupSearchList.length == 0 ? (
                <>
                  <ListItem />
                  <ListItem
                    sx={{
                      textAlign: "center",
                      margin: "0 auto",
                      color: "#262626",
                    }}
                  >
                    <ListItemText>게시판에 글이 없습니다.</ListItemText>
                  </ListItem>
                  <ListItem />
                </>
              ) : (
                <></>
              )}
            </List>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ textAlign: "center", minHeight: "100%" }}>
            <List
              sx={{
                width: "90%",
                bgcolor: "background.paper",
                margin: "0 auto",
                minHeight: "100%",
                borderTop: "2px solid #e5e5e5",
              }}
            >
              {latestNoticeList.map(({ id, title, writer, date }) => (
                <Paper
                  sx={{ mb: 1, width: "100%", backgroundColor: "#F9F9F9" }}
                >
                  <ListItem
                    key={id}
                    disableGutters
                    sx={{
                      height: "35px",
                      textAlign: "center",
                      color: "#DB1111",
                    }}
                  >
                    <ListItemText primary={"[공지]"} />
                    <ListItemText>{title}</ListItemText>
                    <ListItemText>{writer}</ListItemText>
                    <ListItemText>{date}</ListItemText>
                  </ListItem>
                </Paper>
              ))}
            </List>
            <List
              sx={{
                width: "90%",
                bgcolor: "background.paper",
                margin: "0 auto",
                borderBottom: "2px solid #E5E5E5",
                minHeight: "100%",
              }}
            >
              {boardList.map(({ id, title, writer, date }) => (
                <Paper
                  sx={{ mb: 1, width: "100%", backgroundColor: "#F9F9F9" }}
                >
                  <ListItem
                    key={id}
                    disableGutters
                    sx={{ height: "35px", textAlign: "center" }}
                  >
                    <ListItemText
                      primary={type == "notice" ? "[공지]" : "[자유]"}
                    />
                    <ListItemText>{title}</ListItemText>
                    <ListItemText>{writer}</ListItemText>
                    <ListItemText>{date}</ListItemText>
                  </ListItem>
                </Paper>
              ))}
            </List>
          </Box>
        </>
      )}
      <div style={{ width: "95%", textAlign: "right", marginTop: "12px" }}>
        <WriteButton variant="">글쓰기</WriteButton>
      </div>
    </BoardDiv>
  );
}
