import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import Nav from '../../component/nav/Nav';
import './LineChart.css'
import { axiosInstance } from '../../config';

const LineChart = () => {
    const [chartData, setChartData] = useState([])
    const fetchData = async () => {
        await axiosInstance.get('/dashboard')
            .then((data) => setChartData(data.data.data));
    }

    useEffect(() => {
        fetchData();
    }, [])

    const lineChart = {
        labels: chartData.map(data => data.projectId),
        datasets: [{
            label: 'Budget',
            data: chartData.map(data => data.budget),
            backgroundColor: ['green'],
            borderColor: ['green'],
            borderWidth: 2,
            pointHoverBorderWidth: 12,
            pointBorderWidth: 8,
            tension: 0.1
        }]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'All Projects Budget Plot',
                font: { size: 30 }
            },
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'ProjectId',
                    font: { size: 20 }
                }
            },
            y: {
                grid: {
                    display: false
                },
                title: {
                    display: true,
                    text: '₹ Crore',
                    font: { size: 20 }
                }
            }
        }
    };

    return (
        <div>
            <div className='nav_in_linechart'>
                <Nav />
            </div>
            <div className='line_chart' >
                <Line
                    data={lineChart}
                    options={options}
                />
            </div>
        </div>
    )
}

export default LineChart