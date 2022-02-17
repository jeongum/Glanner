import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
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
  Grid,
  Divider,
  Stack,
  Pagination,
  FormGroup,
} from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import "moment/locale/ko";
import { boardStyles } from "../Board.styles";
import { getListTime } from "../helper";

const WriteButton = St(Button)({
  width: '90px',
  height: '35px',
  border: "1px solid #8C7B80",
  fontFamily: 'Noto Sans CJK KR',
  fontSize: '16px',
  fontWeight: 'medium',
  color: "#8C7B80",
  borderRadius: "10px",
  "&:hover": {
    color: "#FFFFFF",
    backgroundColor: "#8C7B80",
    borderColor: "#8C7B80",
    boxShadow: "none",
  },
});

const NoaticeListDiv = styled.div`
  span {
    font-family: 'Noto Sans KR' !important;
  }
`;

const useStyles = makeStyles(boardStyles)

export default function NoticeListPagePresenter({ 
  loading, 
  latestNoticeList,  
  handleChangePage,
  inputData,
  handleInput,
  searchBoard
}) {
  const classes = useStyles();
  return (
    <NoaticeListDiv>
      {loading && <div>Loading...</div>}
      {latestNoticeList &&
      <Box>      
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ textAlign: "right", width: "95%", minHeight: "100%", m: 0 }}
        >
          <FormGroup sx={{ float: 'right', width: "25ch", mb: 1, mt: 3, height: 50,}} size="small">
            {/* <InputLabel htmlFor="search-board">이름, 제목</InputLabel> */}
            <OutlinedInput
              value={inputData}
              onChange={handleInput}
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  searchBoard()
                }
              }}
              id="search-board"              
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="search-button" edge="end">
                    <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              sx={{ borderRadius: 5, background: '#F7F6F6',
                border: '2px solid #E5E5E5', "legend": {width: 0},
                "fieldset": {border: 'none'}, height: 40
              }}
            />
          </FormGroup>
        </Box>
        <Box className={classes.textField} sx={{ textAlign: "center", minHeight: "100%" }}>          
          <List
            sx={{
              width: "90%",
              bgcolor: "background.paper",
              margin: "0 auto",
              minHeight: "100%",
              borderTop: "2px solid #e5e5e5",
            }}
          >
            <Grid container>
              <Grid item xs={1}>
                <ListItemText primary={"말머리"} />                
              </Grid>
              <Grid item xs={7}>
                <ListItemText>제목</ListItemText>                
              </Grid>
              <Grid item xs={1.8}>
                <ListItemText>글쓴이</ListItemText>
              </Grid>
              <Grid item xs={1}>
                <ListItemText>작성일</ListItemText>
              </Grid>
              <Grid item xs={0.6}>
                <ListItemText>조회</ListItemText>
              </Grid>
              <Grid item xs={0.6}>
                <ListItemText>추천</ListItemText>
              </Grid>
            </Grid>
            <Divider />
            {latestNoticeList.map(({ boardId, title, userName, createdDate, count, like }) => (
              <Paper sx={{ mb: 1, width: "100%", backgroundColor: "#F9F9F9" }} key={boardId}>
                <ListItem
                  disableGutters
                  sx={{ height: "35px", textAlign: "center", color: "#DB1111" }}
                >
                  <Grid container>
                    <Grid item xs={1}>
                      <ListItemText primary={"[공지]"} />                
                    </Grid>
                    <Grid item xs={7}>
                      <Link to={`/board/notice/${boardId}`}>
                        <ListItemText sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>{title}</ListItemText>
                      </Link>
                    </Grid>
                    <Grid item xs={1.8}>
                      <ListItemText>{userName}</ListItemText>
                    </Grid>
                    <Grid item xs={1}>
                      <ListItemText>{getListTime(createdDate)}</ListItemText>
                    </Grid>
                    <Grid item xs={0.6}>
                      <ListItemText>{count}</ListItemText>
                    </Grid>
                    <Grid item xs={0.6}>
                      <ListItemText>{like}</ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              </Paper>
            ))}
          </List>          
        </Box>
        <div style={{ width: "95%", textAlign: "right", marginTop: "12px" }}>
          <Link to={'/notice-form/'}>
            <WriteButton WriteButton variant="">글쓰기</WriteButton>
          </Link>
        </div>
      </Box>}
    <Stack alignItems={'center'} spacing={2}>
      <Pagination onChange={e => handleChangePage(e.target.innerText)} count={5} sx={{position: 'fixed', bottom: 100}} size="large"/>      
    </Stack>
    </NoaticeListDiv>
  );
}