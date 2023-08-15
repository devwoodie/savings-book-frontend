import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {blurColor, primary, whiteBg} from "../constants/color";
import {historyAll} from "../constants/dummy";

const HistoryAll = () => {

    const comma = /\B(?=(\d{3})+(?!\d))/g;
    const [historyIn, setHistoryIn] = useState("");
    const [historyOut, setHistoryOut] = useState("");

    useEffect(() => {
        setHistoryIn(historyAll?.in);
        setHistoryOut(historyAll?.out);
    }, [historyIn, historyOut]);

    return(
        <StyledWrapper>
            <div className="history-wrap">
                <p>이번 달 총 수입</p><span>{historyIn.toString().replace(comma, ",")} <i>원</i></span>
            </div>
            <div className="history-wrap">
                <p>이번 달 총 지출</p><span>{historyOut.toString().replace(comma, ",")} <i>원</i></span>
            </div>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
  background-color: ${primary};
  padding: 20px;
  border-radius: 16px;
  width: 100%;
  margin: 16px 0;
  box-shadow: 0 0 15px ${blurColor};
  .history-wrap{
    color: ${whiteBg};
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:first-child{
      padding-bottom: 10px;
    }
    &:last-child{
      padding-top: 10px;
    }
    span{
      font-family: "TheJamsil5Bold", sans-serif;
      i{
        font-size: 16px;
        font-family: "HakgyoansimWoojuR", sans-serif;
      }
    }
  }
`

export default HistoryAll;
