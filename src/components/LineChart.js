import React from "react";
import styled from "styled-components";
import {blurColor, cafe, eat, etc, pleasure, shopping, whiteBg} from "../constants/color";
import Chart from "react-apexcharts";

const LineChart = () => {

    const data = {
        series: [
            {name: "저번 달",
                data: [45000,5000,35000,42000,20030,4500,8500,105000]
            },
            {name: "이번 달",
                data: [5000,85000,30000,24000,5000,45000,85000,20000]
            },
        ],
        options: {
            chart: {
                type: 'area',
                toolbar: { show: false },
                background: "transparent",
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
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
                categories: ["1일","2일","3일","4일","5일","6일","7일","8일"],
            },
            colors:[`${eat}`,`${cafe}`],
        },
    }

    return(
        <StyledWrapper>
            <h2>금액 별 소비</h2>
            <Chart
                type="area"
                options={data.options}
                series={data.series}
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
