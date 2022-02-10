import React from 'react';
import './Findaccount.css';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import logo from './img/logo.png';

class FindIdView extends React.Component {
  render() {
    return <FindId></FindId>
  }
}
export default FindIdView

class FindId extends React.Component{
  render() {
    return (
      <div className='Container'>
        <FindEmail>
          <Logo src={ logo }></Logo>
          <Title className='TitleFont'>Find Email</Title>
          <FindForm>
            <NameArea>
              <Grid container>
                <Grid item xs={4} mt={2.5}>
                  <Name className='NameFont'>이름</Name>
                </Grid>
                <Grid item xs={8} mt={1.7}>
                  <NameTextBox>
                    <TextField
                      className='TextBoxStyle'
                      size="small"
                      ></TextField>
                  </NameTextBox>
                </Grid>
              </Grid>
            </NameArea>
            <PhoneArea>
              <Grid container>
              <Grid item xs={4} mt={2.5}>
                <Phone className='NameFont'>휴대폰 번호</Phone>
              </Grid>
              <Grid item xs={6} mt={1.7}>
                <PhoneTextBox>
                    <TextField className='TextBoxStyle2'
                    size="small"></TextField>
                </PhoneTextBox>
              </Grid>
              <Grid item xs={2} mt={1}>
                <PhoneButton>인증</PhoneButton>
              </Grid>
              </Grid>
            </PhoneArea>
            <CertifiedArea>
            <Grid container>
              <Grid item xs={4} mt={2.5}>
                <Phone className='NameFont'>인증번호</Phone>
              </Grid>
              <Grid item xs={6} mt={1.7}>
                <PhoneTextBox>
                    <TextField className='TextBoxStyle2'
                    size="small"></TextField>
                </PhoneTextBox>
              </Grid>
              <Grid item xs={2} mt={1}>
                <PhoneButton>확인</PhoneButton>
              </Grid>
              </Grid>
            </CertifiedArea>
          </FindForm>
          <InformId>
            <span className='InformFont'>등록된 이메일은</span>
            <span className='InformEmail'>wjd***@gmail.com</span>
            <span className='InformFont'>입니다</span>
          </InformId>
          <LoginButtonArea>
            <LoginButton>로그인하기</LoginButton>
          </LoginButtonArea>
          <OtherMenu>
            <Joinmenu>회원가입</Joinmenu>
            <FindPasswordmenu>비밀번호찾기</FindPasswordmenu>
          </OtherMenu>
          </FindEmail>
      </div>
    )
  }
}
const FindEmail = styled.div`
  width: 749px;
  margin-top: 106px;
  display: flex;
  flex-direction: column;
  padding: 36px 39px;
  align-items: center;
  height: 50vh;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 4px #00000040;
`
const Logo = styled.img`
  width: 170px;
  height: 60px;
  position: relative;
  align-self: flex-start;
`
const Title = styled.div`
  min-height: 51px;
  width: 400px;
  letter-spacing: 0;
`
const FindForm = styled.div`
  height: 250px;
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  width: 400px;
  flex-direction: column;
`
const InformId = styled.div`
  min-height: 51px;
  margin-top: 20px;
  width: 400px;
  letter-spacing: 0;
  
`
const LoginButtonArea = styled.div`
  min-height: 51px;
  margin-top: 20px;
  width: 400px;
  letter-spacing: 0;
`
const OtherMenu = styled.div`
  min-height: 51px;
  margin-top: 10px;
  width: 400px;
  letter-spacing: 0;
  display: flex;
`
const NameArea = styled.div`
  width: 100%;
  height: 25%;
`
const PhoneArea = styled.div`
  width: 100%;
  height: 25%;
`
const CertifiedArea = styled.div`
  width: 100%;
  height: 25%;
`
const Name = styled.div`
  width : 100%;
  height: 100%;
`
const NameTextBox = styled.div`
  width : 100%;
  height: 100%;
`

const Phone = styled.div`
  width : 100%;
  height: 100%;
`
const PhoneTextBox = styled.div`
  width : 100%;
  height: 100%;
`
const PhoneButton = styled.button`
  height: 40px;
  align-self: flex-end;
  margin-left: 5px;
  margin-top: 5px;
  min-width: 55px;
  background-image: url(./img/rectangle-82.svg);
  background-size: 100% 100%;
  background-color: #ffffff;
  border-radius: 10px;
`
const LoginButton = styled.button`
  height: 50px;
  min-width: 400px;
  background-image: url(./img/rectangle-78.svg);
  background-size: 100% 100%;
  background-color: #ffffff;
  border-radius: 10px;
`

const Joinmenu = styled.div`
  min-height: 21px;
  min-width: 52px;
  letter-spacing: 0;
`
const FindPasswordmenu = styled.div`
  min-height: 21px;
  margin-left: 240px;
  min-width: 81px;
  letter-spacing: 0;
`