import React from "react";
import "@css/forecast.css";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);
/**
 * Renders minutely precipitation forecast as a bar chart.
 * @param {InputProps} param0 
 * @returns {JSX.Element} The minutely precipitation forecast.
 */
function Minutely({ minutely }) {

    const myData = () => {
        let d = [];
        for(let i = 0; i < minutely?.length; i++) {
            d.push(minutely?.[i].precipitation);
        }
        return d;
    }

    const labels = () => {
        let steps = [];
        for(let i = 0; i < 60; i++) {
            steps.push(i)
        }
        return steps;
    }

    const chartData = {
        labels: labels(),
        datasets: [
            {
                label: "mm/h",
                data: myData(),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }

    return (
        <div className="card forecast my-4">
            <h4 className="text-center mt-4">Minutely Forecast</h4>
            <div className="minutely-chart">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}        
export default Minutely;