import React from "react";
import styled from "styled-components";
import {blurColor, cafe, pleasure, whiteBg} from "../constants/color";
import {GiTrophy} from "react-icons/gi";
import {BsTrophyFill} from "react-icons/bs";

const Badge = () => {
    return(
        <StyledWrapper>
            <p class="info-text">뱃지는 아직 준비중이에요.</p>
            <h2>목표 달성 뱃지</h2>
            <ul className="badge-list">
                <li>
                    <GiTrophy className="b trophy" />
                    <span>목표</span>
                </li>
                <li>
                    <BsTrophyFill className="a trophy" />
                    <span>목표</span>
                </li>
                <li>
                    <GiTrophy className="b trophy" />
                    <span>목표</span>
                </li>
                <li>
                    <BsTrophyFill className="a trophy" />
                    <span>목표</span>
                </li>
            </ul>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
  background-color: ${whiteBg};
  padding: 20px;
  border-radius: 16px;
  width: 100%; height: 128px;
  margin: 16px 0;
  box-shadow: 0 0 15px ${blurColor};
  position: relative;
  overflow: hidden;
  .info-text{
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    display: block;
    z-index: 9;
  }
  h2 {
    font-size: 18px;
    filter: blur(3px);
    -webkit-filter: blur(3px);
  }
  .badge-list{
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    filter: blur(3px);
    -webkit-filter: blur(3px);
    li{
      .trophy{
        font-size: 36px;
      }
      .a{color: ${pleasure}}
      .b{color: ${cafe}}
      span{
        display: block;
        text-align: center;
        margin-top: 5px;
      }
    }
  }
`

export default Badge;
