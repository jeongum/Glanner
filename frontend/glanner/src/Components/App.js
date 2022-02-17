import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import Router from "../Components/Router";
import SignupComponent from "../Routes/Signup/SignupComponent";
import LoginComponent from "../Routes/Signup/LoginComponent";
import { useSelector } from "react-redux";
import { useState } from "react";

const MainContainer = styled.div`
  text-align: center;
  height: 100%;
  width: 100%;
`;

const RouterContainer = styled.div`
  position: absolute;
  left: 280px;
  width: 80%;
  max-width: 100%;
  min-width: 900px;
  margin: 20px;
  white-space: normal;
  align-content: center;
  min-height: 400px;
  height: 95%;
`;

function App() {
  
  // const token = localStorage.getItem('token')
  const [signupPage, setSignupPage] = useState(true);
  const isLogin = useSelector(state => state.auth.isLogin);
  const token = localStorage.getItem('token')
  if (!token) {
    return signupPage ? <SignupComponent signupPage={signupPage} setSignupPage={setSignupPage} /> : <LoginComponent signupPage={signupPage} setSignupPage={setSignupPage} />
  }
  return (
    <MainContainer>      
      <RouterContainer>
        <Router />
      </RouterContainer>
      <GlobalStyles />
    </MainContainer>
  );
}

export default App;
