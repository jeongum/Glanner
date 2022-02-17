import { Button, CardHeader, Divider, Grid, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { ReactComponent as Camera } from "../../../assets/camera.svg";
import { ReactComponent as MyPaper } from "../../../assets/my-paper.svg";
import MoreBtn from "../../../Components/MoreBtn";
import { boardStyles } from "../Board.styles";
import { makeStyles } from "@mui/styles";
import { GlannerCommentItem } from "./Sections/GlannerCommentItem";
import { ReactComponent as CircleUser } from "../../../assets/circle-user-solid.svg";
import { getTime } from "../helper";
import GlannerMoreBtn from "./Sections/GlannerMoreBtn";

const useStlyes = makeStyles(boardStyles);
export const GlannerBoardPresenter = ({
    boardList,
    register,
    errors,
    handleSubmit,
    onSubmit,
    onSubmitComment,
    loading,
    handleScroll,
    page,
    refreshData
}) => {
    const classes = useStlyes();
    return (
    <div onScroll={handleScroll}>
        <Box
            component={'form'}
            onSubmit={handleSubmit(onSubmit)} 
            sx={{ 
                width: 'auto', 
                mx: 5,
                mt: 5,
                background: '#FFFFFF',
                border: '1px solid #E5E5E5',
                boxSizing: 'border-box',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
                borderRadius: '10px'
            }}
        >
            <TextField
                id="standard-multiline-static"
                // label="Multiline"
                fullWidth
                rows={1}
                placeholder="제목을 입력하세요."
                variant="standard"
                sx={{ "& .MuiInput-underline:before": {
                    borderBottom: "0 solid #E5E5E5"
                },
                "& .MuiInput-underline:after": {
                    borderBottom: "0 solid #E5E5E5"
                },
                "& .MuiInput-underline:hover:before": {
                    borderBottom: "0 solid #E5E5E5"
                },
                "& .Mui-focused": {border: 0},
                '&& .MuiInput-root:hover::before': {
                    borderColor: '#FFFFFF',
                    border: 0
                },
                borderBottom: '2px solid #E5E5E5'                
                }}
                inputProps={{style: { padding: '10px 20px 10px 20px' }}}
                
                label={errors.boardTitle && <span className='error-text' style={{marginLeft: 20}}>제목을 입력해주세요</span>}             
                {...register('boardTitle', {required: true, maxLength: 50})} 
            />
            <TextField
                id="standard-multiline-static"
                // label="Multiline"
                multiline
                fullWidth
                rows={5}
                placeholder="내용을 입력하세요."
                variant="standard"
                sx={{ "& .MuiInput-underline:before": {
                    borderBottom: "0 solid #E5E5E5"
                },
                "& .MuiInput-underline:after": {
                    borderBottom: "0 solid #E5E5E5"
                },
                "& .MuiInput-underline:hover:before": {
                    borderBottom: "0 solid #E5E5E5"
                },
                "& .Mui-focused": {border: 0},
                
                '&& .MuiInput-root:hover::before': {
                    borderColor: '#FFFFFF',
                    border: 0
                }}}
                inputProps={{style: { padding: '10px 20px 10px 20px'}}}
                {...register('boardContent', {required: true, maxLength: 500})}
                label={errors.boardContent && <span className='error-text' style={{marginLeft: 20}}>내용을 입력해주세요</span>}             

            />
            <Grid container sx={{justifyContent: 'space-between', height: 'auto'}}>
                <Grid item sx={{mx: '10px 15px 15px 10px', p: '10px 10px 10px 10px'}}>
                    <Camera />
                    <MyPaper style={{marginLeft: 10}} />
                </Grid>
                <Grid item sx={{padding: '10px 10px 10px 10px'}}>
                    <Button
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
                        type={'submit'}
                    >등록</Button>
                </Grid>
            </Grid>
        </Box>
        <Divider sx={{my: 2, mx: 5}} />
        {/* 게시글 시작 */}
        {boardList && boardList.map((post) => {

        
            return (
                <Box sx={{ mx: 5, textAlign: 'start'}} key={`post-${post.boardId}`}>
                    <CardHeader
                        avatar={
                            <CircleUser
                            style={{
                                fontSize: 30 + "px",
                                color: "#5F5F5F",
                                backgroundColor: "#F2D0D9",
                                borderRadius: "50%",
                                marginRight: 2
                            }}
                            />}   

                        action={
                        // <MoreBtn
                        //     // editData={comment} 
                        //     // type={`${pathname}comment`}
                        //     // comments={comments} 
                        //     // setComments={setComments} 
                        //     // setOpenForm={setOpenForm} 
                        //     // setContent={setContent} 
                        //     // setUpdateFlag={setUpdateFlag} 
                        // />
                        <></>
                        }
                        title={
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant="h6" component="span">
                                {post.userName}
                                </Typography>
                                <GlannerMoreBtn component={'span'} editData={post} type={'body'} refreshData={refreshData} page={page} />
                            </Box>
                        }
                        subheader={getTime(post.createdDate)}
                        // className={classes.commentDateText}
                        subheaderTypographyProps={{
                            fontSize: 13,
                        }}              
                    />
                    <Box sx={{ ml: 8}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" sx={{my: 5}} color="text.secondary">
                            {post.content}
                        </Typography>
                    </Box>
                    {/* 댓글 시작 */}
                    <GlannerCommentItem post={post} onSubmitComment={onSubmitComment} page={page} />
                    <Divider sx={{mx: 5, my: 1}} />
                </Box>            
            )
        })}
        {loading && <div>Loading ...</div>}
    </div>
    )
} 