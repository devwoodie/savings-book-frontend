import React from "react";
import styled from "styled-components";
import {FaUserCircle} from "react-icons/fa";
import {blackBg, blurColor, primary, whiteBg} from "../constants/color";
import {userInfo} from "../constants/dummy";

const Header = () => {
    return(
        <StyledHeader>
            <h1>SavingsBook</h1>
            <div className="user-info-wrap">
                <FaUserCircle className="user-icon" />
                {userInfo.nickname} 님
            </div>
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //border: 1px solid ${blackBg};
  background-color: ${primary};
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 0 15px ${blurColor};
  h1{
    font-size: 24px;
    //font-family: "TheJamsil5Bold", sans-serif;
    letter-spacing: -1px;
    color: ${whiteBg};
  }
  .user-info-wrap{
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-family: "TheJamsil5Bold", sans-serif;
    color: ${whiteBg};
    .user-icon{
      font-size: 28px;
      margin-right: 8px;
    }
  }
`;

export default Header;
