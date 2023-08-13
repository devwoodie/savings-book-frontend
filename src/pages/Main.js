import React, {useState} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import Goal from "../components/Goal";

const Main = () => {

    const [clickDate, setClickDate] = useState("");

    return(
        <StyledWrapper>
            <Header />
            <div className="cont">
                <Goal />
                <Calendar setClickDate={setClickDate} />
            </div>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
  width: 1512px; height: 743px;
  padding: 20px;
  .cont{
    margin: 16px 0;
    width: 600px;
  }
`;

export default Main;
