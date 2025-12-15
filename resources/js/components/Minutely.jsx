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
    console.log(minutely);

    const myData = () => {
        let d = [];
        for(let i = 0; i < minutely?.length; i++) {
            d.push(minutely?.[i].precipitation);
        }
        return d;
    }
    console.log(myData())
    const labels = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        51, 52, 53, 54, 55, 56, 57, 58, 59, 60
    ];

    const chartData = {
        labels: labels,
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
            <div style={{ width: '600px', margin: 'auto' }}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}        
export default Minutely;