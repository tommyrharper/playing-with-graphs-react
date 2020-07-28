import React from 'react'

class ReactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compound: true,
      years: 5,
      initialInvestment: 10000,
      interestRate: 1.1
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target
    // const value = target.name === 'compound' ? target.checked : parseInt(target.value);
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
      <form onSubmit={this.handleSubmit}>
        <label>
          Compound:
          <input 
          name="compound"
          type="checkbox" 
          checked={this.state.compound}
          onChange={this.handleInputChange} />
        </label>
        <br/>
        <label>
          Interest rate:
          <input 
          name="interestRate"
          type="number" 
          step="0.01"
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
        <br/>
        <label>
          Initial Investment:
          <input
          name="initialInvestment"
          type="number"
          value={this.state.initialInvestment}
          onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Add Line"/>
      </form>
    )
  }
}

export default ReactForm;