import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface MedicalRecord {
  date: string;
  title: string;
  file: FileList;
}

const MedicalRecords = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const { register, handleSubmit, reset } = useForm<MedicalRecord>();

  const onSubmit = (data: MedicalRecord) => {
    setRecords([...records, data]);
    reset();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">Medical Records</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
          <input type="date" id="date" {...register('date')} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input type="text" id="title" {...register('title')} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300">File</label>
          <input type="file" id="file" {...register('file')} required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">Upload Record</button>
      </form>
      {records.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Uploaded Records</h2>
          <ul className="space-y-2">
            {records.map((record, index) => (
              <li key={index} className="border-b pb-2 dark:border-gray-700">
                <strong className="dark:text-white">{record.date}</strong> - {record.title} (File: {record.file[0].name})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;

