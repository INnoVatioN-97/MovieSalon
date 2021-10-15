import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Chart = ({ name, skills }) => {
    const colors = ['#FF6384', '#36A2EB', '#e84393', '#FFCE56', '#6c5ce7', '#00b894', '#d63031'];
    console.log('skills: ', skills);
    // const { name } = skills;
    const names = skills.map((m) => {
        return m.name;
    });

    console.log('meObj:', skills);
    const data = {
        labels: names,
        datasets: [
            {
                // data: [300, 50, 100],
                data: skills.map((m) => {
                    return m.projects.length;
                }),
                backgroundColor: colors.splice(0, names.length),
                hoverBackgroundColor: colors.splice(0, names.length),
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
