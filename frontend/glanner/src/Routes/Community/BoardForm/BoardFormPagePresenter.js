import { DeleteForever } from "@material-ui/icons";
import { Box, Button, Divider, TextField, Grid, Typography, CardMedia, ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";
import { boardStyles } from "../Board.styles";

const useStyles = makeStyles(boardStyles);

export const BoardFormPagePresenter = ({
  handle, 
  handleSubmit, 
  onFileChange, 
  deleteFile, 
  attachment,  
  data,
  state
}) => {
  const classes = useStyles();    
  return (
    // <Paper style={{ padding: "20px, 5px", width: 'auto', height: '100%'}}>
      <form noValidate onSubmit={handleSubmit} style={{ padding: '40px 60px 40px 80px'}}>            
        <Grid container>          
          <Grid item xs={1.2}>
            <Typography className={classes.label}>제목</Typography>
          </Grid>
          <Grid item xs={10}>    
            <TextField
              onChange={(e) => {
                // if (data.title) {setTitleError(false)}
                handle(e)
              }}
              value={data.title}              
              // label="제목"
              id="title" 
              fullWidth
              required
              // error={titleError}
              className={[classes.smallInput, classes.field].join(' ')}
              sx={{flexGrow: 2}}
            >            
            </TextField>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={1.2}>
            <Typography className={classes.label}>내용</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField 
              onChange={(e) => {
                // if (data.content) {setContentError(false)}
                handle(e)
              }}
              id="content" 
              // label="내용"
              value={data.content}
              fullWidth
              required
              multiline={true}
              rows={15}
              // error={contentError}
              className={classes.field}              
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={1.2}>
            <Typography className={classes.label}>파일 첨부</Typography>
          </Grid>
          <Grid item xs={8.6}>            
            <TextField value={attachment} className={[classes.smallInput, classes.field].join(' ')} disabled fullWidth />
          </Grid>
          <Grid item xs={1}>
            <TextField
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={onFileChange}
                value={data.attachment}                
              />            
            <label htmlFor="upload-photo" >  
              <Box sx={{ mt: 2.5, 
                    ml: 1.3 }}>                                 
                <Button component="span" className={[classes.attBtn, classes.attBtnText].join(' ')}>                  
                  첨부하기
                </Button>
              </Box>              
            </label>            
          </Grid>
          <Grid item xs={1} />

          {/* 첨부한 이미지 미리보기 */}
          {attachment && 
            <>
              <ImageListItem sx={{mt: 2, ml: 14}}>
                <CardMedia
                component="img"
                sx={{ width: 100, height: 100 }}
                image={attachment}
                alt="Live from space album cover"
              />
              <ImageListItemBar              
                  sx={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',                    
                  }}
                  position="top"
                  actionIcon={
                    <IconButton
                      onClick={deleteFile}
                      sx={{ color: 'white' }}                  
                    >
                      <DeleteForever />
                    </IconButton>
                  }
                  actionPosition="right"
                />                
              </ImageListItem>              
            </>            
          }
        </Grid>
        <Divider sx={{ mt: 2}} />
        <Grid container sx={{mt: 2, justifyContent: 'space-between'}}>
          {/* <Grid item xs={2}/> */}
          <Grid item>
            {!state ? 
            <Link to={'/community/free/'}>
              <Button className={classes.btn}>
                <Typography className={classes.btnText}>
                  목록으로
                </Typography>
              </Button>
            </Link>
            :<Link to={-1}>
            <Button className={classes.btn}>
              <Typography className={classes.btnText}>
                본문으로
              </Typography>
            </Button>
          </Link>}
          </Grid>
          <Grid item sx={{ ml: 1}}>
            <Button className={classes.btn} type="submit">
              <Typography className={classes.btnText}>
                작성하기
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    // </Paper>
  )
};