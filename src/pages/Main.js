import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import Goal from "../components/Goal";
import DetailDate from "../components/DetailDate";
import PieChart from "../components/PieChart";
import HistoryAll from "../components/HistoryAll";
import Badge from "../components/Badge";
import LineChart from "../components/LineChart";
import {useNavigate} from "react-router-dom";
import {authFetch} from "../apis/axios";
import toast from "react-hot-toast";
import WithdrawalModal from "../components/modal/WithdrawalModal";

const Main = () => {

    const navigate = useNavigate();
    const userToken = localStorage.getItem("access-token");
    const [clickDate, setClickDate] = useState("");
    const [nickname, setNickname] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [nickRefresh, setNickRefresh] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if(!userToken){
            navigate("/login");
        }
    }, []);
    useEffect(() => {
        getUserData();
    }, [nickRefresh]);

    const handleWithdrawal = () => {
        setIsOpen(true);
    }

    // api 1004
    const getUserData = async () => {
        try{
            const res = await authFetch.get(`/api/user/userdata`);
            if(res.data.result === "Y"){
                setNickname(res.data.data.nick_name);
            }else if(res.data.code === 401){
                // 유효하지 않은 토큰
                return navigate("/login");
            }else if(res.data.code === 419){
                // 만료된 토큰
                return navigate("/login");
            }
        }catch (err){
            if(err.response.data.code === 401){
                toast.error("로그인이 필요합니다.");
                return navigate("/login");
            }else if(err.response.data.code === 419){
                toast.error("로그인이 필요합니다.");
                return navigate("/login");
            }
        }
    }

    return(
        <StyledWrapper>
            <span className="withdrawal-btn" onClick={handleWithdrawal}>회원탈퇴</span>
            <Header nickname={nickname} setNickRefresh={setNickRefresh} />
            <div className="cont">
                <div className="cont-left">
                    <Goal />
                    <Calendar setClickDate={setClickDate} refresh={refresh} />
                </div>
                <div className="cont-right">
                    <div className="inner-flex-left">
                        <DetailDate clickDate={clickDate} setRefresh={setRefresh} />
                        <LineChart refresh={refresh} />
                    </div>
                    <div className="inner-flex-right">
                        <PieChart refresh={refresh} />
                        <HistoryAll refresh={refresh} />
                        <Badge />
                    </div>
                </div>
            </div>

            {isOpen &&
                <WithdrawalModal
                    setIsOpen={setIsOpen}
                />
            }
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
  width: 1512px; height: 743px;
  padding: 20px;
  position: relative;
  .withdrawal-btn{
    position: absolute;
    right: 2%; top: 0;
    font-size: 14px;
    cursor: pointer;
    //color: #fff;
  }
  .cont{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .cont-left{
    margin: 16px 0;
    width: 600px;
  }
  .cont-right{
    margin: 16px 0;
    width: 850px; height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .inner-flex-left{
      width: 57.5%;
    }
    .inner-flex-right{
      width: 40%;
    }
  }
`;

export default Main;
