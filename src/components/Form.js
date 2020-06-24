import React from 'react'

class ReactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfYears: 5,
      initialInvestment: 10000
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.name === 'isGoing' ? target.checked : parseInt(target.value);
    const key = target.name;

    this.setState({
      [key]: value
    });
  }

  handleSubmit(event) {
    alert('Form was submitted, Years:' + this.state.numberOfYears)
    event.preventDefault();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Is going:
          <input 
          name="isGoing"
          type="checkbox" 
          checked={this.state.isGoing}
          onChange={this.handleInputChange} />
        </label>
        <br/>
        <label>
          Number of Years:
          <input
          name="numberOfYears"
          type="number"
          value={this.state.numberOfYears}
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
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

export default ReactForm;