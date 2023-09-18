import React from "react";
import styled from "styled-components";
import {FaUserCircle} from "react-icons/fa";
import {blackBg, blurColor, primary, whiteBg} from "../constants/color";

const Header = ({
    nickname
}) => {
    return(
        <StyledHeader>
            <h1>SavingsBook</h1>
            <div className="user-info-wrap">
                <FaUserCircle className="user-icon" />
                {nickname} 님
            </div>
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
    margin-right: 60px;
    .user-icon{
      font-size: 28px;
      margin-right: 8px;
      color: ${primary};
    }
  }
`;

export default Header;
