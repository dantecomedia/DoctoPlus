import React, { Component } from 'react';
import Chart from "react-apexcharts";

import '../App.css';


class ChartComponent extends Component{
    constructor(props) {
        super(props);
        const percentage = this.props.percentage.map((ele, index)=>{
            return Number.parseFloat(Math.floor(ele))
        })
        console.log(this.props.diseases)
        this.state = {
            options: {},
            series: percentage,
            labels: this.props.diseases,
            
        };
      }
    
    render() {
    return (
        <div className="chart">
        <div className="row">
            <div className="mixed-chart">
            <Chart
                options={this.state.options}
                series={this.state.series}
                labels={this.state.labels}
                type="donut"
                width="380"
            />
            </div>
        </div>
        </div>
    );
    }
}

export default ChartComponent;