import { DeleteForever } from "@material-ui/icons";
import { Box, Button, Divider, TextField, Grid, Typography, CardMedia, ImageListItem, ImageListItemBar, IconButton, Autocomplete, Stack, Chip, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";
import { boardStyles } from "../Board.styles";
import TagsInput from "./CustomHook";

const useStyles = makeStyles(boardStyles);

export const GroupFormPagePresenter = ({
  handle, 
  handleSubmit, 
  onFileChange, 
  deleteFile, 
  attachment,  
  data,
  handleSelecetedTags,
  state
}) => {
  const classes = useStyles();    
  return (
      <form noValidate onSubmit={handleSubmit} style={{ padding: '40px 60px 40px 80px'}}>            
        <Grid container>          
          <Grid item xs={1.2}>
            <Typography className={classes.groupLabel}>제목</Typography>
          </Grid>
          <Grid item xs={10}> 
            <input hidden="hidden" />           
            <TextField
              onChange={(e) => {
                // if (data.title) {setTitleError(false)}
                handle(e)
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                }
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
            <Typography className={classes.groupLabel}>인원수</Typography>
          </Grid>
          <Grid item xs={1.5}>            
            <TextField
              select
              onChange={(e) => {
                // if (data.title) {setTitleError(false)}
                handle(e)
              }}
              value={data.numOfPeople}              
              // label="제목"
              name="numOfPeople"
              fullWidth
              required
              // error={titleError}
              className={[classes.smallInput, classes.field].join(' ')}
              sx={{flexGrow: 2, textAlign: "center"}}
              InputProps={{maxLength: 5}}
            >             
              <MenuItem sx={{display: 'flex', justifyContent: 'center'}} value={2} >2</MenuItem>
              <MenuItem sx={{display: 'flex', justifyContent: 'center'}} value={3} >3</MenuItem>
              <MenuItem sx={{display: 'flex', justifyContent: 'center'}} value={4} >4</MenuItem>
              <MenuItem sx={{display: 'flex', justifyContent: 'center'}} value={5} >5</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={1.5}>
            <Typography className={classes.groupLabel}>관심사</Typography>
          </Grid>
          <Grid item xs={7}>
            <TagsInput
              className={[classes.smallInput, classes.field].join(' ')}
              onChange={(e) => handle(e)}              
              selectedTags={handleSelecetedTags}
              fullWidth
              variant="outlined"
              id="tags"
              name="tags"
              placeholder="Press Enter"
              // label="tags
              state={state}
            />            
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={1.2}>
            <Typography className={classes.groupLabel}>내용</Typography>
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
        <Grid container sx={{ mt: '20px'}}>
          <Grid item xs={1.2}>
            <Typography className={classes.groupLabel}>파일 첨부</Typography>
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
              <Box sx={{ mt: -0.2, 
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
            <Link to={'/community/group'}>
              <Button className={classes.btn}>
                <Typography className={classes.btnText}>
                  목록으로
                </Typography>
              </Button>
            </Link>
            :
            <Link to={-1}>
              <Button className={classes.btn}>
                <Typography className={classes.btnText}>
                  본문으로
                </Typography>
              </Button>
            </Link>}
          </Grid>
          <Grid item sx={{ ml: 1}}>
              <Button type="submit" className={classes.btn}>
                <Typography className={classes.btnText}>
                  작성하기
                </Typography>
              </Button>
          </Grid>
        </Grid>
      </form>
  )
};