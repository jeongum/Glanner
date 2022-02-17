import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';
import { boardStyles } from '../../Board.styles';
import { useLocation, useNavigate } from 'react-router-dom';

const useStyles = makeStyles(boardStyles);
export default function FloatingActionButtons() {
  
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    pathname.includes('/board/') &&
      <Button
        onClick={() => {          
          if (pathname.includes('/board/free/')) {
            navigate(`/community/free/`)
          } else if (pathname.includes('/board/group/')) {
            navigate(`/community/group/`)
          } else if (pathname.includes('/board/notice/')) {
            navigate(`/community/notice/`)
          }
        }}
        variant="extended"
        sx={{
          margin: 0,        
          bottom: 60,
          left: 330,
          position: 'fixed',
          background: 'rgba(149, 149, 149, 0.1)',
          border: '1px solid #959595',
          borderRadius: '10px',
          width: '90px',
          height: '40px',
          fontFamily: 'Noto Sans CJK KR',
          fontWeight: 'medium',
          color: "#8C7B80",          
          padding: 0,
          "&:hover": {
            color: "#FFFFFF",
            backgroundColor: "#8C7B80",
            borderColor: "#8C7B80",
            boxShadow: "none",
          }                   
        }}
      >
      <Typography className={classes.btnText}>
          목록으로
        </Typography>
      </Button>
      
    )
}