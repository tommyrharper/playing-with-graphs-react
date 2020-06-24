import React, { Component } from 'react';
import {Doughnut, Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend:true,
    legendPosition:'right'
  }

  render(){
    return(
      <div className="cart">
        <Bar
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities in Massachusetts',
              fontSize:25
            },
            legend:{
              display:this.props.displayTitle,
              position:this.props.legendPosition
            }
          }}
        />

        <Line
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities in Massachusetts',
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