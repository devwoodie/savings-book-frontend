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
    const [question, setQuestion] = useState("국립국어원에서는 ‘스펙업’을 대신할 우리말 순화어로 ‘이것 쌓기’를 선정했습니다. 이것은 ‘일정한 자격이나 조건을 갖춘다’는 뜻의 우리말과 ‘헤아리다’를 뜻하는 한자어의 합성어인데요. 스스로 일을 해낼 만한 능력을 뜻하는 이것은 무엇일까요?");
    const [answer, setAnswer] = useState("깜냥");
    const [userAnswer, setUserAnswer] = useState("");

    useEffect(() => {
        getQAData();
    }, []);

    const handleAnswer = (event) => {
        if(event.target.id === "answer"){
            setUserAnswer(event.target.value);
        }
    }

    // api 1006
    const getQAData = async () => {
        try{
            const res = await authFetch.get(`/api/user/randomquiz`);
            console.log(res.data)
        }catch (err){
            console.log(err);
        };
    }

    const handleWithdrawal = () => {
        if(userAnswer === answer){
            setIsOutOpen(false);
            toast.success("회원 탈퇴에 성공했습니다.");
            setIsOpen(false);
            navigate("/login");
        }else{
            setIsOutOpen(false);
            toast.error("회원 탈퇴에 실패했습니다.");
            setIsOpen(false);
            navigate("/");
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
