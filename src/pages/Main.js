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

const Main = () => {

    const navigate = useNavigate();
    const userToken = localStorage.getItem("access-token");
    const [clickDate, setClickDate] = useState("");

    useEffect(() => {
        if(!userToken){
            navigate("/login");
        }
    }, []);

    return(
        <StyledWrapper>
            <Header />
            <div className="cont">
                <div className="cont-left">
                    <Goal />
                    <Calendar setClickDate={setClickDate} />
                </div>
                <div className="cont-right">
                    <div className="inner-flex-left">
                        <DetailDate clickDate={clickDate} />
                        <LineChart />
                    </div>
                    <div className="inner-flex-right">
                        <PieChart />
                        <HistoryAll />
                        <Badge />
                    </div>
                </div>
            </div>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
  width: 1512px; height: 743px;
  padding: 20px;
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
