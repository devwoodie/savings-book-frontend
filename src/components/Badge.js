import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {blurColor, cafe, income, pleasure, whiteBg} from "../constants/color";
import {GiTrophy} from "react-icons/gi";
import {authFetch} from "../apis/axios";

const Badge = () => {

    const [badgeData, setBadgeData] = useState({});

    useEffect(() => {
        getBadge();
    }, []);

    // api 1201
    const getBadge = async () => {
        try{
            const res = await authFetch.get(`/api/main/badge`);
            if(res.data.result === "Y"){
                setBadgeData(res.data.data);
            }
        }catch (err){
            console.log(err);
        }
    }

    return(
        <StyledWrapper>
            {/*<p className="info-text">뱃지는 아직 준비중이에요.</p>*/}
            <h2>목표 달성 뱃지</h2>
            {badgeData &&
                <ul className="badge-list">
                    <li className={badgeData?.month_1 === 1 ? "y" : ""}>
                        <GiTrophy className="trophy" />
                        <span>1달 목표 달성</span>
                    </li>
                    <li className={badgeData?.month_3 === 1 ? "y" : ""}>
                        <GiTrophy className="trophy" />
                        <span>3달 목표 달성</span>
                    </li>
                    <li className={badgeData?.month_6 === 1 ? "y" : ""}>
                        <GiTrophy className="trophy" />
                        <span>6달 목표 달성</span>
                    </li>
                    <li className={badgeData?.month_12 === 1 ? "y" : ""}>
                        <GiTrophy className="trophy" />
                        <span>12달 목표 달성</span>
                    </li>
                </ul>
            }
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
  background-color: ${whiteBg};
  padding: 20px;
  border-radius: 16px;
  width: 100%;
  height: 128px;
  box-shadow: 0 0 15px ${blurColor};
  position: relative;
  overflow: hidden;

  .info-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
    z-index: 9;
  }

  h2 {
    font-size: 18px;
  }

  .badge-list {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      &.y{
        .trophy {
          color: ${pleasure};
        }
        span{
          font-weight: bold;
          color: #000;
        }
      }
      .trophy {
        font-size: 40px;
        color: rgba(176, 176, 176, 0.45);
      }
      span {
        display: block;
        text-align: center;
        margin-top: 5px;
        font-size: 12px;
        color: rgba(176, 176, 176, 0.67);
      }
    }
  }
`

export default Badge;
