import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {blackBg, blurColor, expend, income, primary, whiteBg} from "../constants/color";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import useObjToQuery from "../hooks/useObjToQuery";
import {authFetch} from "../apis/axios";
import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from "react-icons/bs";

const Calendar = ({
    setClickDate,
    refresh
}) => {
    let idx = 1;
    const objToQuery = useObjToQuery();
    const [AllData, setAllData] = useState([]);
    const nowYear = localStorage.getItem("nowYear");
    const calendarRef = useRef(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        getCalendarData();
    }, []);
    useEffect(() => {
        getCalendarData();
    }, [refresh, currentMonth]);

    const formattedMonth = (date) => {
        const month = date.getMonth() + 1;
        return month < 10 ? `0${month}` : `${month}`;
    };
    // 날짜 선택
    const handleDateClick = (arg) => {
        setClickDate(arg.dateStr);
    }
    // 전월로 이동
    const handlePrevClick = () => {
        calendarRef.current.getApi().prev();
        const prevMonth = new Date(currentMonth);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        setCurrentMonth(prevMonth);
    };
    // 다음월로 이동
    const handleNextClick = () => {
        calendarRef.current.getApi().next();
        const nextMonth = new Date(currentMonth);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setCurrentMonth(nextMonth);
    };

    // api 1107
    const getCalendarData = async () => {
        const body = {
            year: nowYear,
            month: formattedMonth(currentMonth)
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
            console.log(err);
        }
    }

    return(
        <StyledWrapper>
            <StyledCalNav>
                <span className="month-wrap">
                    {currentMonth.getFullYear()}년 {formattedMonth(currentMonth)}월
                </span>
                <span className="button-wrap">
                    <button onClick={handlePrevClick}><BsFillArrowLeftSquareFill /></button>
                    <button onClick={handleNextClick}><BsFillArrowRightSquareFill /></button>
                </span>
            </StyledCalNav>
            <FullCalendar
                ref={calendarRef}
                plugins={[ dayGridPlugin, interactionPlugin ]}
                events={AllData}
                selectable={true}
                eventClassNames="event-tooltip"
                dateClick={handleDateClick}
                headerToolbar={false}
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
    width: 100%; height: 90%;
  }
  .event-tooltip{
    font-size: 14px;
    padding-left: 5px;
  }
  .fc .fc-button-primary:disabled{
    background-color: ${whiteBg};
    color: ${blackBg};
  }

  .fc .fc-highlight{
    background-color: ${primary};
    opacity: .6;
  }
`;

const StyledCalNav = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  .month-wrap{
    font-family: "TheJamsil5Bold", sans-serif;
    font-size: 20px;
    color: ${primary};
  }
  .button-wrap{
    button{
      font-size: 25px;
      margin-right: 5px;
      cursor: pointer;
      color: ${primary};
      &:last-child{margin: 0;}
    }
  }
`;

export default Calendar;
