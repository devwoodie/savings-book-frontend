import React, {useState} from "react";
import styled from "styled-components";
import toast, { Toaster } from 'react-hot-toast';
import {blurColor, gray01, primary, whiteBg} from "../constants/color";
import {useNavigate} from "react-router-dom";
import {authFetch} from "../apis/axios";
import {useDispatch} from "react-redux";
import {setToken} from "../store/reducers/userSlice";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        if(event.target.id === "username"){
            setUsername(event.target.value);
        }else if(event.target.id === "password"){
            setPassword(event.target.value);
        }
    }

    // api 1001
    const loginApi = async () => {
        const body = {
            username: username,
            password: password
        }
        try{
            const res = await authFetch.post(`/api/user/login`, body);
            if(res.data.result === "Y"){
                toast.success("로그인 성공");
                localStorage.setItem("access-token", res.data.access_token);
                dispatch(setToken(res.data.access_token));
                setTimeout(() => {
                    navigate("/");
                }, 300);
            }else{
                toast.error("아이디 또는 비밀번호를 확인해주세요.");
            }
        }catch (err){
            toast.error("아이디 또는 비밀번호를 확인해주세요.");
        }
    }

    return(
        <StyledLogin>
            <h2 className="login-tit">Login</h2>
            <form className="login-input-wrap">
                <div className="login-input-cont">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Enter your Username"
                        id="username"
                        value={username}
                        onChange={handleLogin}
                    />
                </div>
                <div className="login-input-cont">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your Password"
                        id="password"
                        value={password}
                        onChange={handleLogin}
                    />
                    <p className="forgot-text">Forgot Password?</p>
                </div>
                <button className="login-btn" type="button" onClick={() => loginApi()}>Login</button>
            </form>
            <p className="signup-text">Not a Member?&nbsp;&nbsp;<i onClick={() => navigate("/signup")}>Signup Now</i></p>
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
  .forgot-text{
    text-align: left;
    font-size: 14px;
    margin: 5px 0 0 5px;
    color: ${gray01};
    cursor: pointer;
  }
  .login-btn{
    cursor: pointer;
    display: block;
    width: 100%;
    border-radius: 8px;
    margin-top: 40px;
    padding: 14px;
    color: ${whiteBg};
    background-color: ${primary};
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
`;

export default Login;
