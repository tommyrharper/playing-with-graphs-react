import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js'

class App extends Component {
  constructor(){
    super()
    this.state = {
      userData:{
        initialInvestment: 10_000,
        interestRate: 1.1,
        years: 10
      },
      chartData:{}
    };
  }

  componentWillMount(){
    this.generateChartData(this.state.userData.initialInvestment, this.state.userData.interestRate, this.state.userData.years)
  }

  generateChartData(initialInvestment, interestRate, years){
    let arrayYears = [2020]
    let arrayMoney = [initialInvestment]
    var i;
    for (i = 1; i < years + 1; i++) {
      arrayYears.push(2020+i)
      arrayMoney.push(arrayMoney[arrayMoney.length - 1]*interestRate)
    }
    this.setState({
      chartData:{
        labels: arrayYears,
        datasets:[
          {
            label:'Money in £',
            data:arrayMoney,
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
