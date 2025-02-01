import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [sugarLevels, setSugarLevels] = useState<{ category: string; level: number }[]>([]);
  const [bloodPressure, setBloodPressure] = useState<{ systolic: number; diastolic: number; date: string; category: string }[]>([]);
  const [medicines, setMedicines] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const fetchData = () => {
      // Fetch sugar levels
      const storedSugarLevels = localStorage.getItem('sugarLevels');
      if (storedSugarLevels) {
        const parsedLevels = JSON.parse(storedSugarLevels);
        setSugarLevels(parsedLevels);
      }

      // Fetch blood pressure
      const storedBloodPressure = localStorage.getItem('bloodPressure');
      if (storedBloodPressure) {
        const parsedBP = JSON.parse(storedBloodPressure);
        setBloodPressure(parsedBP);
      }

      // Fetch medicines
      const storedMedicines = localStorage.getItem('medicines');
      if (storedMedicines) {
        const parsedMedicines = JSON.parse(storedMedicines);
        setMedicines(parsedMedicines);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Refresh data every minute

    return () => clearInterval(intervalId);
  }, []);

  const sugarData = {
    labels: ['Fasting', 'After Breakfast', 'After Lunch', 'After Dinner'],
    datasets: [
      {
        label: 'Sugar Levels',
        data: ['Fasting', 'After breakfast', 'After lunch', 'After dinner'].map(
          category => {
            const categoryData = sugarLevels.filter(reading => reading.category === category);
            return categoryData.length > 0 ? categoryData[categoryData.length - 1].level : 0;
          }
        ),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const bpData = {
    labels: bloodPressure.slice(-7).map(bp => bp.date),
    datasets: [
      {
        label: 'Systolic',
        data: bloodPressure.slice(-7).map(bp => bp.systolic),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Diastolic',
        data: bloodPressure.slice(-7).map(bp => bp.diastolic),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-2/3 space-y-8">
        <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Sugar Levels</h2>
            <div className="h-[300px]">
              <Line data={sugarData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Blood Pressure (Last 7 Readings)</h2>
            <div className="h-[300px]">
              <Line data={bpData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/3">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Summary</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium dark:text-white">Latest Sugar Levels</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                {['Fasting', 'After breakfast', 'After lunch', 'After dinner'].map(category => {
                  const categoryData = sugarLevels.filter(reading => reading.category === category);
                  const latestReading = categoryData.length > 0 ? categoryData[categoryData.length - 1].level : 'N/A';
                  return <li key={category}>{category}: {latestReading} mg/dL</li>;
                })}
              </ul>
            </div>
            <div>
              <h3 className="font-medium dark:text-white">Latest Blood Pressure</h3>
              {bloodPressure.length > 0 ? (
                <p className="text-gray-600 dark:text-gray-300">
                  {bloodPressure[bloodPressure.length - 1].systolic}/{bloodPressure[bloodPressure.length - 1].diastolic} mmHg
                  ({bloodPressure[bloodPressure.length - 1].category})
                </p>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">No data available</p>
              )}
            </div>
            <div>
              <h3 className="font-medium dark:text-white">Medicines</h3>
              {Object.entries(medicines).map(([category, medicineList]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium dark:text-white">{category}</h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    {medicineList.map((medicine, index) => (
                      <li key={index}>{medicine}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

