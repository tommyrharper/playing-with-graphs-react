import React from 'react'
import './Form.css';

class ReactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compound: true,
      years: 20,
      initialInvestment: 1000,
      interestRate: 8,
      monthlyContribution: 500,
      annualIncrease: 0
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.name === 'compound' ? target.checked : parseFloat(target.value);
    const key = target.name;

    this.setState({
      [key]: value
    });
    this.props.updateAppState(key, value)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addLine()
  }

  render() {
    return(
      <>
      
      <form onSubmit={this.handleSubmit}>
        <div id="form-grid">
          <div id="sect-1">
            <label>
              Compound:
              <input 
              name="compound"
              type="checkbox" 
              checked={this.state.compound}
              onChange={this.handleInputChange} />
            </label>
          </div>
          <div id="sect-2">
            <label>
              Interest Rate %:
              <input 
              name="interestRate"
              type="number" 
              step="0.5"
              value={this.state.interestRate}
              onChange={this.handleInputChange} />
            </label>
            <br/>
            <label>
              Number of Years:
              <input
              name="years"
              type="number"
              value={this.state.years}
              onChange={this.handleInputChange} />
            </label>
          </div>
          <div id="sect-3">
            <label>
              Initial Investment:
              <input
              name="initialInvestment"
              type="number"
              step="1000"
              value={this.state.initialInvestment}
              onChange={this.handleInputChange} />
            </label>
            <br/>
            <label>
              Monthly Contribution:
              <input
              name="monthlyContribution"
              type="number"
              step="100"
              value={this.state.monthlyContribution}
              onChange={this.handleInputChange} />
            </label>
          </div>
          <div id="sect-4">
            <input className="button" type="submit" value="Add Line"/>
            <br/>
            <button className="button" type="button" onClick={(e) => this.props.removeLine()}>Remove Line</button>
          </div>
          <div id="sect-5">
            <label>
              Monthly Contribution Increase PA:
              <input
              name="annualIncrease"
              type="number"
              step="100"
              value={this.state.annualIncrease}
              onChange={this.handleInputChange} />
            </label>
          </div>
        </div>
      </form>
      
      </>
    )
  }
}

export default ReactForm;