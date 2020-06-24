import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js'

class App extends Component {
  constructor(){
    super()
    this.state = {
      chartData:{}
    };
  }

  componentWillMount(){
    this.getChartData()
  }

  getChartData(){
    // Ajax call here if getting information from API for example
    this.setState({
      chartData:{
        labels: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
        datasets:[
          {
            label:'Money in £',
            data:[
              10000,
              11000,
              12100,
              13310,
              14641,
              16105.1,
              17715.61,
              19487.171,
              21435.8881,
              23579.47691,
              25937.4246
            ],
            backgroundColor:[
              'rgba(54, 162, 235, 0.6)'
            ]
          }
        ]
      }
    })
  }

  render(){
    return (
      <div className="App">
        <Chart
        legendPosition='bottom'
        chartData={this.state.chartData}
        />
      </div>
    );
  }
}

export default App;
