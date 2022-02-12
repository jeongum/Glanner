import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import axios from "axios";
import NoticeListPagePresenter from "./NoticeListPagePresenter";

export default function NoticeListPageContainer () { 
   
    const [loading, setLoading] = useState(true);
    const [latestNoticeList, setLatestNoticeList] = useState([]);
    const [page, setPage] = useState(1);
    // const [totalPage, setTotalPage] = useState(1);
    // 임시 테스트용 API, 
    // `json-server --watch data/db.json --port 8000` 으로 서버를 켜야 데이터 받아올 수 있음
    // 백엔드 REST API 구축되면 지울 예정

    const fetchLatestNoticeList = () => {
      axios(`/api/notice/${page}/10`, {method: 'GET'})
      .then(res => {
        setLatestNoticeList(res.data) 
        setLoading(false)
      })
      .catch(err => console.log(err))
    }
    useEffect(() => {
      fetchLatestNoticeList()
    }, [page])
    const handleChangePage = page => {
      setPage(page)     
    }
    return (
      <>
        <Helmet>
          <title>Glanner | 게시판</title>
        </Helmet>
        <NoticeListPagePresenter
          loading={loading}
          latestNoticeList={latestNoticeList}
          handleChangePage={handleChangePage}
        />
      </>
    );
  }

