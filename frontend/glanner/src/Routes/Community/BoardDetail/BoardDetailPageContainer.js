import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BoardDetailPagePresenter } from "./BoardDetailPagePresenter"

export const BoardDetailPageContainer = () => {
  const { id } = useParams();
  const [loading, isLoading] = useState(true);
  const [post, setPost] = useState({});
  const [postLikeCount, setPostLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const { pathname } = useLocation();

  const [glannerInfo, setGlannerInfo] = useState({});
  
  useEffect(() => {    
    if (pathname.includes('/notice/')) {
      axios(`latestNoticeList/${id}`, {method: 'GET'})
     .then(res => {
       setPost(() => res.data)    
       isLoading(false)
      })
     .catch(err => console.log(err))   
    } else if (pathname.includes('/free/')) {     
      
      // 게시글 데이터 가져오기
      axios(`/api/free-board/${id}`)
        .then(res => {
          setPost(res.data)          
          setComments(res.data.comments)
          setPostLikeCount(res.data.likeCount)
          isLoading(false)
        })
        .catch(err => console.log(err))

    } else if (pathname.includes('/group/')) {
      axios(`/api/group-board/${id}`, {method: 'GET'})
       .then(res => { 
          setPost(res.data)
          fetchGlannerInfo()          
          setComments(res.data.comments)
          setPostLikeCount(res.data.likeCount)    
          isLoading(false)
        })
       .catch(err => console.log(err))    
      
      axios(`groupComments?postId=${id}`, {method: 'GET'})
      .then(res => {
        setComments(() => res.data)
        isLoading(false)
      })
      .catch(err => console.log(err))
    }
  }, [id, pathname])
  
  // 게시글 데이터 가져오기
  const getFreeBoard = () => {
    axios(`/api/free-board/${id}`, {method: 'GET'})
      .then(res => {
        console.log(res.data)
        setPost(() => res.data)    
        isLoading(false)
      })
      .catch(err => console.log(err)) 
  }

  // 해당 게시글의 좋아요 + 1
  const addLike = () => {
    if (pathname.includes('/notice/')) {
      axios(`boardlist/${id}`, {
      method: 'PATCH',
      data: {like: post.like + 1}
    })
      .then(res => {
        setPost(res.data)
      })
      .catch(err => console.log(err))
    } else if (pathname.includes('/free/')) {
      axios(`/api/free-board/like/${id}`, {
      method: 'PUT',
      // data: {like: post.like + 1}
    })
      .then(res => {
        setPostLikeCount(postLikeCount + 1)
      })
      .catch(err => console.log(err))
    } else if (pathname.includes('/group/')) {
      axios(`/api/group-board/like/${id}`, {
      method: 'PUT',
      // data: {like: post.like + 1}
    })
      .then(res => {
        setPostLikeCount(postLikeCount + 1)
      })
      .catch(err => console.log(err))
    }    
  }

  //  해당 게시글에 댓글 && 대댓글 남기기
  // responseTo는 부모 댓글의 id임. responseTo가 -1 이라면 루트 댓글, responseTo가 -1이 아니라 자연수라면 대댓글임
  const addComment = (newCommentData, parentCommentId) => {
    if (newCommentData.trim() === "") {
      alert('댓글을 입력해주세요.')
      return
    }
    const commentData = {
      content: newCommentData,
      boardId: post.boardId,
      parentId: parentCommentId
    }
    if (pathname.includes('/free/')) {
      axios(`/api/free-board/comment`, {
        method: 'POST',
        data: commentData
      }).then(res => {        
        setComments(comments.concat(res.data)) 
      })
        .catch(err => console.log(err.message))
    } else if (pathname.includes('/group/')) {
      axios(`/api/group-board/comment`, {
        method: 'POST',
        data: commentData
      }).then(res => {
        setComments(comments.concat(res.data)) 
      })
        .catch(err => console.log(err.message))
    }
  }  

  // 댓글 && 대댓글 수정하기
  const updateComment = (commentContent, commentData) => {    
    const today = Date();   
    const newCommentData = {
      content: commentContent,
      writer: commentData.writer,
      date: today,
      like: commentData.like,
      postId: post.id,
      responseTo: commentData.responseTo
    }
    if (pathname.includes('/free/')) {
      axios(`comments/${commentData.id}`, {
        method: 'PUT',
        data: newCommentData
      }).then(res => {
        const newCommentList = comments.map(comment => {
          if (comment.id !== commentData.id) {
            return comment
          } else {
            return res.data
          }
        })
        setComments(newCommentList)
      } 
        )
        .catch(err => console.log(err.message))
    } else if (pathname.includes('/group/')) {
      axios(`groupComments/${commentData.id}`, {
        method: 'PUT',
        data: newCommentData
      }).then(res => {
        const newCommentList = comments.map(comment => {
          if (comment.id !== commentData.id) {
            return comment
          } else {
            return res.data
          }
        })
        setComments(newCommentList)
      } 
        )
        .catch(err => console.log(err.message))
    }
    }

  // 댓글 && 대댓글 좋아요 + 1
  const addCommentLike = (_comment) => {
    if (pathname.includes('/free/')) {
      axios(`comments/${_comment.id}`, {
      method: 'PATCH',
      data: {like: _comment.like + 1}
    })
      .then(res => {
        const newCommentsData = comments.map(comment => {
          if (comment.id === _comment.id) {
            comment.like ++
            return comment
          } else {
            return comment
          }
        })
        setComments(newCommentsData)
      })
      .catch(err => console.log(err))
    } else if (pathname.includes('/group/')) {
      axios(`groupComments/${_comment.id}`, {
      method: 'PATCH',
      data: {like: _comment.like + 1}
    })
      .then(res => {
        const newCommentsData = comments.map(comment => {
          if (comment.id === _comment.id) {
            comment.like ++
            return comment
          } else {
            return comment
          }
        })
        setComments(newCommentsData)
      })
      .catch(err => console.log(err))
    }
    
  }
  
  // glanner 정보 가져오기
  const fetchGlannerInfo = () => {
    axios(`/api/group-board/glanner/${id}`)
      .then(res => {
        setGlannerInfo(res.data)
      })
      .catch(err => console.log(err))
  }
  
  return (
    <BoardDetailPagePresenter 
      loading={loading}
      post={post}
      addLike={addLike}
      content={content}
      setContent={setContent}
      comments={comments}
      setComments={setComments}
      addComment={addComment}
      addCommentLike={addCommentLike}
      updateComment={updateComment}
      pathname={pathname}
      postLikeCount={postLikeCount}
      glannerInfo={glannerInfo}
    />
  )
}