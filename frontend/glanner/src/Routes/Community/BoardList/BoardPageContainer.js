import React, { useEffect, useState } from "react";
import BoardPagePresenter from "./BoardPagePresenter";
import Helmet from "react-helmet";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import { useParams } from "react-router-dom";

export default function BoardPageContainer () { 
    // const type = useParams();   
    const [loading, setLoading] = useState(true);
    const [boardList, setBoardList] = useState([]);
    const [latestNoticeList, setLatestNoticeList] = useState([]);
    const [page, setPage] = useState(0);

    // const [totalPage, setTotalPage] = useState(1);

    const fetchBoardList = () => {
      axios(`/api/free-board/${page}/9`, {method: 'GET'})
        .then(res => {
          setBoardList(res.data)
          console.log(res.data)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }

    // const fetchLatestNoticeList = () => {
    //   axios('http://localhost:8000/LatestNoticeList', {method: 'GET'})
    //   .then(res => {
    //     setLatestNoticeList(res.data) 
    //     setLoading(false)
    //   })
    //   .catch(err => console.log(err))
    // }
    useEffect(() => {
      fetchBoardList()
      // fetchLatestNoticeList()
    }, [page])

    const handleChangePage = newPage => {
      setPage((newPage - 1) * 9)     
    }

    return (
      <>
        <Helmet>
          <title>Glanner | 게시판</title>
        </Helmet>
        <BoardPagePresenter
          loading={loading}
          boardList={boardList}
          latestNoticeList={latestNoticeList}
          handleChangePage={handleChangePage}
          // type = {type}
        />
      </>
    );
  }
