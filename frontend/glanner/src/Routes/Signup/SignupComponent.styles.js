import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Box, Grid, InputLabel, Link, TextField, Typography } from "@mui/material";
import logo from "./logo.png";


// 회원가입, 연락처 인증 버튼 
export const SignupPageButton = styled(Button)({
  height: 38,
  border: '1px solid #8C7B80',
  boxSizing: 'border-box',
  filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))',
  borderRadius: '10px',
  fontFamily: 'Noto Sans KR',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '36px',
  /* identical to box height */
  color: '#5F5F5F',
  '& .MuiButtonBase-input': {
    height: 0
  }
});

// 로그인, 아이디 찾기, 비밀번호 찾기 버튼(링크)
export const SignupPageLink = styled(Link)({    
  textDecoration: 'none', 
  color: '#6F6F6F', 
  fontFamily: 'Noto Sans KR',
  // fontWeight: '500'
  fontWeight: 'normal'
});

// 이름, 이메일, 비밀번호, 비밀번호 확인, 연락처 라벨(label)
export const SignupPageLabel = styled(InputLabel)({
  display:"flex", 
  justifyContent:"end", 
  marginRight: '1rem', 
  fontFamily: 'Noto Sans KR',
  maxWidth: 'auto'   
  
});


// 이름, 이메일, 비밀번호, 비밀번호 확인, 연락처 입력창(input)
export const SignupInput = styled(TextField)({
  height: '40',
  background: '#FFFFFF',
  border: '1px solid #E5E5E5',
  boxSizing: 'border-box',
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.16)',
  borderRadius: '10px',
  '& .MuiInputBase-input': {
    height: 5
  },
  '& legend': {
    width: 0
  }
});

// 글래너 로고
export const Copyright = () => {
  return (
    <>
      <Box sx={{ position: 'absolute', bottom: 10, right: 10}}>
        <Grid container direction="column" alignItems="end">
          <Grid item>
            <img src={logo} alt='logo' style={{width: 130}} />
          </Grid>
          {/* <Grid item>
            <Typography variant="body2" color="text.secondary" align="center">          
              {'Copyright © '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Grid> */}
        </Grid>      
      </Box>
    </>
  );
}