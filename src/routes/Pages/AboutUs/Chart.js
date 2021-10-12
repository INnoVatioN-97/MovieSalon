import React from 'react';
import {Doughnut} from 'react-chartjs-2';



export const Chart_go = () => {
    const data = {
        labels: [
          'JAVA',
          'C++',
          'JS'
        ],
        datasets: [{
          data: [300, 50, 100],
          backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ],
          hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ],
        }]
      };
  return (
    <div>
        <h2>Ko's Stack</h2>
        <Doughnut data={data} />
    </div>
  );
}

export const Chart_Kang = () => {
  const data = {
      labels: [
        'JAVA',
        'C++',
        'JS'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
        ],
      }]
    };
return (
  <div>
      <h2>Kang's Stack</h2>
      <Doughnut data={data} />
  </div>
);
}

  export const Project = () => {
    const data2 = {
        labels: [
          'JS',
          'CSS',
          'HTML'
        ],
        datasets: [{
          data: [93.1, 5.6, 1.3],
          backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ],
          hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ]
        }]
      };
      return (
          <div>
              <h2>Project</h2>
              <Doughnut data={data2} />
          </div>
      )
  }
