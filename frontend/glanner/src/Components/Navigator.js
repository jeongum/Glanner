import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import styled from "styled-components";
import {
  faWrench,
  faCircle,
  faAngleRight,
  faSearch,
  faUserFriends,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as Logout } from "../assets/arrow-right-from-bracket-solid.svg";
import logo from "../assets/glannerLogo1.png";

const GroupPlannerList = styled.div`
  background-color: #ffffff;
  color: #5f5f5f;
  font-size: 16px;
  vertical-align: middle;
  border-radius: 5px;
  box-shadow: 0.5px 2px 5px 0.5px rgba(130, 130, 130, 0.2);
  min-width: 200px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

const myPlanners = ["글래너님의 플래너", "개인 플래너1"]; // useState, useRedux 들어갈 자리
const groupPlanners = [
  "알고리즘 스터디",
  "스프링 스터디",
  "독서 모임",
  "00대 16학번 모임",
]; // useState, useRedux 들어갈 자리

const categories = [
  {
    id: "내 플래너",
  },
  {
    id: "그룹 플래너",
  },
];

const boards = [
  {
    id: "게시판",
    children: [
      {
        id: "그룹 찾기",
        icon: (
          <FontAwesomeIcon
            icon={faSearch}
            className="searchIcon"
            style={{ width: 15 + "px" }}
          />
        ),
        type: "group",
      },
      {
        id: "자유 게시판",
        icon: (
          <FontAwesomeIcon
            icon={faUserFriends}
            className="usersIcon"
            style={{ width: 15 + "px" }}
          />
        ),
        type: "free",
      },
      {
        id: "공지사항",
        icon: (
          <FontAwesomeIcon
            icon={faComment}
            className="commentIcon"
            style={{ width: 15 + "px" }}
          />
        ),
        type: "notice",
      },
    ],
  },
];

// const onLogout = () => {
//   sessionStorage.removeItem("token");
//   document.location.href = "";
// };

const settings = [
  {
    id: "",
    children: [
      {
        id: "설정",
        icon: (
          <FontAwesomeIcon
            icon={faWrench}
            className="wrench"
            style={{ width: 15 + "px" }}
          />
        ),
      },
      {
        id: "로그아웃",
        icon: <Logout style={{ width: 15 + "px" }} />,
        // func: onLogout(),
      },
    ],
  },
];

const item = {
  py: 0,
  color: "#5f5f5f",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const groupItem = {
  py: 0,
  color: "#5f5f5f",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const settingItem = {
  position: "relative",
  color: "#909090",
  fontSize: "16px",
};

const onClickPlanner = (e) => {
  categories.map(({ id, children }) => {
    children.map(({ id: childId, active }) => {
      if (e.currentTarget.id == childId) {
        active = true;
      } else {
        active = false;
      }
    });
  });
};

function Navigator(props) {
  const { ...other } = props;

  const [groupPList, setGroupPList] = useState([]);

  const bodyParams = {
    id: "test001@naver.com",
  };
  const fetchGroupList = () => {
    axios
      .get(`/api/glanner`, bodyParams)
      .then((res) => {
        setGroupPList(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    fetchGroupList();
  }, []);

  return (
    <Drawer variant="persistent" {...other} open={true} varient="no">
      <List disablePadding sx={{ display: "inline-block" }}>
        <ListItem
          sx={{
            px: "20px",
            mt: "25px",
            color: "#000000",
            fontWeight: "bold",
            fontFamily: "Rozha One",
          }}
        >
          <Link to={`/`}>
            <img src={logo} style={{ height: 40 + "px" }} />
          </Link>
        </ListItem>
        <Box
          key={"myPlanner"}
          sx={{
            maxHeight: "240px",
          }}
        >
          <ListItem sx={{ pb: 0, px: 2, mt: 2 }}>
            <ListItemText sx={{ color: "#959595", fontSize: "14px" }}>
              내 플래너
            </ListItemText>
          </ListItem>
          <Box
            sx={{
              maxHeight: "200px",
              overflow: "scroll",
            }}
          >
            {/* 내 플래너 리스트 들어갈 자리 */}
            <ListItem key={"emailid들어갈자리"} sx={{ pb: 0 }}>
              <GroupPlannerList>
                <Link to={`/`}>
                  <ListItemButton
                    selected={true}
                    sx={item}
                    id={"emailid들어갈자리"}
                  >
                    <ListItemText>
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="circle"
                        style={{ width: 12 + "px", color: "#FFABAB" }}
                      />
                      {"  "}
                      {"emailid"}의 플래너
                    </ListItemText>
                  </ListItemButton>
                </Link>
              </GroupPlannerList>
            </ListItem>
          </Box>
        </Box>
        <Box
          key={"myPlanner"}
          sx={{
            maxHeight: "240px",
          }}
        >
          <ListItem sx={{ pb: 0, px: 2, mt: 2 }}>
            <ListItemText sx={{ color: "#959595", fontSize: "14px" }}>
              그룹 플래너
            </ListItemText>
          </ListItem>
          <Box
            sx={{
              maxHeight: "200px",
              overflow: "scroll",
            }}
          >
            {groupPList.map(({ glannerId, glannerName }) => (
              <ListItem key={glannerId} sx={{ pb: 0 }}>
                <GroupPlannerList>
                  <Link to={`/group/${glannerId}`}>
                    <ListItemButton
                      selected={function () {
                        return (
                          <FontAwesomeIcon
                            icon={faAngleRight}
                            className="arrowRight"
                            style={{
                              width: 15 + "px",
                              color: "#959595",
                              marginLeft: 10 + "px",
                            }}
                          />
                        );
                      }}
                      sx={item}
                      id={glannerId}
                    >
                      <ListItemText>
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="circle"
                          style={{ width: 12 + "px", color: "#ABC3FF" }}
                        />
                        {"  "}
                        {glannerName}
                        {/* {active ? (
                            <FontAwesomeIcon
                              icon={faAngleRight}
                              className="arrowRight"
                              style={{
                                width: 15 + "px",
                                color: "#959595",
                                marginLeft: 10 + "px",
                              }}
                            />
                          ) : (
                            ""
                          )} */}
                      </ListItemText>
                    </ListItemButton>
                  </Link>
                </GroupPlannerList>
              </ListItem>
            ))}
          </Box>
        </Box>

        {/* ! 게시판 부분 */}
        {boards.map(({ id, children }) => (
          <Box key={id} sx={{ mt: 3 }}>
            <ListItem>
              <ListItemText sx={{ color: "#959595" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, type }) => (
              <ListItem key={childId} sx={{ py: 0, px: "5px" }}>
                {/* 게시판 종류에 따라 링크 나뉘는 분기 부분 */}
                <Link to={`/community/${type}`}>
                  <ListItemButton sx={groupItem}>
                    <ListItemText>
                      {icon}
                      {"  "}
                      {childId}
                    </ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </Box>
        ))}
        <div
          style={{
            minHeight: "60px",
            width: "auto",
            content: "",
          }}
        ></div>
        {/* ! 설정&로그아웃 부분 */}
        {settings.map(({ id, children }) => (
          <Box key={id} sx={settingItem}>
            {children.map(({ id: childId, icon, func }) => (
              <ListItem key={childId} sx={{ p: 0 }}>
                <ListItemButton
                  sx={{ m: 0, height: "30px" }}
                  components="a"
                  //onClick={func}
                >
                  <ListItemText>
                    {icon} {childId}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

export default Navigator;
