import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {blackBg, blurColor, expend, income, whiteBg} from "../constants/color";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"

const Calendar = ({setClickDate}) => {
    const event = [
        { title: '25,000', date: '2023-09-05', color: income },
        { title: '39,000', date: '2023-09-05', color: expend },
        { title: '65,000', date: '2023-09-15', color: expend },
        { title: '4,500,000', date: '2023-09-25', color: income },
        { title: '105,000', date: '2023-09-16', color: expend },
        { title: '32,000', date: '2023-09-01', color: income },
        { title: '15,000', date: '2023-09-10', color: expend }
    ]

    const handleDateClick = (arg) => {
        setClickDate(arg.dateStr);
        // arg.dayEl.style.backgroundColor = "#f00";
        console.log(arg)
    }

    return(
        <StyledWrapper>
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin ]}
                events={event}
                eventClassNames="event-tooltip"
                dateClick={handleDateClick}
            />
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
  background-color: ${whiteBg};
  padding: 20px;
  border-radius: 16px;
  width: 100%; height: 500px;
  box-shadow: 0 0 15px ${blurColor};
  > div{
    width: 100%; height: 100%;
  }
  .event-tooltip{
    font-size: 14px;
    padding-left: 5px;
  }
  .fc-toolbar-title{
    font-size: 24px;
  }
  .fc-button-group{
    button{
      background-color: ${blackBg};
      border: none;
      margin-left: 5px !important;
      border-radius: 6px !important;
      outline: none;
    }
  }
  .fc .fc-button-primary:disabled{
    background-color: ${whiteBg};
    color: ${blackBg};
  }
`;

export default Calendar;
