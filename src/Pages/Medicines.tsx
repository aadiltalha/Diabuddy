import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  prescription: string;
  lastPrescriptionDate: string;
  lastPrescriptionFile?: File;
}

const Medicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const { register, handleSubmit, reset } = useForm<Medicine>();

  const onSubmit = (data: Medicine) => {
    setMedicines([...medicines, data]);
    reset();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">Medicines</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Medicine Name</label>
          <input type="text" id="name" {...register('name')} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Dosage</label>
          <input type="text" id="dosage" {...register('dosage')} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Frequency</label>
          <input type="text" id="frequency" {...register('frequency')} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label htmlFor="prescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prescription Details</label>
          <textarea id="prescription" {...register('prescription')} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={3}></textarea>
        </div>
        <div>
          <label htmlFor="lastPrescriptionDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Prescription Date</label>
          <input
            type="date"
            id="lastPrescriptionDate"
            {...register('lastPrescriptionDate')}
            defaultValue={format(new Date(), 'yyyy-MM-dd')}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="lastPrescriptionFile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Last Prescription (Optional)</label>
          <input type="file" id="lastPrescriptionFile" {...register('lastPrescriptionFile')} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">Add Medicine</button>
      </form>
      {medicines.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Medicine List</h2>
          <ul className="space-y-4">
            {medicines.map((medicine, index) => (
              <li key={index} className="border-b pb-4 dark:border-gray-700">
                <h3 className="font-bold dark:text-white">{medicine.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">Dosage: {medicine.dosage}</p>
                <p className="text-gray-600 dark:text-gray-300">Frequency: {medicine.frequency}</p>
                <p className="text-gray-600 dark:text-gray-300">Prescription: {medicine.prescription}</p>
                <p className="text-gray-600 dark:text-gray-300">Last Prescription Date: {medicine.lastPrescriptionDate}</p>
                {medicine.lastPrescriptionFile && (
                  <p className="text-gray-600 dark:text-gray-300">Prescription File: {medicine.lastPrescriptionFile.name}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Medicines;

