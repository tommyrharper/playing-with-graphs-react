import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {chartData: props.chartData}
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend:true,
    legendPosition:'right'
  }

  render(){
    return(
      <div className="cart">
        <Line
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Investment potential',
              fontSize:25
            },
            legend:{
              display:this.props.displayTitle,
              position:this.props.legendPosition
            }
          }}
          />
      </div>
    )
  }
}

export default Chart;