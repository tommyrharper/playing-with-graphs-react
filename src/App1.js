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
    var i;
    for (i = 1; i < years + 1; i++) {
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


    
    // initialChartData.labels = xAxis
    // initialChartData.datasets[0].data = yAxis

    // console.log("updateChartData")
    // console.log(initialChartData.datasets)

    // this.setState((prevState) => ({
    //   chartData: {}
    // }), () => {
    //   this.setState({
    //     chartData:initialChartData
    //   })
    // })

    ///////
    // this.setState(prevState => ({
    //   chartData:{
    //     labels: xAxis,
    //     datasets:[
    //         {
    //           ...prevState.chartData.datasets[0],
    //           data: yAxis
    //         }
    //     ]
    //   }
    // }))
  }

  updateAppStateFromFormComponent = (key, value) => {
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

  saveLine = () => {
    let savedData = this.state.savedData.slice(0)
    let chartData = this.state.chartData.datasets[0].data.slice(0)
    let savedDataObject = {
      label:'Money in £',
      data:chartData,
      backgroundColor:[
        'rgba(54, 162, 235, 0.4)'
      ]
    }

    /////
    // savedData.push(savedDataObject)
    // this.setState({
    //   savedData: savedData,
    //   numberOfLines: this.state.numberOfLines + 1
    // })
    /////


    initialChartData.datasets.push(savedDataObject)
    console.log("saveLine")
    console.log(initialChartData)
    this.setState((prevState) => ({
      chartData: {}
    }), () => {
      this.setState({
        chartData:initialChartData
      })
    })



  }

  displayAllDataSets = () => {
    var newDataSet = {
      label:'Money in £',
      data:[5000, 6000, 7000, 8000, 12000, 18000],
      backgroundColor:[
        'rgba(54, 162, 235, 0.4)'
      ]
    }
    initialChartData.datasets.push(newDataSet)
    this.setState((prevState) => ({
      chartData: {}
    }), () => {
      this.setState({
        chartData:initialChartData
      })
    })
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
