import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {blurColor, cafe, eat, etc, pleasure, shopping, whiteBg} from "../constants/color";
import Chart from "react-apexcharts";
import toast from "react-hot-toast";
import {authFetch} from "../apis/axios";
import useObjToQuery from "../hooks/useObjToQuery";

const PieChart = ({refresh}) => {
    const objToQuery = useObjToQuery();
    const nowYear = localStorage.getItem("nowYear");
    const nowMonth = localStorage.getItem("nowMonth");
    const [chartData, setChartData] = useState([]);
    const isAllZero = chartData.every(value => value === 0);

    useEffect(() => {
        getCategoryData();
    }, []);
    useEffect(() => {
        getCategoryData();
    }, [refresh]);

    const data = {
        series: !isAllZero ? chartData : [20,20,20,20,20],
        options: {
            chart: {
                type: 'pie',
            },
            legend: {
                show: false,
            },
            labels: ["외식", "카페", "유흥", "쇼핑", "기타"],
            fill: {
                colors: [`${eat}`,`${cafe}`,`${pleasure}`,`${shopping}`,`${etc}`]
            },
            colors:[`${eat}`,`${cafe}`,`${pleasure}`,`${shopping}`,`${etc}`],
        },
    }

    // api 1105
    const getCategoryData = async () => {
        const body = {
            year: nowYear,
            month: nowMonth
        }
        try{
            const res = await authFetch.get(`/api/main/category${objToQuery(body)}`);
            if(res.data.result === "Y"){
                setChartData([
                    Number(res.data.data.category.eat),
                    Number(res.data.data.category.cafe),
                    Number(res.data.data.category.pleasure),
                    Number(res.data.data.category.shopping),
                    Number(res.data.data.category.etc),
                ])
            }
        }catch (err){
            toast.error("에러가 발생했습니다.");
            console.log(err);
        }
    }

    return(
        <StyledWrapper>
            <h2>카테고리별 소비</h2>
            <Chart
                options={data.options}
                series={data.series}
                type="pie"
                width="100%"
                height="300px"
            />
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
  background-color: ${whiteBg};
  padding: 20px 0;
  border-radius: 16px;
  width: 100%;
  height: 330px;
  box-shadow: 0 0 15px ${blurColor};
  h2 {
    font-size: 18px;
    padding: 0 16px;
  }
`

export default PieChart;
