import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

export default function BoardListButton() {
  return (
    // <Box sx={{ '& > :not(style)': { m: 1 } }}>
      
      <Fab variant="extended" size="medium" color="primary" aria-label="add">        
        목록으로
      </Fab>
      
    // </Box>
  );
}