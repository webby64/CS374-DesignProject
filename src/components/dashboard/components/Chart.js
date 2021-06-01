import React from 'react';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['Week 1', 'Week 2','Week 3','Week 4','Week 5',"Week 6"],
  datasets: [
    {
      label: 'Number of Books Read',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [0, 1, 2, 2, 4]
    }
  ]
}

function Chart(state) {
  
    return (
      <div >
        <Line
          data={state}
          width = {450}
          height = {250}
          options={{
            title:{
              display:true,
              text:'Books Read',
              fontSize:12,
            },
            legend:{
              display:true,
              position:'right'
            },
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  
}

export default Chart