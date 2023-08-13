import React, {useState} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import Goal from "../components/Goal";
import DetailDate from "../components/DetailDate";
import PieChart from "../components/PieChart";

const Main = () => {

    const [clickDate, setClickDate] = useState("");

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
                    </div>
                    <div className="inner-flex-right">
                        <PieChart />
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
