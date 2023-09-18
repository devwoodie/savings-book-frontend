import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {
    blackBg,
    blurColor,
    cafe,
    eat,
    etc,
    expend, gray01,
    gray02,
    income,
    pleasure,
    primary,
    shopping,
    whiteBg
} from "../constants/color";
import RegisterModal from "./modal/RegisterModal";
import ConfirmModal from "./modal/ConfirmModal";
import toast from "react-hot-toast";
import {authFetch} from "../apis/axios";
import useObjToQuery from "../hooks/useObjToQuery";

const DetailDate = ({
    clickDate,
    setRefresh
}) => {
    const objToQuery = useObjToQuery();
    const comma = /\B(?=(\d{3})+(?!\d))/g;
    const [click, setClick] = useState(false);
    const [thisData, setThisData] = useState();
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [edit, setEdit] = useState(false);
    const [editedItem, setEditedItem] = useState({
        amount_nm: "",
        content: "",
        category: "",
        type: "",
        money: ""
    });
    // modal
    const [isRegister, setIsRegister] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const dateArray = clickDate?.split('-');
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];

    useEffect(() => {
        if(clickDate !== ""){
            getDetailDate();
            setClick(true);
        }else{
            setClick(false);
        }
    }, [clickDate]);

    const handleRegisterBtn = () => {
        if(clickDate !== ""){
            setIsRegister(true);
            setRefresh(false);
        }else{
            setIsRegister(false);
        }
    }

    // 내역 수정 버튼
    const handleUpdateBtn = (item) => {
        setEditedItem(item);
        setRefresh(false);
        setEdit(true);
        setIsRegister(true);
    }
    // 내역 삭제 버튼
    const handleDeleteBtn = (itemId) => {
        setIsDelete(true);
        setRefresh(false);
        setDeleteItemId(itemId);
    }
    // 삭제 실행
    const handleDelete = () => {
        delDetailDate(deleteItemId);
    };

    // api 1108
    const getDetailDate = async () => {
        const body = {
            year: year,
            month: month,
            day: day
        }
        try{
            const res = await authFetch.get(`/api/main/details${objToQuery(body)}`);
            if(res.data.result === "Y"){
                setThisData(res.data.data);
            }
        }catch (err){
            console.log(err);
        }
    }
    // api 1111
    const delDetailDate = async (delId) => {
        const body = {
            amount_nm: delId
        }
        try{
            const res = await authFetch.delete(`/api/main/details${objToQuery(body)}`);
            if(res.data.result === "Y"){
                getDetailDate();
                toast.success("삭제되었습니다.");
                setIsDelete(false);
                setRefresh(true);
            }
        }catch (err){
            console.log(err);
        }
    }

    return(
        <StyledWrapper>
            <h2>상세 내역</h2>
            {click ?
                <>
                    <span className="click-date">
                        <span>{clickDate && `${year}년 ${month}월 ${day}일`}</span>
                        {thisData?.length !== 0 && <button type="button" className="add-btn" onClick={handleRegisterBtn}>추가</button>}
                    </span>
                    <ul className="detail-list">
                        {thisData?.length === 0 && <button type="button" className="add-btn other" onClick={handleRegisterBtn}>기록하기</button> }
                        {thisData && thisData?.map((item, key) => (
                            <li className="detail-cont" key={item?._id}>
                                <div className="detail-top">
                                    {item?.type === "in" ? <i className="in">수입</i> : <i className="out">지출</i>}
                                    <span
                                        className={
                                            item?.category === "eat" ? "type eat" :
                                                item?.category === "cafe" ? "type cafe" :
                                                    item?.category === "pleasure" ? "type pleasure" :
                                                        item?.category === "shopping" ? "type shopping" :
                                                            item?.category === "etc" ? "type etc" : "type"
                                        }
                                    >{
                                        item?.category === "eat" ? "외식" :
                                            item?.category === "cafe" ? "카페" :
                                                item?.category === "pleasure" ? "유흥" :
                                                    item?.category === "shopping" ? "쇼핑" :
                                                        item?.category === "etc" ? "기타" : null
                                    }</span>
                                </div>
                                <div className="detail-bottom">
                                    <p className="content">{item?.content}</p>
                                    <span className="money">{item?.money.toString().replace(comma, ",")} <i>원</i></span>
                                </div>
                                <div className="detail-btn-wrap">
                                    <button type="button" className="fixed-btn" onClick={() => handleUpdateBtn(item)}>수정</button>
                                    <button type="button" className="del-btn" onClick={() => handleDeleteBtn(item._id)}>삭제</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </> : <p className="empty-text">캘린더에 날짜를 선택해주세요.</p>
            }
            {isRegister &&
                <RegisterModal
                    getDetailDate={getDetailDate}
                    editedItem={editedItem}
                    edit={edit}
                    setEdit={setEdit}
                    clickDate={clickDate}
                    setIsRegister={setIsRegister}
                    setRefresh={setRefresh}
                />
            }
            {isDelete && <ConfirmModal text={"이 내역을 삭제하시겠습니까?"} confirm={handleDelete} setIsDelete={setIsDelete} />}
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
  background-color: ${whiteBg};
  padding: 20px 0;
  border-radius: 16px;
  width: 100%;
  height: 370px;
  box-shadow: 0 0 15px ${blurColor};
  .add-btn.other{
    cursor: pointer;
    background-color: ${gray01};
    color: ${whiteBg};
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 16px;
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
  }
  h2 {
    font-size: 18px;
    padding: 0 20px;
  }
  .click-date {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    font-size: 16px;
    background-color: ${primary};
    padding: 6px 20px;
    color: ${whiteBg};
    .add-btn{
      cursor: pointer;
      margin-right: 10px;
      background-color: #fff;
      padding: 2px 8px;
      border-radius: 8px;
      font-size: 14px;
    }
  }
  .detail-list {
    width: 100%;
    height: 270px;
    margin-top: 5px;
    overflow-y: scroll;
    padding: 0 20px;
    position: relative;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${gray02};
      border-radius: 8px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    .detail-cont {
      padding: 12px 0;
      margin-right: 8px;
      border-bottom: 1px solid rgba(121, 121, 121, 0.2);
      position: relative;
      &:last-child {
        border: none;
      }
      .detail-top {
        i {
          color: ${whiteBg};
          font-size: 12px;
          padding: 2px 4px;
          border-radius: 4px;
          margin-right: 4px;
        }
        i.in {background-color: ${income}}
        i.out {background-color: ${expend}}
        .type {
          color: ${whiteBg};
          font-size: 12px;
          padding: 2px 4px;
          border-radius: 4px;
          &.eat {background-color: ${eat}}
          &.cafe {background-color: ${cafe}}
          &.pleasure {background-color: ${pleasure}}
          &.shopping {background-color: ${shopping}}
          &.etc {background-color: ${etc}}
        }
      }

      .detail-bottom {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .content {
          font-size: 16px;
        }
        .money {
          font-size: 16px;
          font-family: "TheJamsil5Bold", sans-serif;
        }
      }
      .detail-btn-wrap {
        position: absolute;
        right: 0;
        top: 12px;
        button {
          cursor: pointer;
          font-size: 12px;
          color: ${gray01};
        }
        .fixed-btn {
          margin-right: 5px;
        }
      }
    }
  }
  .empty-text{
    text-align: center;
    margin-top: 120px;
  }
`;

export default DetailDate;
