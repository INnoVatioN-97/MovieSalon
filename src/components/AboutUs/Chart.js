import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import randomColor from 'randomcolor';

const Chart = ({ name, skills }) => {
  const colors = Object.keys(skills).map((sk) => randomColor());
  // const { name } = skills;
  //  // console.log('Chart::: skills: ', skills);

  const data = {
    labels: Object.keys(skills),
    datasets: [
      {
        // data: [300, 50, 100],
        data: Object.values(skills),
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
  return (
    <div>
      <h2>{name}'s Stacks 한 눈에 보기</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default Chart;
