import { Button, CardHeader, Divider, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { ReactComponent as CircleUser } from "../../../../assets/circle-user-solid.svg";
import { getTime } from "../../helper";
import GlannerMoreBtn from "./GlannerMoreBtn";

export const GlannerBoardComments = ({
    comment, 
    getGlannerComments, 
    commentCount,
    setCommentCount
}) => {
    return <>        
            <CardHeader
            avatar={
                <CircleUser
                    style={{
                        fontSize: 30 + "px",
                        color: "#5F5F5F",
                        backgroundColor: "#F2D0D9",
                        borderRadius: "50%"                                
                    }}
                />}   
            sx={{ display: 'flex', alignItems: 'start' }}
            action={
                <>
                    <GlannerMoreBtn
                        editData={comment}
                        type={'comment'}
                        getGlannerComments={getGlannerComments}
                        commentCount={commentCount}
                        setCommentCount={setCommentCount}
                    />
                </>
            }
            title={
                <>
                    <Typography sx={{fontSize: 18}} component="span">
                    {comment.userName}
                    </Typography>
                    <Typography sx={{fontSize: 13, color: '#C4C4C4', ml: 1, right: 10}} component="span">
                    {getTime(comment.createdDate)}
                    </Typography>
                </>
            }
            subheader={
                <Typography sx={{mt: 2}}>
                    {comment.content}
                </Typography>
            }
            // className={classes.commentDateText}
            subheaderTypographyProps={{
                fontSize: 13,
            }}              
            />
        <Divider />
    </>
};