import React from 'react';
import './Login.css';
import styled from "styled-components";
import img from "./img/test1.png";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

class MainView extends React.Component{
  render() {
    return <Login {...screenData} />;
  }
}

export default MainView;
class Login extends React.Component {
  render() {
    const {
      image1,
      spanText1,
      spanText2,
      spanText3,
      spanText4,
      text4,
      text3,
      login,
      text7,
      text8,
      text5,
      text6,
      // glanner,
    } = this.props;

    return (
      <div className="container-center-horizontal">
        <LeftSide>
          <ImageArea>
            <BackImage></BackImage>
            <MainImage src={image1}></MainImage>
          </ImageArea>
          <TextArea>
            <Text1>
              <span className="font_bold_text">{ spanText1 }</span>
              <span className="font_notbold_text">{ spanText2 }</span>
            </Text1>
            <Text2>
            <span className="font_bold_text">{ spanText3 }</span>
              <span className="font_notbold_text">{ spanText4 }</span>
            </Text2>
          </TextArea>
        </LeftSide>
        <RightSide>
          <LoginSide>
            <LoginTitle>
              <label className="font_login">{ login }</label>
            </LoginTitle>
            <LoginEmail>
              <Grid container spacing={2}>
                <Grid item xs={2} mt={2}>
                  <label className="font_email">{text4}</label>
                </Grid>
                <Grid item xs = {6}>
                  <TextField label="Email"></TextField>
                </Grid>
              </Grid>
            </LoginEmail>
            <LoginPassword>
              <Grid container spacing={2}>
                <Grid item xs={2} mt={2}>
                <label className="font_password">{ text3 }</label>
                </Grid>
                <Grid item xs={6}>
                <TextField label="Password"></TextField>
                </Grid>
              </Grid>
            </LoginPassword>
            <LoginButton className='input_type font_button'>{ text7 }</LoginButton>
            <LoginMenu>
              <JoinText className='font_jointext'>{ text8 }</JoinText>
              <FindidText className='font_FindidText'>{ text5 }</FindidText>
              <LineImg src="./img/line-17"></LineImg>
              <FindPasswordText className='font_FindPasswordText'>{ text6 }</FindPasswordText>
            </LoginMenu>
          </LoginSide>
        </RightSide>
      </div>
    );
  }
}

const LeftSide = styled.div`
  width: 75vw;
  height:100vh;
  background-color:#8c7b80;
`
const RightSide = styled.div`
  width: 25vw;
  height:100vh;
  background-color:#f2f2f2;
`
const BackImage = styled.div`
  position: absolute;
  width: 926px;
  height:521px;
  top: 30px;
  left:30px;
  background-color:#e5e5e5;
`
const MainImage = styled.img`
  position: absolute;
  width: 946px;
  height: 541px;
  top: 0;
  left: 0;
  object-fit: cover;
`
const ImageArea = styled.div`
  width: 955px;
  height: 550px;
  position: relative;
  margin-top: 10%;
  margin-left: 10%;
`
const TextArea = styled.div`
  width: 955px;
  height: 350px;
  position: relative;
  margin-top: 5%;
  margin-left: 15%;
`
const Text1 = styled.div`
  min-height: 107px;
  letter-spacing: 0;
`;
const Text2 = styled.div`
  min-height: 107px;
  min-width: 536px;
  letter-spacing: 0;
`
const LoginSide = styled.div`
  text-align: center;
  margin-top: 50%;
`
const LoginTitle = styled.div`
  margin-bottom : 3%;
  margin-right: 5%;
`
const LoginEmail = styled.div`
  margin-top: 2%;
  margin-left: 20%;
`
const LoginPassword = styled.div`
  margin-top : 2%;
  margin-left: 20%;
`
const LoginButton = styled.button`
  border-radius: 5px;
  width: 50%;
  min-height: 36px;
  letter-spacing: 0;
`
const LoginMenu = styled.div`
  height: 21px;
  margin-top: 16px;
  margin-left: 30%;
  display: flex;
  align-items: center;
  min-width: 360px;
`
const JoinText = styled.div`
  min-height: 21px;
  min-width: 52px;
  letter-spacing: 0;
`
const FindidText = styled.div`
  min-height: 21px;
  margin-left: 20px;
  min-width: 68px;
  letter-spacing: 0;
`
const FindPasswordText = styled.div`
  min-height: 21px;
  margin-left: 13px;
  min-width: 81px;
  letter-spacing: 0;
`
const LineImg = styled.img`
  width: 1px;
  height: 16px;
  margin-left: 11px;
  margin-top: 1px;
  background-color: #000000;
`

const screenData = {
    image1: img,
    spanText1: "다양한 사람",
    spanText2: "들과 함께",
    spanText3: "다채로운 일상",
    spanText4: "을 꾸며보세요!",
    text4: "이메일",
    text3: "비밀번호",
    login: "Login",
    text7: "로그인",
    text8: "회원가입",
    text5: "아이디 찾기",
    text6: "비밀번호 찾기",
    glanner: "Glanner",
};