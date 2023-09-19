import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {gray01, primary, whiteBg} from "../../constants/color";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {authFetch} from "../../apis/axios";

const WithdrawalModal = ({
    setIsOutOpen,
    setIsOpen
}) => {

    const navigate = useNavigate();
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [userAnswer, setUserAnswer] = useState("");

    useEffect(() => {
        getQAData();
    }, []);

    const handleAnswer = (event) => {
        if(event.target.id === "answer"){
            setUserAnswer(event.target.value);
        }
    }

    const handleWithdrawal = () => {
        if(userAnswer === answer){
            delUser();
        }else{
            setIsOutOpen(false);
            toast.error("회원 탈퇴에 실패했습니다.");
            setIsOpen(false);
            navigate("/");
        }
    }


    // api 1006
    const getQAData = async () => {
        try{
            const res = await authFetch.get(`/api/user/randomquiz`);
            if(res.data.result === "Y"){
                console.log(res.data.data.answer);
                setQuestion(res.data.data.question);
                setAnswer(res.data.data.answer);
            }
        }catch (err){
            console.log(err);
        }
    }
    // api 1005
    const delUser = async () => {
        try{
            const res = await authFetch.delete(`/api/user/deleteuser`);
            if(res.data.result === "Y"){
                setIsOutOpen(false);
                toast.success("회원 탈퇴에 성공했습니다.");
                setIsOpen(false);
                navigate("/login");
            }
        }catch (err){
            console.log(err)
        }
    }

    return(
        <StyledModal>
            <div className="modal-inner">
                <h3>회원 탈퇴 문제</h3>
                <p>{question}</p>
                <input
                    type="text"
                    id="answer"
                    onChange={handleAnswer}
                    value={userAnswer}
                />
                <div className="modal-btn-wrap">
                    <button type="button" className="register-btn" onClick={handleWithdrawal}>탈퇴</button>
                    <button type="button" className="cancel-btn" onClick={() => setIsOutOpen(false)}>취소</button>
                </div>
            </div>
        </StyledModal>
    )
}

const StyledModal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
  .modal-inner{
    z-index: 9;
    background-color: ${whiteBg};
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    width: 425px;
    text-align: center;
    padding: 40px 20px 30px;
    border-radius: 20px;
    h3{
      font-size: 18px;
      margin-bottom: 25px;
    }
    p{
      line-height: 1.3;
      margin-bottom: 20px;
      font-size: 18px;
    }
    #answer{
      width: 100%;
      border-radius: 8px;
      border: 1px solid ${gray01};
      font-size: 16px;
      padding: 8px 10px;
      outline: none;
    }
    .modal-btn-wrap{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 30px;
      button{
        display: block;
        width: 49%;
        border-radius: 8px;
        border: 1px solid ${primary};
        padding: 8px 0;
        background-color: ${primary};
        color: ${whiteBg};
        cursor: pointer;
        &.cancel-btn{
          background-color: ${whiteBg};
          color: ${gray01};
          border: 1px solid ${gray01};
        }
      }
    }
    small{
      font-size: 10px;
      display: block;
      margin: 3px 0 0 3px;
      text-align: left;
      color: ${gray01};
    }
  }
`;

export default WithdrawalModal;
