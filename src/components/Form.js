import React from 'react'

class ReactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
      name: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const key = target.name;

    this.setState({
      [key]: value
    });
  }

  handleSubmit(event) {
    alert('Form was submitted, guests:' + this.state.numberOfGuests)
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
          Number of guests:
          <input
          name="numberOfGuests"
          type="number"
          value={this.state.numberOfGuests}
          onChange={this.handleInputChange} />
        </label>
        <label>
          Name:
          <input
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

export default ReactForm;