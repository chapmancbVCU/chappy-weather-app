import React from "react";
import "@css/forecast.css";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
function Minutely() {

    return (
        <div className="card forecast my-4">
            <h4 className="text-center mt-4">Minutely Forecast</h4>
        </div>
    );
}        
export default Minutely;