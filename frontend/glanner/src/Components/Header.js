import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Grid from "@mui/material/Grid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as CalendarIcon } from "../assets/calendar-check-solid.svg";
import { ReactComponent as CircleUser } from "../assets/circle-user-solid.svg";

const HeaderContainer = styled.div`
  word-break: break-all;
  height: 100px;
  min-width: 100%;
  overflow: hidden;
  font-size: 16px;
  color: 5f5f5f;
  width: 100%;
`;

const headerStyle = {
  display: "flex",
  alignItems: "center"
}

export default function Header({ title }) {
  return (
    <HeaderContainer>
      <div
        style={{
          marginLeft: "20px",
          lineHeight: 3,
          textAlign: "left",
          fontSize: "30px",
          width: "300px",
          float: "left",
        }}
      >
        {title}
      </div>
      <div
        style={{
          height: "100%",
          textAlign: "right",
          minWidth: "300px",
          float: "right",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Grid container direction="row">
          <Grid item xs={5} sx={headerStyle} >
            <CalendarIcon
              style={{
                fontSize: 25 + "px",
                color: "#5F5F5F",
                marginRight: "3px",
              }}
            />
            <Link to={`/daily`}>오늘의 일정</Link>
          </Grid>
          <Grid item xs={3} sx={headerStyle}>
            <FontAwesomeIcon
              icon={faBell}
              className="bell"
              style={{
                fontSize: 25 + "px",
                color: "#5F5F5F",
                marginRight: "3px",
              }}
            />
            <Link to ={``}>
              알림함
            </Link>
          </Grid>
          <Grid item xs={2} sx={{
            ml: "10px", pl: "20px", borderLeft: "1px solid #b5b5b5"
          }}>
            <CircleUser
              style={{
                fontSize: 40 + "px",
                color: "#5F5F5F",
                backgroundColor: "#F2D0D9",
                borderRadius: "50%",
              }}
            />
          </Grid>
        </Grid>
      </div>
    </HeaderContainer>
  );
}

function Header2({ title }) {
  return (
    <HeaderContainer>
      <Grid container spacing={2} direction="row">
        <Grid item xs={4} sx={{ textAlign: "left", fontSize: "30px" }}>
          <div style={{ marginLeft: "20px", lineHeight: 3 }}>{title}</div>
        </Grid>
        <Grid
          container
          item
          xs={8}
          sx={{ textAlign: "center" }}
          direction="row"
          justifyContent="right"
          alignItems="center"
        >
          <Grid xs={7} />
          <Grid item xs={2}>
            <CalendarIcon
              style={{
                fontSize: 30 + "px",
                color: "#5F5F5F",
                marginRight: "3px",
              }}
            />
            오늘의 일정
          </Grid>
          <Grid item xs={2}>
            <FontAwesomeIcon
              icon={faBell}
              className="bell"
              style={{
                fontSize: 30 + "px",
                color: "#5F5F5F",
                marginRight: "3px",
              }}
            />
            알림함
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              //borderLeft: "1.5px solid #B5B5B5",
              width: "40px",
            }}
          >
            <CircleUser
              style={{
                fontSize: 40 + "px",
                color: "#5F5F5F",
                backgroundColor: "#F2D0D9",
                borderRadius: "50%",
              }}
            />
          </Grid>
          <Grid xs={1} />
        </Grid>
      </Grid>
    </HeaderContainer>
  );
}
