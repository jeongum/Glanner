import React from 'react';
import { Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CommentForm } from './Sections/CommentForm';
import { DetailBody } from './Sections/DetailBody';
import { SingleComment } from './Sections/SingleComment';
import { ReplyComment } from './Sections/ReplyComment';
import { boardStyles } from '../Board.styles';
const useStyles = makeStyles(boardStyles)

export const BoardDetailPagePresenter = ({
  loading, 
  post, 
  addLike, 
  content, 
  setContent, 
  comments, 
  setComments,
  addComment, 
  addCommentLike,
  updateComment,
  pathname
}) => {
  const classes = useStyles();  
  return (
    <>
    {loading && <div>Loading...</div>}
    {post && comments &&
      <div className={classes.card}>
        <DetailBody post={post} addLike={addLike} />

        <Divider />        
        <Typography component="div" variant="h5" sx={{ padding: 3}}> 댓글 {comments && comments.length}</Typography>            
        
        {/* 댓글 박스 */}       
        {comments && comments.map(comment => {           
            return (
            <div key={comment.id}>
              {comment.responseTo === -1 &&
              <>
                <SingleComment
                comments={comments}            
                comment={comment}
                addComment={addComment}
                addCommentLike={addCommentLike}
                setComments={setComments}
                updateComment={updateComment}
                pathname={pathname}                
                />
                <ReplyComment
                  addCommentLike={addCommentLike} 
                  commentList={comments} 
                  parentCommentId={comment.id} 
                  setComments={setComments}
                  updateComment={updateComment}
                />
              </>
              }
            </div>
        )})}
        {/* 댓글 작성창 */}
        <CommentForm addComment={addComment} content={content} setContent={setContent}/> 
      </div>
      
    }
    
    </>
  );
}