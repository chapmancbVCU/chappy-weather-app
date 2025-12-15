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
function Minutely({ minutely, units }) {
    /**
     * Processes OneCall data so it can be used in graph.
     * @returns {array} precipitationTotals - An array of precipitation total for next 60 minutes.
     */
    const myData = () => {
        let precipitationTotals = [];
        for(let i = 0; i < minutely?.length; i++) {
            let total = minutely?.[i]?.precipitation;
            const conversionConstant = 2.54;
            if(units === 'imperial') {
                total = ((total / conversionConstant)).toFixed(2);
            }
            console.log(total)
            precipitationTotals.push(total);
        }
        return precipitationTotals;
    }

    /**
     * Builds array for labels.
     * @returns {array} steps - An array containing steps for graph.
     */
    const labels = () => {
        let steps = [];
        for(let i = 0; i < 60; i++) {
            steps.push(i)
        }
        return steps;
    }

    const unitsLabel = () => {
        return (units === 'imperial') ? 'in/h' : 'mm/h';
    }
    
    /**
     * Setup chart data.
     */
    const chartData = {
        labels: labels(),
        datasets: [
            {
                label: unitsLabel(),
                data: myData(),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    }

    /**
     * Setup options for chart.
     */
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