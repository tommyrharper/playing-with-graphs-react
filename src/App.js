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
        initialInvestment: 1000,
        interestRate: 8,
        years: 20,
        compound: true,
        monthlyContribution: 500,
        annualIncrease: 0
      },
      chartData: JSON.parse(JSON.stringify(initialChartData)),
      savedData: [],
      numberOfLines: 0
    };
  }

  generateCompoundChartData = (initialInvestment, interestRate, years) => {

    let arrayYears = [2020]
    let arrayMoney = [initialInvestment]
    let total = initialInvestment
    let annualIncrease = this.state.userData.annualIncrease
    let monthlyContribution = this.state.userData.monthlyContribution
    for (var i = 1; i < years + 1; i++) {
      arrayYears.push(2020+i)
      total += (monthlyContribution + (annualIncrease * (i-1)))* 12
      total = total * ((interestRate / 100) + 1)
      arrayMoney.push(total.toFixed(2))
    }
    this.updateChartData(arrayYears, arrayMoney)
  }

  generateNonCompoundChartData = (initialInvestment, interestRate, years) => {
    let arrayYears = [2020]
    let arrayMoney = [initialInvestment]
    let total = initialInvestment

    let yearlyContribution = this.state.userData.monthlyContribution * 12
    let thisYearsInterest = 0
    let totalInterest = 0
    let totalGain = 0
    
    for (var i = 1; i < years + 1; i++) {
      thisYearsInterest =  (arrayMoney[arrayMoney.length-1]-totalInterest) * (interestRate / 100)
      totalInterest += thisYearsInterest
      totalGain = yearlyContribution + thisYearsInterest
      total += totalGain

      arrayYears.push(2020+i)
      arrayMoney.push(total.toFixed(2))
    }
    this.updateChartData(arrayYears, arrayMoney)
  }

  updateChartData = (xAxis, yAxis) => {
    let compound = ''
    if (this.state.userData.compound === true) {
      compound = 'Yes'
    } else {
      compound = 'No'
    }

    let finalAmount = yAxis[yAxis.length - 1]

    let lineColour = colours[this.state.numberOfLines % 6]
    let label = ` Start: £${this.state.userData.initialInvestment}
    Monthly: £${this.state.userData.monthlyContribution}
    PM Increase PA: £${this.state.userData.annualIncrease}
    Interest: ${parseInt(this.state.userData.interestRate)}%
    Years: ${this.state.userData.years}
    Compounded: ${compound}
    End: £${finalAmount}`

    let savedDataObject = {
      label:label,
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

  addLine = () => {
      if (this.state.userData.compound === true) {
      this.generateCompoundChartData(this.state.userData.initialInvestment, this.state.userData.interestRate, this.state.userData.years)
      } else {
        this.generateNonCompoundChartData(this.state.userData.initialInvestment, this.state.userData.interestRate, this.state.userData.years)
      }
  }

  removeLine = () => {
    if (this.state.numberOfLines > 0) {
      initialChartData.datasets.pop()

      let data = JSON.parse(JSON.stringify(initialChartData))

      this.setState((prevState) => ({
        chartData: {}
      }), () => {
        this.setState({
          chartData: data,
          numberOfLines: this.state.numberOfLines - 1
        })
      })
    }
  }

  render(){
    return (
      <>
      <h1>Financial Future Visualiser</h1>
      <ReactForm
        addLine={this.addLine}
        updateAppState={this.updateAppStateFromFormComponent}
        removeLine={this.removeLine}
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
