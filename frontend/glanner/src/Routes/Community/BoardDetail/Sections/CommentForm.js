import { Button, Grid, TextField, Typography } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { boardStyles } from "../../Board.styles";

const useStyles = makeStyles(boardStyles)

export const CommentForm = ({
  addComment,
  comment,
  setOpenForm, 
  content, 
  setContent, 
  updateComment, 
  updateFlag, 
  setUpdateFlag}) => {
  const classes = useStyles();  
  
  // 댓글 && 대댓글 작성/수정 로직
  const onSubmit = (e) => {
    e.preventDefault();    
    let parentCommentId = null
    if (comment) parentCommentId = comment.commentId
    if (comment && updateFlag) { // 수정 로직
      updateComment(content, comment)
      setUpdateFlag(false)      
    } else {                     // 작성 로직
      addComment(content, parentCommentId)
    }  
    setContent("")
    if (parentCommentId !== null) setOpenForm(false)
  }

  return (    
    <form onSubmit={onSubmit}>
      <TextField className={classes.field} value={content} onChange={(e) => {setContent(e.target.value)}} id="comment" fullWidth multiline={true} rows={3} placeholder='댓글을 달아주세요.' sx={{ml: 5, width: "95%"}}/>
      <Grid container sx={{justifyContent: 'end'}}>
        { comment && 
          <Button type="button"
            onClick={() => {
              setUpdateFlag(false)
              setContent("")
              setOpenForm(false)
            }} 
            className={classes.btn} sx={{my: 1, mx: 0.5}}>
            <Typography className={classes.btnText}>
              취소
            </Typography>
          </Button>
        }
        <Button type="submit" className={classes.btn} sx={{my: 1}}>
          <Typography className={classes.btnText}>
            작성하기
          </Typography>
        </Button>
        <Grid item xs={0.2} />
      </Grid>
    </form>  
  )}