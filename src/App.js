import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js'
import ReactForm from './components/Form'
import initialChartData from './components/InitialChartData'

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
      chartData: JSON.parse(JSON.stringify(initialChartData)),
      savedData: [],
      numberOfLines: 0
    };
  }

  generateCompoundChartData = (initialInvestment, interestRate, years) => {
    let arrayYears = [2020]
    let arrayMoney = [initialInvestment]
    // var i;
    for (var i = 1; i < years + 1; i++) {
      arrayYears.push(2020+i)
      arrayMoney.push(arrayMoney[arrayMoney.length - 1]*interestRate)
    }
    this.updateChartData(arrayYears, arrayMoney)
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
    this.updateChartData(arrayYears, arrayMoney)
  }

  updateChartData = (xAxis, yAxis) => {

    let savedDataObject = {
      label:'Money in £',
      data: yAxis,
      backgroundColor:[
        'rgba(54, 162, 235, 0.4)'
      ]
    }
    
    if (xAxis.length > initialChartData.labels.length) {
      initialChartData.labels = xAxis
    }
    initialChartData.datasets.push(savedDataObject)

    let data = JSON.parse(JSON.stringify(initialChartData))

    this.setState((prevState) => ({
      chartData: {}
    }), () => {
      this.setState({
        chartData: data,
        numberOfLines: this.state.numberOfLines + 1
      })
    })
  }

  updateAppStateFromFormComponent = (key, value) => {

    let chartdata = JSON.parse(JSON.stringify(initialChartData))

    this.setState((prevState) => ({
      userData:{
        ...prevState.userData,
        [key]: value
      },
      chartData: chartdata
    }))

  }

  saveLine = () => {
      if (this.state.userData.compound === true) {
      this.generateCompoundChartData(this.state.userData.initialInvestment, this.state.userData.interestRate, this.state.userData.years)
      } else {
        this.generateNonCompoundChartData(this.state.userData.initialInvestment, this.state.userData.interestRate, this.state.userData.years)
      }
  }

  displayAllDataSets = () => {
    // var newDataSet = {
    //   label:'Money in £',
    //   data:[5000, 6000, 7000, 8000, 12000, 18000],
    //   backgroundColor:[
    //     'rgba(54, 162, 235, 0.4)'
    //   ]
    // }
    // initialChartData.datasets.push(newDataSet)
    // this.setState((prevState) => ({
    //   chartData: {}
    // }), () => {
    //   this.setState({
    //     chartData:initialChartData
    //   })
    // })
  }

  render(){
    return (
      <>
      <button onClick={this.displayAllDataSets}>Display all data sets</button>
      <ReactForm
        saveLine={this.saveLine}
        updateAppState={this.updateAppStateFromFormComponent}
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
