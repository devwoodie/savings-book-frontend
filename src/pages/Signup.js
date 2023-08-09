import React from "react";
import styled from "styled-components";
import toast, { Toaster } from 'react-hot-toast';
import {gray01, gray02, primary} from "../constants/color";
import {useNavigate} from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate();

    return(
        <StyledLogin>
            <h2 className="login-tit">Signup</h2>
            <form className="login-input-wrap">
                <div className="login-input-cont">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Create your Username"
                    />
                </div>
                <div className="login-input-cont">
                    <label>Nickname</label>
                    <input
                        type="text"
                        placeholder="Create your Nickname"
                    />
                </div>
                <div className="login-input-cont">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Create your Password"
                    />
                </div>
                <div className="login-input-cont">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                    />
                </div>
                <button className="login-btn" type="button">Signup</button>
            </form>
            <p className="signup-text">Already a Member?&nbsp;&nbsp;<i onClick={() => navigate("/")}>Login Now</i></p>
        </StyledLogin>
    )
}

const StyledLogin = styled.div`
  background-color: #fff;
  width: 425px;
  padding: 40px 30px;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  .login-btn{
    cursor: pointer;
    display: block;
    width: 100%;
    border-radius: 8px;
    margin-top: 40px;
    padding: 14px;
    color: #fff;
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
`;

export default Signup;
