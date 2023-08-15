import React from "react";
import styled from "styled-components";
import {gray01, primary, whiteBg} from "../../constants/color";

const ConfirmModal = ({
    text,
    confirm,
    setIsDelete
                      }) => {
    return(
        <StyledModal>
            <div className="modal-inner">
                <p className="modal-text">{text}</p>
                <div className="modal-btn-wrap">
                    <button type="button" className="register-btn" onClick={confirm}>삭제</button>
                    <button type="button" className="cancel-btn" onClick={() => setIsDelete(false)}>취소</button>
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
    p{
      font-size: 18px;
      margin-bottom: 25px;
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
  }
`;

export default ConfirmModal;
