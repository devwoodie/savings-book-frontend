import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {blackBg, blurColor, primary, whiteBg} from "../constants/color";
import {goal} from "../constants/dummy";
import toast from "react-hot-toast";

const Goal = () => {

    let onlyNum =  /^[0-9]*$/;
    const [goalEmpty, setGoalEmpty] = useState(false);
    const [goalAmount, setGoalAmount] = useState("");
    const [isFixed, setIsFixed] = useState(false);
    let resultGoal = goalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    useEffect(() => {
        setGoalAmount(goal.goal_money);
    }, []);
    useEffect(() => {
        if(goalAmount === ""){
            setGoalEmpty(true);
        }else{
            setGoalEmpty(false);
        }
    }, [goalAmount])

    const handleInput = (event) => {
        if(event.target.id === "goalMoney"){
            setGoalAmount(event.target.value);
        }
    }
    const handleSubmit = () => {
        if(goalAmount !== "" && onlyNum.test(goalAmount)){
            // api call
            setIsFixed(false);
            toast.success("저장되었습니다.");
        }else{
            toast.error("금액을 확인해주세요.");
        }
    }

    return(
        <StyledWrapper>
            <h2>이번 달 목표 지출 금액</h2>
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
