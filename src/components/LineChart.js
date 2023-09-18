import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {blurColor, cafe, eat, etc, expend, income, pleasure, shopping, whiteBg} from "../constants/color";
import Chart from "react-apexcharts";
import useObjToQuery from "../hooks/useObjToQuery";
import {authFetch} from "../apis/axios";

const LineChart = ({refresh}) => {
    const objToQuery = useObjToQuery();
    const nowYear = localStorage.getItem("nowYear");
    const nowMonth = localStorage.getItem("nowMonth");
    const daysArray = Array.from({ length: 31 }, (_, index) => `${index + 1}일`);
    const [lineData, setLineData] = useState([]);

    useEffect(() => {
        getLineChartData();
    }, []);
    useEffect(() => {
        getLineChartData();
    }, [refresh]);


    const data = {
        series: [
            {
                name: "저번 달",
                data: lineData[0]?.data || ["0","0","0","0","0","0"]
            },
            {
                name: "이번 달",
                data: lineData[1]?.data || ["0","0","0","0","0","0"]
            },
        ],
        options: {
            chart: {
                type: 'area',
                toolbar: { show: false },
                background: "transparent",
                zoom: {
                    enabled: false
                }
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2.5
            },
            tooltip: {
                enabled: true,
                show: false,
            },
            xaxis: {
                labels: { show: false },
                axisTicks: { show: false },
                axisBorder: { show: false },
                tooltip: {
                    enabled: false,
                    formatter: undefined,
                    offsetY: 0,
                    style: {
                        fontSize: 0,
                        fontFamily: 0,
                    },
                },
                categories: daysArray
            },
            colors:[`${cafe}`, `${eat}`],
        },
    }

    // api 1106
    const getLineChartData = async () => {
        const body = {
            year: nowYear,
            month: nowMonth
        }
        try{
            const res = await authFetch.get(`/api/main/dailylist${objToQuery(body)}`);
            if(res.data.result === "Y"){
                setLineData(res.data.data);
            }
        }catch (err){
            console.log(err);
        }
    }

    return(
        <StyledWrapper>
            <h2>금액 별 소비</h2>
            <Chart
                type="area"
                options={data?.options}
                series={data?.series}
                width="100%"
                height="150px"
            />
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
  margin-top: 16px;
  background-color: ${whiteBg};
  padding: 20px 0;
  border-radius: 16px;
  width: 100%; height: 197px;
  box-shadow: 0 0 15px ${blurColor};
  h2 {
    font-size: 18px;
    padding: 0 20px;
  }
`

export default LineChart;
