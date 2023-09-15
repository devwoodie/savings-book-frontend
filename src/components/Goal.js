import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {blurColor, primary, whiteBg} from "../constants/color";
import toast from "react-hot-toast";
import {authFetch} from "../apis/axios";
import useObjToQuery from "../hooks/useObjToQuery";

const Goal = () => {
    const objToQuery = useObjToQuery();
    let onlyNum =  /^[0-9]*$/;
    const [goalEmpty, setGoalEmpty] = useState(false);
    const [goalAmount, setGoalAmount] = useState("");
    const [isFixed, setIsFixed] = useState(false);
    const resultGoal = goalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const nowYear = localStorage.getItem("nowYear");
    const nowMonth = localStorage.getItem("nowMonth");

    useEffect(() => {
        getGoalData();
    }, []);

    const handleInput = (event) => {
        if(event.target.id === "goalMoney"){
            setGoalAmount(event.target.value);
        }
    }

    const handleSubmit = () => {
        if(goalAmount !== "" && onlyNum.test(goalAmount)){
            if(goalEmpty){
                postGoalData();
            }else{
                putGoalData();
            }
        }else{
            toast.error("금액을 확인해주세요.");
        }
    }

    // api 1102
    const getGoalData = async () => {
        const body = {
            year: nowYear,
            month: nowMonth
        }
        try{
            const res = await authFetch.get(`/api/main/goal${objToQuery(body)}`);
            if(res.data.result === "Y"){
                setGoalEmpty(false);
                setGoalAmount(res.data.data.goal_money);
            }else if(res.data.code === 400){
                setGoalEmpty(true);
            }
        }catch (err){
            toast.error("에러가 발생했습니다.");
            console.log(err);
        }
    }
    // api 1103
    const postGoalData = async () => {
        const body = {
            year: nowYear,
            month: nowMonth,
            goal_money: goalAmount
        }
        try{
            const res = await authFetch.post(`/api/main/goal`, body);
            if(res.data.result === "Y"){
                setIsFixed(false);
                setGoalEmpty(false);
                toast.success("저장되었습니다.");
            }
        }catch (err){
            toast.error("에러가 발생했습니다.");
            console.log(err);
        }
    }
    // api 1104
    const putGoalData = async () => {
        const body = {
            year: nowYear,
            month: nowMonth,
            goal_money: goalAmount
        }
        try{
            const res = await authFetch.put(`/api/main/goal`, body);
            if(res.data.result === "Y"){
                setIsFixed(false);
                setGoalEmpty(false);
                toast.success("저장되었습니다.");
            }
        }catch (err){

        }
    }

    return(
        <StyledWrapper>
            <h2>{nowMonth}월 목표 지출 금액</h2>
            <p>
                {!isFixed?
                    (!goalEmpty ?
                            <><i>{resultGoal}</i> 원</> :
                            ""
                    ) :
                    <input
                        type="text"
                        id="goalMoney"
                        value={goalAmount}
                        onChange={handleInput}
                    />
                }
            </p>
            {!isFixed?
                (!goalEmpty ?
                        <button type="button" className="goal-btn" onClick={() => setIsFixed(true)}>수정</button> :
                        <button type="button" className="goal-btn" onClick={() => setIsFixed(true)}>등록</button>
                ):
                <button type="button" className="goal-btn" onClick={handleSubmit}>저장</button>
            }
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
  background-color: ${primary};
  padding: 20px 90px 20px 20px;
  border-radius: 16px;
  width: 100%;
  margin-bottom: 16px;
  color: ${whiteBg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  position: relative;
  box-shadow: 0 0 15px ${blurColor};
  h2{
    padding: 4px 0;
    font-size: inherit;
  }
  p{
    i{
      font-style: normal;
      font-size: 20px;
      font-family: "TheJamsil5Bold", sans-serif;
    }
    #goalMoney{
      font-size: 18px;
      outline: none;
      padding: 4px;
      border-radius: 4px;
      border: none;
      text-align: right;
    }
  }
  .goal-btn{
    position: absolute;
    right: 16px; top: 50%;
    transform: translateY(-50%);
    background-color: ${whiteBg};
    font-size: 14px;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
  }
`;

export default Goal;
