import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {gray01, primary, whiteBg} from "../../constants/color";
import toast from "react-hot-toast";
import {authFetch} from "../../apis/axios";

const NicknameChange = ({
                            nick,
                            setIsOpen
}) => {

    let koEngNum = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
    const [nickChange, setNickChange] = useState("");

    useEffect(() => {
        setNickChange(nick);
    }, []);

    const handleNick = (event) => {
        if(event.target.id === "nickChange"){
            setNickChange(event.target.value);
        }
    }

    // api 1003
    const patchNickname = async () => {
        const body = {
            nick_name: nickChange
        }
        try{
            const res = await authFetch.patch(`/api/user/nickname`, body);
            if(res.data.result === "Y"){
                toast.success("닉네임 변경이 완료되었습니다.");
            }
        }catch (err){
            console.log(err);
        }
    }

    const handleChange = () => {
        if(!koEngNum.test(nickChange)) {
            toast.error("닉네임은 한글, 영어, 숫자만 입력가능합니다.");
        }else if(nickChange === nick){
            toast.error("기존 닉네임과 동일합니다.");
        }else{
            patchNickname();
            setIsOpen(false);
        }
    }

    return(
        <StyledModal>
            <div className="modal-inner">
                <h3>닉네임 변경</h3>
                <input
                    type="text"
                    id="nickChange"
                    value={nickChange}
                    onChange={handleNick}
                    maxLength={8}
                />
                <small>* 8글자 이내 한글, 영어, 숫자만 입력</small>
                <div className="modal-btn-wrap">
                    <button type="button" className="register-btn" onClick={handleChange}>변경</button>
                    <button type="button" className="cancel-btn" onClick={() => setIsOpen(false)}>취소</button>
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
    width: 325px;
    text-align: center;
    padding: 40px 20px 30px;
    border-radius: 20px;
    h3{
      font-size: 18px;
      margin-bottom: 25px;
    }
    #nickChange{
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

export default NicknameChange;
