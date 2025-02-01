import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SugarReading {
  date: string;
  category: 'Fasting' | 'After breakfast' | 'After lunch' | 'After dinner';
  level: number;
}

const SugarLevels = () => {
  const [readings, setReadings] = useState<SugarReading[]>(() => {
    const storedReadings = localStorage.getItem('sugarLevels');
    return storedReadings ? JSON.parse(storedReadings) : [];
  });
  const { register, handleSubmit, reset } = useForm<SugarReading>();

  useEffect(() => {
    localStorage.setItem('sugarLevels', JSON.stringify(readings));
  }, [readings]);

  const onSubmit = (data: SugarReading) => {
    const newReadings = [...readings, data];
    setReadings(newReadings);
    reset();
  };

  const chartData = {
    labels: readings.map(r => `${r.date} (${r.category})`),
    datasets: [
      {
        label: 'Sugar Levels',
        data: readings.map(r => r.level),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">Sugar Levels</h1>
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
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
          <select
            id="category"
            {...register('category')}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="Fasting">Fasting</option>
            <option value="After breakfast">After breakfast</option>
            <option value="After lunch">After lunch</option>
            <option value="After dinner">After dinner</option>
          </select>
        </div>
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sugar Level</label>
          <input
            type="number"
            id="level"
            {...register('level', { valueAsNumber: true })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">Add Reading</button>
      </form>
      {readings.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Sugar Level Trend</h2>
          <div className="h-[400px]">
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SugarLevels;

