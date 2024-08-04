import { useState, useEffect } from 'react';
import { data4 } from './data';
import "./progressTracker.css";
import { Chart as ChartJS, registerables} from 'chart.js';
import { Line } from 'react-chartjs-2';
import color_generator from './colorGenerator';

ChartJS.register(...registerables);

function ShowProgressTracker({ filters }) {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [backgroundColor, setBackgroundColor] = useState([]);

    const fetchData = async (filters) => {
        const baseUrl = "";
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                body: JSON.stringify(filters),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            return json.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    useEffect(() => {
        const getData = async () => {
            let data;
            if (filters && Object.keys(filters).length > 0) {
                data = await fetchData(filters);
            } else {
                data = data4.data;
            }

            const aggregatedData = aggregateData(data);
            setChartData({
                labels: aggregatedData.map(item => item.date),
                datasets: [ 
                    {
                      label: 'Calories',
                      data: aggregatedData.map(item => item.calories),
                      backgroundColor: 'rgba(75,192,192)',
                      borderColor: 'rgba(75,192,192)',
                      borderWidth: 1,
                      fill: false,
                    }
                ]
            });
            setBackgroundColor(color_generator(aggregatedData.length));
        };
        getData();
    }, [filters]);

    useEffect(() => {
        if (chartData.labels.length > 0) { 
            setBackgroundColor(color_generator(chartData.labels.length));
        }
    }, [chartData]);

    const aggregateData = (data) => {
        return data.reduce((acc, curr) => {
            const found = acc.find(item => item.date === curr.date);
            if (found) {
                found.calories += curr.calories;
            } else {
                acc.push({ date: curr.date, calories: curr.calories });
            }
            return acc;
        }, []);
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    fontSize: 26,
                }
            },
            title: {
              display: true,
              text: 'Calories Burned Vs  Time',
              font: {
                  size: 20,
                  weight: 'bold'
              }
            }
        },
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Date'
              }
            },
            y: {
                title: {
                    display: true,
                    text: 'Calories'
              }
            }
        }
    };

  return (
      <div>
          <Line
              data={chartData} 
              height={300}
              options={options}
          />
      </div>
  );
}

export default ShowProgressTracker;