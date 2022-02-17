import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import axios from "axios";
import NoticeListPagePresenter from "./NoticeListPagePresenter";

export default function NoticeListPageContainer () { 
   
    const [loading, setLoading] = useState(true);
    const [latestNoticeList, setLatestNoticeList] = useState([]);
    const [page, setPage] = useState(0);

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

