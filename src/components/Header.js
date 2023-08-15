import React, {useState} from "react";
import styled from "styled-components";
import {FaUserCircle} from "react-icons/fa";
import {blackBg, blurColor, gray01, gray02, primary, whiteBg} from "../constants/color";
import {userInfo} from "../constants/dummy";
import {PiFinnTheHumanFill} from "react-icons/pi";
import NicknameChange from "./modal/NicknameChange";

const Header = () => {

    const [hover, setHover] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return(
        <StyledHeader>
            <h1>SavingsBook</h1>
            <div className="user-info-wrap"
                onMouseOver={() => setHover(true)}
            >
                <FaUserCircle className="user-icon" />
                {userInfo.nickname} 님
                {hover &&
                    <div className="hover-wrap"
                         onMouseOut={() => setHover(false)}
                    >
                        <PiFinnTheHumanFill className="hover-icon" />
                        <span className="hover-user">{userInfo.nickname}</span>
                        <button className="nickname-btn" type="button" onClick={() => setIsOpen(true)}>닉네임 변경</button>
                    </div>
                }
            </div>
            {isOpen && <NicknameChange nick={userInfo.nickname} setIsOpen={setIsOpen} />}
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${whiteBg};
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 0 15px ${blurColor};
  h1{
    font-size: 24px;
    //font-family: "TheJamsil5Bold", sans-serif;
    letter-spacing: -1px;
    color: ${primary};
  }
  .user-info-wrap{
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-family: "TheJamsil5Bold", sans-serif;
    color: ${blackBg};
    position: relative;
    .user-icon{
      font-size: 28px;
      margin-right: 8px;
    }
  }
  .hover-wrap{
    width: 150px;
    position: absolute;
    left: 50%; top: 130%;
    transform: translateX(-50%);
    background-color: ${whiteBg};
    text-align: center;
    padding: 20px;
    z-index: 9;
    border-radius: 20px;
    box-shadow: 0 0 15px ${blurColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${primary};
    .hover-icon{
      font-size: 50px;
      color: ${primary};
    }
    .hover-user{
      font-size: 18px;
      font-family: "TheJamsil5Bold", sans-serif;
    }
    .nickname-btn{
      width: 80%;
      background-color: ${primary};
      font-size: 12px;
      color: ${whiteBg};
      border-radius: 8px;
      margin-top: 20px;
      padding: 5px;
      cursor: pointer;
    }
  }
`;

export default Header;
