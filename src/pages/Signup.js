import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import toast, { Toaster } from 'react-hot-toast';
import {blurColor, gray01, gray02, primary, whiteBg} from "../constants/color";
import {useNavigate} from "react-router-dom";
import {authFetch} from "../apis/axios";

const Signup = () => {

    let engNum =  /^[a-zA-Z0-9]*$/;
    let koEngNum = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
    const navigate = useNavigate();
    const userRef = useRef();
    const nickRef = useRef();
    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if(password.length >= 6 && password !== "" && confirmPw !== "" && password === confirmPw){
            setDisabled(true);
        }else{
            setDisabled(false);
        }
    }, [password, confirmPw]);

    const handleSignup = (event) => {
        if(event.target.id === "username"){
            setUsername(event.target.value);
        }else if(event.target.id === "nickname"){
            setNickname(event.target.value);
        }else if(event.target.id === "password"){
            setPassword(event.target.value);
        }else if(event.target.id === "confirmPw"){
            setConfirmPw(event.target.value);
        }
    }

    const handleSubmit = async () => {
        if(!engNum.test(username) || username === ""){
            toast.error("아이디를 확인해주세요.");
            userRef.current.focus();
        }else if(!koEngNum.test(nickname) || nickname === ""){
            toast.error("닉네임을 확인해주세요.");
            nickRef.current.focus();
        }else{
            await signupApi();
        }
    }

    // api 1002
    const signupApi = async () => {
        const body = {
            username: username,
            password: password,
            nick_name: nickname
        }
        try{
            const res = await authFetch.post(`/api/user/signup`, body);
            if(res.data.result === "Y"){
                toast.success("회원가입이 완료되었습니다.");
                navigate("/login");
            }
        }catch (err){
            console.log(err);
        }
    }

    return(
        <StyledLogin>
            <h2 className="login-tit">Signup</h2>
            <form className="login-input-wrap">
                <div className="login-input-cont">
                    <label>Username</label>
                    <input
                        ref={userRef}
                        type="text"
                        placeholder="Create your Username"
                        id="username"
                        maxLength={12}
                        value={username}
                        onChange={handleSignup}
                    />
                    <small>* 12글자 이내 영어, 숫자만 입력</small>
                </div>
                <div className="login-input-cont">
                    <label>Nickname</label>
                    <input
                        ref={nickRef}
                        type="text"
                        placeholder="Create your Nickname"
                        id="nickname"
                        maxLength={8}
                        value={nickname}
                        onChange={handleSignup}
                    />
                    <small>* 8글자 이내 한글, 영어, 숫자만 입력</small>
                </div>
                <div className="login-input-cont">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Create your Password"
                        id="password"
                        value={password}
                        onChange={handleSignup}
                    />
                    <small>* 6글자 이상 입력</small>
                </div>
                <div className="login-input-cont">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        id="confirmPw"
                        value={confirmPw}
                        onChange={handleSignup}
                    />
                    <small>* 비밀번호 확인</small>
                </div>
                <button disabled={!disabled} onClick={handleSubmit} className="login-btn" type="button">Signup</button>
            </form>
            <p className="signup-text">Already a Member?&nbsp;&nbsp;<i onClick={() => navigate("/")}>Login Now</i></p>
        </StyledLogin>
    )
}

const StyledLogin = styled.div`
  background-color: ${whiteBg};
  width: 375px;
  padding: 40px 30px;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0 0 15px ${blurColor};
  .login-btn{
    cursor: pointer;
    display: block;
    width: 100%;
    border-radius: 8px;
    margin-top: 40px;
    padding: 14px;
    color: ${whiteBg};
    background-color: ${primary};
    transition: .3s;
    &:disabled{
      background-color: ${gray02};
    }
  }
  .signup-text{
    margin-top: 20px;
    font-size: 16px;
    i{
      font-style: normal;
      cursor: pointer;
      color: ${primary};
    }
  }
  small{
    font-size: 10px;
    display: block;
    margin: 3px 0 0 3px;
    text-align: left;
    color: ${gray01};
  }
`;

export default Signup;
