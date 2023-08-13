import React from "react";
import styled from "styled-components";
import {blurColor, cafe, eat, etc, pleasure, shopping, whiteBg} from "../constants/color";
// import ApexChart from 'apexcharts'
import Chart from "react-apexcharts";

const PieChart = () => {
    const data = {
        series: [25,35,10,20,10],
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
