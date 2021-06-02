import React from 'react'
import ReactDOM from 'react-dom'

class ProgressR extends React.Component {
    constructor(props) {
      super(props);
      
      const { radius, stroke } = this.props;
      
      this.normalizedRadius = radius - stroke * 2;
      this.circumference = this.normalizedRadius * 2 * Math.PI;
    }
    
    render() {
      const { radius, stroke, progress } = this.props;
  
      const strokeDashoffset = this.circumference - progress / 100 * this.circumference;
    
      return (
        <svg
          height={radius * 2}
          width={radius * 2}
         >
          <circle
            stroke="#67C947"
            fill="transparent"
            strokeWidth={ stroke }
            strokeDasharray={ this.circumference + ' ' + this.circumference }
            style={ { strokeDashoffset } }
            r={ this.normalizedRadius }
            cx={ radius }
            cy={ radius }
           />
        </svg>
      );
    }
  }
  
class ProgressRing extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        progress: -1
      };
    }
    
    componentDidMount() {
      // emulating progress
      const interval = setInterval(() => {
        console.log(this.state.progress, this.props.totalProgress)
        this.setState({ progress: this.state.progress + 1 });
        if (this.state.progress === this.props.totalProgress)
          clearInterval(interval);
      }, 100);
    }
    
    render() {
      return (
        <ProgressR
          radius={ 140 }
          stroke={ 20 }
          progress={ this.state.progress }
        />
      );
    }
  }
  
//   ReactDOM.render(
//    <Example />,
//     document.getElementById('example')
//   );

export default ProgressRing;