import React, { useEffect, useState } from "react";
import FindGroupPresenter from "./FindGroupPresenter";
import Helmet from "react-helmet";
import axios from "axios";

export default function FindGroupContainer () { 

  const [loading, setLoading] = useState(true);
  const [groupBoardList, setGroupBoardList] = useState([]);
  const [page, setPage] = useState(0);

    useEffect(() => {      
      fetchGroupBoardList()
    }, [page])
    const fetchGroupBoardList = () => {
      axios(`/api/group-board/${page}/4`, { method: 'GET' })
      .then(res => {
        setGroupBoardList(res.data)
        setLoading(false)
      }
      )
      .catch(err => console.log(err))
    }
    const handleChangePage = newPage => {
      setPage((newPage - 1) * 4)
    }

    return (
      <>
        <Helmet>
          <title>Glanner | 게시판</title>
        </Helmet>
        <FindGroupPresenter
          loading={loading}
          groupBoardList={groupBoardList}
          handleChangePage={handleChangePage}
        />
      </>
    );
  }

