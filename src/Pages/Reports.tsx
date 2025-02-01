import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FileText, Download } from 'lucide-react';

type ReportCategory = 'Heart' | 'Kidney' | 'Eyes' | 'Diabetes' | 'Foot wound' | 'Lungs' | 'Blood Pressure';

interface Report {
  id: string;
  category: ReportCategory;
  date: string;
  title: string;
  file: File;
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const { register, handleSubmit, reset } = useForm<Omit<Report, 'id' | 'file'>>();

  const onSubmit = (data: Omit<Report, 'id' | 'file'>, event: React.BaseSyntheticEvent) => {
    const fileInput = event.target.file as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      const newReport: Report = {
        ...data,
        id: Date.now().toString(),
        file: fileInput.files[0],
      };
      setReports((prevReports) => [...prevReports, newReport]);
      reset();
    }
  };

  const downloadFile = (report: Report) => {
    const url = URL.createObjectURL(report.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = report.file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">Reports</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Upload New Report</h2>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              id="category"
              {...register('category')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="Heart">Heart</option>
              <option value="Kidney">Kidney</option>
              <option value="Eyes">Eyes</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Foot wound">Foot wound</option>
              <option value="Lungs">Lungs</option>
              <option value="Blood Pressure">Blood Pressure</option>
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date
            </label>
            <input
              type="date"
              id="date"
              {...register('date')}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              File
            </label>
            <input
              type="file"
              id="file"
              {...register('file')}
              required
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Upload Report
          </button>
        </form>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Report Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200">Total Reports</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">{reports.length}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-green-800 dark:text-green-200">Latest Upload</h3>
              <p className="text-xl font-bold text-green-600 dark:text-green-300">
                {reports.length > 0 ? new Date(reports[reports.length - 1].date).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
      {reports.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow overflow-hidden">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Uploaded Reports</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">File</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{report.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{report.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{report.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <FileText className="inline-block mr-2" size={16} />
                      {report.file.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <button
                        onClick={() => downloadFile(report)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                      >
                        <Download className="mr-1" size={16} />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;

