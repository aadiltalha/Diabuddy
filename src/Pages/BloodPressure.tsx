import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface BPReading {
  date: string;
  systolic: number;
  diastolic: number;
}

const BloodPressure = () => {
  const [readings, setReadings] = useState<BPReading[]>(() => {
    const storedReadings = localStorage.getItem('bloodPressure');
    return storedReadings ? JSON.parse(storedReadings) : [];
  });
  const { register, handleSubmit, reset } = useForm<BPReading>();

  const onSubmit = (data: BPReading) => {
    const newReadings = [...readings, data];
    setReadings(newReadings);
    localStorage.setItem('bloodPressure', JSON.stringify(newReadings));
    reset();
  };

  const chartData = {
    labels: readings.map(r => r.date),
    datasets: [
      {
        label: 'Systolic',
        data: readings.map(r => r.systolic),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Diastolic',
        data: readings.map(r => r.diastolic),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">Blood Pressure</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
          <input
            type="date"
            id="date"
            {...register('date')}
            defaultValue={format(new Date(), 'yyyy-MM-dd')}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="systolic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Systolic</label>
          <input type="number" id="systolic" {...register('systolic', { valueAsNumber: true })} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label htmlFor="diastolic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Diastolic</label>
          <input type="number" id="diastolic" {...register('diastolic', { valueAsNumber: true })} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">Add Reading</button>
      </form>
      {readings.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Blood Pressure Trend</h2>
          <div className="h-[400px]">
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodPressure;

