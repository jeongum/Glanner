import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { GlannerBoardComments } from "./GlannerBoardComments";

export const GlannerCommentItem = ({
    post,
    page,
    // onSubmitComment
}) => {
    const [open, setOpen] = useState(false);
    const { register, watch, formState: {errors}, handleSubmit } = useForm();
    const [content, setContent] = useState("");
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(post.comments.length);

    const onSubmitComment = (content, boardId) => {
        if (content.length === 0) {
            alert('댓글을 작성해주세요.')
            return
        }
        axios(`/api/glanner-board/comment`, {method: 'POST', data: {boardId: post.boardId, content: content, parentId: null}})
            .then(res => {            
                setCommentCount(commentCount + 1)    
                getGlannerComments()
            })
            .catch(err => console.log(err))
    }
    const getGlannerComments = () => {
        axios(`/api/glanner-board/${post.boardId}`)
            .then(res => {
                setComments(res.data.comments.reverse())
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getGlannerComments()
    }, [])
    return <>
        <Typography onClick={() => setOpen(!open)} component="span" sx={{ cursor: 'pointer', ml: '64px', mt: 5, mb: 1, color: '#959595', textDecoration: 'underline'}}>댓글 <span>({commentCount})</span></Typography>
            
        {open && <Box sx={{ ml: 8, background: '#F6F6F6', borderRadius: '5px', px: 3, py: 2}}>
    
            {comments && comments.map(comment => {                
                return <GlannerBoardComments open={open} comment={comment} getGlannerComments={getGlannerComments} commentCount={commentCount} setCommentCount={setCommentCount} setComments={setComments} key={comment.commentId} />
            })}
            <Box>
                <TextField
                    fullWidth
                    sx={{ 
                        borderRadius: '1px 1px 0px 0px',
                        border: '2px solid #E5E5E5', "legend": {width: 0},
                        "fieldset": {border: 'none'}, height: 'auto',
                        background: '#FFFFFF', mt: 2, border: 0
                    }}
                    multiline
                    placeholder="내용을 입력하세요."
                    inputProps={{style: { padding: '5px 10px 5px 10px'}}} 
                    // {...register('commentContent', {required: true, maxLength: 140})}
                    // label={errors.commentContent && errors.commentContent.type === "required" && <p className='error-text'>댓글을 입력해주세요</p>}
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
                <Grid container sx={{justifyContent: 'end', height: 'auto', background: '#FFFFFF'}}>                
                    <Grid item sx={{padding: '10px 10px 10px 10px'}}>
                        <Button
                            onClick={() => {onSubmitComment(content, post.boardId); setContent("")}}
                            
                            sx={{
                                width: '90px',
                                height: '35px',
                                border: "1px solid #8C7B80",
                                fontFamily: 'Noto Sans CJK KR',
                                fontSize: '16px',
                                fontWeight: 'medium',
                                color: "#8C7B80",
                                borderRadius: "10px",
                                background: 'rgba(140, 123, 128, 0.1)',
                                "&:hover": {
                                    color: "#FFFFFF",
                                    backgroundColor: "#8C7B80",
                                    borderColor: "#8C7B80",
                                    boxShadow: "none",
                                }
                            }}
                            >등록</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>}
    </>
}