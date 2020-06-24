import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js'
import ReactForm from './components/Form'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      userData:{
        initialInvestment: 10_000,
        interestRate: 1.1,
        years: 5,
        compound: true
      },
      chartData:{
        labels: [2020, 2021, 2022, 2023, 2024, 2025],
        datasets:[
          {
            label:'Money in £',
            data:[10000, 11000, 12100, 13310, 14641, 16105],
            backgroundColor:[
              'rgba(54, 162, 235, 0.4)'
            ]
          }
        ]
      }
    };
  }

  generateCompoundChartData = (initialInvestment, interestRate, years) => {
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
              'rgba(54, 162, 235, 0.4)'
            ]
          }
        ]
      }
    })
  }

  generateNonCompoundChartData = (initialInvestment, interestRate, years) => {
    let arrayYears = [2020]
    let arrayMoney = [initialInvestment]
    let yearlyGrowth = initialInvestment * (interestRate - 1)
    var i;
    for (i = 1; i < years + 1; i++) {
      arrayYears.push(2020+i)
      arrayMoney.push(arrayMoney[arrayMoney.length - 1] + yearlyGrowth)
    }
    this.setState({
      chartData:{
        labels: arrayYears,
        datasets:[
          {
            label:'Money in £',
            data:arrayMoney,
            backgroundColor:[
              'rgba(54, 162, 235, 0.4)'
            ]
          }
        ]
      }
    })
  }

  updateAppState = (key, value) => {
    this.setState((prevState) => ({
      userData:{
        ...prevState.userData,
        [key]: value
      }
    }), () => {
      if (this.state.userData.compound === true) {
      this.generateCompoundChartData(this.state.userData.initialInvestment, this.state.userData.interestRate, this.state.userData.years)
      } else {
        this.generateNonCompoundChartData(this.state.userData.initialInvestment, this.state.userData.interestRate, this.state.userData.years)
      }
    })
  }

  render(){
    return (
      <>
      <ReactForm
        updateAppState={this.updateAppState}
      />
      <div className="App">
        <Chart
          chartData={this.state.chartData}
        />
      </div>
      </>
    );
  }
}

export default App;
