import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {blackBg, blurColor, expend, income, whiteBg} from "../constants/color";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import useObjToQuery from "../hooks/useObjToQuery";
import {authFetch} from "../apis/axios";
import toast from "react-hot-toast";

const Calendar = ({
    setClickDate,
    refresh
}) => {
    const objToQuery = useObjToQuery();
    const nowYear = localStorage.getItem("nowYear");
    const nowMonth = localStorage.getItem("nowMonth");
    const [AllData, setAllData] = useState([]);

    useEffect(() => {
        getCalendarData();
    }, []);
    useEffect(() => {
        getCalendarData();
    }, [refresh]);
    const handleDateClick = (arg) => {
        setClickDate(arg.dateStr);
        // arg.dayEl.style.backgroundColor = "#f00";
        // console.log(arg)
    }

    // api 1107
    const getCalendarData = async () => {
        const body = {
            year: nowYear,
            month: nowMonth
        }
        try{
            const res = await authFetch.get(`/api/main/calendar${objToQuery(body)}`);
            if(res.data.result === "Y"){
                setAllData(res.data.data.map(item => {
                    return{
                        title: item.money?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                        date: item.date,
                        color: item.type === "in" ? income : expend
                    }
                }))
            }
        }catch (err){
            toast.error("에러가 발생했습니다.");
            console.log(err);
        }
    }

    return(
        <StyledWrapper>
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin ]}
                events={AllData}
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
