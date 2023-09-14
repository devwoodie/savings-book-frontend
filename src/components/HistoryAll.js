import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {blurColor, primary, whiteBg} from "../constants/color";
import {authFetch} from "../apis/axios";
import useObjToQuery from "../hooks/useObjToQuery";
import toast from "react-hot-toast";

const HistoryAll = () => {
    const objToQuery = useObjToQuery();
    const comma = /\B(?=(\d{3})+(?!\d))/g;
    const nowYear = localStorage.getItem("nowYear");
    const nowMonth = localStorage.getItem("nowMonth");
    const [historyIn, setHistoryIn] = useState("");
    const [historyOut, setHistoryOut] = useState("");

    useEffect(() => {
        getMonthTotal();
    }, []);

    // api 1101
    const getMonthTotal = async () => {
        const body = {
            year: nowYear,
            month: nowMonth
        }
        try{
            const res = await authFetch.get(`/api/main/monthtotal${objToQuery(body)}`);
            if(res.data.result === "Y"){
                setHistoryIn(res.data.data.list.in || "0");
                setHistoryOut(res.data.data.list.out || "0");
            }
        }catch (err){
            toast.error("에러가 발생했습니다.");
            console.log(err);
        }
    }

    return(
        <StyledWrapper>
            <div className="history-wrap">
                <p>이번 달 총 수입</p><span>{historyIn.toString().replace(comma, ",") || "0"} <i>원</i></span>
            </div>
            <div className="history-wrap">
                <p>이번 달 총 지출</p><span>{historyOut.toString().replace(comma, ",") || "0"} <i>원</i></span>
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
