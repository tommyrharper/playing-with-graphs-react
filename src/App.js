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
        years: 5
      },
      chartData:{}
    };
  }

  componentDidMount(){
    this.generateChartData(this.state.userData.initialInvestment, this.state.userData.interestRate, this.state.userData.years)
  }

  generateChartData = (initialInvestment, interestRate, years) => {
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

  updateAppState = (key, value) => {
    this.setState(prevState => ({
      userData:{
        ...prevState.userData,
        [key]: value
      }
    }))
    if (key === "years") {
    this.generateChartData(this.state.userData.initialInvestment, this.state.userData.interestRate, value)
    } else {
      this.generateChartData(this.state.userData.initialInvestment, this.state.userData.interestRate, this.state.userData.years)
    }
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
