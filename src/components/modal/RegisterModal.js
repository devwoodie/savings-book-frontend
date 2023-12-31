import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {
    cafe,
    eat,
    etc, expend,
    gray01,
    gray02,
    income,
    pleasure,
    primary,
    shopping,
    whiteBg
} from "../../constants/color";
import toast from "react-hot-toast";
import {authFetch} from "../../apis/axios";

const RegisterModal = ({
    getDetailDate,
    editedItem,
    edit,
    setEdit,
    clickDate,
    setIsRegister,
    setRefresh
}) => {

    let onlyNum =  /^[0-9]*$/;
    const dateArray = clickDate?.split('-');
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    const [editId, setEditId] = useState("")
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [money, setMoney] = useState("");

    useEffect(() => {
        if (edit) {
            setEditId(editedItem._id)
            setType(editedItem.type);
            setCategory(editedItem.category);
            setContent(editedItem.content);
            setMoney(editedItem.money);
        }
    }, [edit, editedItem]);

    const handleInput = (event) => {
        if(event.target.name === "type"){
            setType(event.target.value);
        }else if(event.target.name === "category"){
            setCategory(event.target.value);
        }else if(event.target.id === "content"){
            setContent(event.target.value);
        }else if(event.target.id === "money"){
            setMoney(event.target.value);
        }
    }

    const handleSubmit = () => {
        if(
            year !== "" &&
            month !== "" &&
            day !== "" &&
            type !== "" &&
            category !== "" &&
            content !== "" &&
            money !== "" &&
            onlyNum.test(money)
        ){
            if(!edit){
                postDetailDate();
            }else{
                putDetailDate();
            }
        }else{
            toast.error("내용을 확인해주세요.");
        }
    }

    // api 1109
    const postDetailDate = async () => {
        const body = {
            year: year,
            month: month,
            day: day,
            type: type,
            money: money,
            content: content,
            category: category
        }
        try{
            const res = await authFetch.post(`/api/main/details`, body);
            if(res.data.result === "Y"){
                getDetailDate();
                toast.success(`등록이 완료되었습니다.`);
                setEdit(false);
                setIsRegister(false);
                setRefresh(true);
            }
        }catch (err){
            console.log(err);
        }
    }
    // api 1110
    const putDetailDate = async () => {
        const body = {
            year: year,
            month: month,
            day: day,
            type: type,
            money: money,
            content: content,
            category: category,
            amount_nm: editId
        }
        try{
            const res = await authFetch.put(`/api/main/details`, body);
            if(res.data.result === "Y"){
                getDetailDate();
                toast.success(`수정이 완료되었습니다.`);
                setEdit(false);
                setIsRegister(false);
                setRefresh(true);
            }
        }catch (err){
            console.log(err);
        }
    }

    return(
        <StyledModal>
            <div className="modal-inner">
                <h3>{year}년 {month}월 {day}일 수입/지출 내역 {edit ? "수정" : "기록"}하기</h3>
                <div className="register-wrap">
                    <div className="content">
                        <input
                            type="radio"
                            id="radioIn"
                            name="type"
                            value="in"
                            onChange={handleInput}
                            checked={type === "in"}
                        />
                        <label htmlFor="radioIn" className="w50 income">수입</label>
                        <input
                            type="radio"
                            id="radioOUt"
                            name="type"
                            value="out"
                            onChange={handleInput}
                            checked={type === "out"}
                        />
                        <label htmlFor="radioOUt" className="w50 expend">지출</label>
                    </div>
                    <span className="sub-tit">카테고리</span>
                    <div className="content">
                        <input
                            type="radio"
                            id="eat"
                            name="category"
                            value="eat"
                            onChange={handleInput}
                            checked={category === "외식" || category === "eat"}
                        />
                        <label htmlFor="eat" className="eat">외식</label>
                        <input
                            type="radio"
                            id="cafe"
                            name="category"
                            value="cafe"
                            onChange={handleInput}
                            checked={category === "카페" || category === "cafe"}
                        />
                        <label htmlFor="cafe" className="cafe">카페</label>
                        <input
                            type="radio"
                            id="pleasure"
                            name="category"
                            value="pleasure"
                            onChange={handleInput}
                            checked={category === "유흥" || category === "pleasure"}
                        />
                        <label htmlFor="pleasure" className="pleasure">유흥</label>
                        <input
                            type="radio"
                            id="shopping"
                            name="category"
                            value="shopping"
                            onChange={handleInput}
                            checked={category === "쇼핑" || category === "shopping"}
                        />
                        <label htmlFor="shopping" className="shopping">쇼핑</label>
                        <input
                            type="radio"
                            id="etc"
                            name="category"
                            value="etc"
                            onChange={handleInput}
                            checked={category === "기타" || category === "etc"}
                        />
                        <label htmlFor="etc" className="etc">기타</label>
                    </div>
                    <span className="sub-tit">상세 내용</span>
                    <div className="content">
                        <input
                            type="text"
                            id="content"
                            placeholder="20자 이내로 작성해주세요."
                            maxLength={20}
                            value={content}
                            onChange={handleInput}
                        />
                    </div>
                    <span className="sub-tit">금액</span>
                    <div className="content">
                        <input
                            type="text"
                            id="money"
                            placeholder="숫자만 입력해주세요."
                            value={money}
                            onChange={handleInput}
                        />
                    </div>
                </div>
                <div className="modal-btn-wrap">
                    <button type="button" className="register-btn" onClick={handleSubmit}>{edit ? "수정" : "등록"}</button>
                    <button type="button" className="cancel-btn" onClick={() => {
                        setIsRegister(false);
                        setEdit(false);
                    }}>취소</button>
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
    width: 435px;
    text-align: center;
    padding: 30px 20px;
    border-radius: 20px;
    h3{
      font-size: 18px;
      margin-bottom: 25px;
    }
    .register-wrap{
      .sub-tit{
        text-align: left;
        display: block;
        font-size: 14px;
        margin: 20px 0 5px;
        color: ${gray01};
      }
      .content{
        display: flex;
        align-items: center;
        justify-content: space-between;
        input[type="radio"]{display: none;}
        input[type="radio"] + label{
          width:19%;
          border: 1px solid ${gray01};
          padding: 8px 0;
          border-radius: 8px;
          cursor: pointer;
          transition: .3s;
          color: ${gray01};
          &.w50{
            width: 49%;
          }
        }
        input[type="radio"]:checked + label{
          color: ${whiteBg};
          border: 1px solid ${primary};
          background-color: ${primary};
          &.income{
            border: 1px solid ${income};
            background-color: ${income};
          }
          &.expend{
            border: 1px solid ${expend};
            background-color: ${expend};
          }
          &.eat{
            border: 1px solid ${eat};
            background-color: ${eat};
          }
          &.cafe{
            border: 1px solid ${cafe};
            background-color: ${cafe};
          }
          &.pleasure{
            border: 1px solid ${pleasure};
            background-color: ${pleasure};
          }
          &.shopping{
            border: 1px solid ${shopping};
            background-color: ${shopping};
          }
          &.etc{
            border: 1px solid ${etc};
            background-color: ${etc};
          }
        }
        input[type="text"]{
          width: 100%;
          outline: none;
          font-size: 16px;
          padding: 8px;
          border: 1px solid ${gray01};
          border-radius: 8px;
          &::placeholder{
            color: ${gray02};
          }
        }
      }
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

export default RegisterModal;
