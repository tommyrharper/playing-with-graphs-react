import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js'
import ReactForm from './components/Form'
import initialChartData from './components/InitialChartData'

let colours = {
  0:'red',
  1:'blue',
  2:'orange',
  3:'green',
  4:'purple',
  5:'yellow'
}

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
    for (var i = 1; i < years + 1; i++) {
      arrayYears.push(2020+i)
      arrayMoney.push(arrayMoney[arrayMoney.length - 1] + yearlyGrowth)
    }
    this.updateChartData(arrayYears, arrayMoney)
  }

  updateChartData = (xAxis, yAxis) => {

    let lineColour = colours[this.state.numberOfLines % 6]
    console.log(lineColour)

    let savedDataObject = {
      label:'Money in £',
      data: yAxis,
      fill: false,
      borderColor: lineColour
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

  removeLine = () => {

    // let lineColour = colours[this.state.numberOfLines % 6]
    // console.log(lineColour)

    // let savedDataObject = {
    //   label:'Money in £',
    //   data: yAxis,
    //   fill: false,
    //   borderColor: lineColour
    // }
    
    if (this.state.numberOfLines > 0) {
      initialChartData.datasets.pop()
    }

    let data = JSON.parse(JSON.stringify(initialChartData))

    this.setState((prevState) => ({
      chartData: {}
    }), () => {
      this.setState({
        chartData: data,
        numberOfLines: this.state.numberOfLines - 1
      })
    })
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
      <button onClick={this.removeLine}>Remove Line</button>
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
