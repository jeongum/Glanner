import { Avatar, Button, CardActions, CardContent, CardHeader, Divider } from "@mui/material"
import { Box } from "@mui/system"
import { makeStyles } from '@mui/styles';
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { CommentForm } from "./CommentForm";
import { boardStyles } from "../../Board.styles";
import MoreBtn from "../../../../Components/MoreBtn";
import { getTime } from "../../helper";
import { ReactComponent as CircleUser } from "../../../../assets/circle-user-solid.svg";
const useStyles = makeStyles(boardStyles)

export const SingleComment = ({
  comments, 
  setComments, 
  comment,
  addComment, 
  addCommentLike, 
  updateComment,
  pathname
}) => {
  const classes = useStyles();

  const [openForm, setOpenForm] = useState(false);
  const [content, setContent] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false);
  const openCommentForm = () => {
    if (openForm) {
      setOpenForm(false)
    } else {
      setOpenForm(true)
    }
    setContent("")
    setUpdateFlag(false)
  };
  
  return (
    <Box className={comment.parentId === -1 ? classes.comments : classes.nestedComment} key={comment.boardId}>
      <CardHeader
        avatar={
          comment.parentId === -1 ? 
          // <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">              
          // </Avatar>
          <CircleUser
            style={{
              fontSize: 30 + "px",
              color: "#5F5F5F",
              backgroundColor: "#F2D0D9",
              borderRadius: "50%",
              marginRight: 2
            }}
          /> 
          :
          <>
            <span 
              className={classes.replyIcon}
              style={{ position: 'relative', left: '-30px'}}
            >ㄴ</span>
            {/* <Avatar sx={{ bgcolor: grey[500], right: '25.2px' }} aria-label="recipe">              
            </Avatar> */}
            <CircleUser
              style={{
                fontSize: 30 + "px",
                color: "#5F5F5F",
                backgroundColor: "#F2D0D9",
                borderRadius: "50%",
                marginRight: 2,
                position: 'relative',
                left: -25
              }}
            /> 
          </>
        }
        action={
          <MoreBtn
            editData={comment} 
            type={`${pathname}comment`}
            comments={comments} 
            setComments={setComments} 
            setOpenForm={setOpenForm} 
            setContent={setContent} 
            setUpdateFlag={setUpdateFlag} 
          />
        }
        title={comment.userName}
        subheader={getTime(comment.createdDate)}
        className={classes.commentDateText}
        sx={ comment.parentId !== -1 ? {'& .MuiCardHeader-content': {position: 'relative', right: '25px'}} : null }
      />
      <CardContent>
        <p className={classes.commentContent} style={{ whiteSpace: 'normal', overflow: 'hidden', wordWrap: 'break-word'
	 }}>
          {comment.content}
        </p>
      </CardContent>
      <CardActions disableSpacing sx={{display: 'flex', justifyContent: 'space-between'}}>
        <span>
          {comment.parentId === -1 && <Button className={classes.botText} onClick={openCommentForm} component="span">답글쓰기</Button>}
          <Button className={classes.botText} onClick={() => addCommentLike(comment)} component="span"> 좋아요 {comment.likeCount}</Button>
        </span>            
      </CardActions>      
      <Divider />
      
      {/* 댓글 or 대댓글 작성창 */}
      {openForm &&
        <CommentForm 
          comment={comment} 
          addComment={addComment} 
          setOpenForm={setOpenForm} 
          content={content} 
          setContent={setContent} 
          updateComment={updateComment}
          updateFlag={updateFlag}
          setUpdateFlag={setUpdateFlag}
        />
      }   
    </Box>    
  )
}