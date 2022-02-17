import * as React from 'react';
import {CssBaseline, Paper, Box, Grid, Typography} from '@mui/material';
import initialScreen from "./initial_screen.png";
import { SignupPageButton, SignupPageLink, SignupInput, SignupPageLabel, Copyright } from './SignupComponent.styles';
import { useForm } from "react-hook-form";
import "./SignupComponent.scoped.css";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth';

const LoginComponent = ({setSignupPage, signupPage}) => {  
    const { register, formState: {errors}, handleSubmit } = useForm();

    const onSubmit = (data) => {
        axios(`api/auth`, 
        {
            method: 'POST',
            data: data
        })
            .then(res =>{
                localStorage.setItem('token', res.data.idToken)
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
                alert(err)
            })
    }
  return (
      <Grid container component="main" sx={{ height: '100vh', width: '100%', fontFamily: "Noto Sans KR",}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={8}
          sx={{
            backgroundImage: `url('${initialScreen}')`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#8C7B80',
            // backgroundColor: (t) =>
            // t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={12} md={4} component={Paper} elevation={6} square backgroundColor="#F6F6F6" sx={{height: "100%"}}>
          <Box
            sx={{
              mt: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Typography component="h1" variant="h4" color="#6F6F6F" fontFamily="Rozha One">
              Log In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%'}} method="POST">

              {/* 이메일 폼 */}
              <Grid container direction='row' alignItems='center' sx={{ mt: '1em'}}>
                <Grid item xs={4} >
                  <SignupPageLabel htmlFor='email'>이메일</SignupPageLabel>
                </Grid>
                <Grid item xs={6}>
                  <SignupInput
                    required
                    fullWidth
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    {...register('email', {required: true, pattern: /^\S+@\S+$/i})}            
                    />                
                </Grid>
                {errors.email && errors.email.type === "required" && <p className='error-text'>이메일을 입력해주세요</p>}
                {errors.email && errors.email.type === "pattern" && <p className='error-text'>이메일 형식으로 입력해주세요</p>}
              </Grid>


              {/* 패스워드 폼 */}
              <Grid container direction='row' alignItems='center' sx={{ mt: '1em'}}>
                <Grid item xs={4} >
                  <SignupPageLabel htmlFor='password'>비밀번호</SignupPageLabel>
                </Grid>
                <Grid item xs={6}>
                  <SignupInput
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register('password', {required: true, minLength: 6})}
                  />
                </Grid>
                {errors.password && errors.password.type === "required" && <p className='error-text'>비밀번호를 입력해주세요</p>}
                {errors.password && errors.password.type === "minLength" && <p className='error-text'>비밀번호를 6자 이상으로 입력해주세요</p>}
              </Grid>              

              <Grid container sx={{mt: '1em'}}>

                {/* 로그인 버튼  */}
                <Grid item xs={4} />
                <Grid item xs={6}>
                  <SignupPageButton type="submit" sx={{ width: '100%'}}>
                    로그인
                  </SignupPageButton>
                </Grid>
              </Grid>



              <Grid container sx={{mt: '1em', justifyContent: 'center'}}>

                {/* 로그인 페이지 이동 링크 */}
                <Grid item xs={3} />
                <Grid item xs={3}>
                    <SignupPageLink 
                        onClick={(e) => {                        
                            e.preventDefault();
                            setSignupPage(!signupPage)
                        }} 
                        href="#" 
                        variant="body2" 
                        sx={{fontWeight: '600'}}
                        >회원가입
                    </SignupPageLink>
                </Grid>

                {/* 아이디 찾기, 비밀번호 찾기 링크 */}
                <Grid item>
                  <SignupPageLink to="/" variant="body2" sx={{color: '#959595', m: '0.5em'}}>
                    아이디 찾기                                      
                  </SignupPageLink>
                  <span style={{border: '1px solid #E5E5E5',transform: 'rotate(90deg)'}}></span>
                
                  <SignupPageLink to="/" variant="body2" sx={{color: '#959595', m: '0.5em'}}>
                    비밀번호 찾기
                  </SignupPageLink>                
                </Grid>

              </Grid>
              <Copyright />
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
};

export default LoginComponent;