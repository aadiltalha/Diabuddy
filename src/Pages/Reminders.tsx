import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Bell, Calendar } from 'lucide-react';

interface Reminder {
  id: string;
  type: 'medicine' | 'appointment';
  title: string;
  time: string;
  date?: string;
}

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const { register, handleSubmit, reset } = useForm<Omit<Reminder, 'id'>>();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Request notification permission when the component mounts
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setIsNotificationsEnabled(true);
          registerServiceWorker();
        }
      });
    }

    // Check for reminders every minute
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, []);

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registered successfully:', registration);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  };

  const onSubmit = (data: Omit<Reminder, 'id'>) => {
    const newReminder: Reminder = {
      ...data,
      id: Date.now().toString(),
    };
    setReminders([...reminders, newReminder]);
    reset();
  };

  const checkReminders = () => {
    const now = new Date();
    reminders.forEach(reminder => {
      const [hours, minutes] = reminder.time.split(':');
      const reminderTime = new Date();
      reminderTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);

      if (reminder.type === 'appointment' && reminder.date) {
        const [year, month, day] = reminder.date.split('-');
        reminderTime.setFullYear(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
      }

      if (Math.abs(now.getTime() - reminderTime.getTime()) < 60000) {
        showNotification(reminder);
      }
    });
  };

  const showNotification = (reminder: Reminder) => {
    if (isNotificationsEnabled) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(reminder.title, {
          body: `It's time for your ${reminder.type === 'medicine' ? 'medicine' : 'doctor appointment'}!`,
          icon: '/logo192.png',
        });
      });
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold dark:text-white">Reminders & Alerts</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
          <select
            id="type"
            {...register('type', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="medicine">Medicine</option>
            <option value="appointment">Appointment</option>
          </select>
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            id="title"
            {...register('title', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
          <input
            type="time"
            id="time"
            {...register('time', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date (for appointments)</label>
          <input
            type="date"
            id="date"
            {...register('date')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Add Reminder
        </button>
      </form>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Upcoming Reminders</h3>
        <ul className="space-y-2">
          {reminders.map(reminder => (
            <li key={reminder.id} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              {reminder.type === 'medicine' ? <Bell size={20} /> : <Calendar size={20} />}
              <span>{reminder.title} - {reminder.time} {reminder.date && `(${reminder.date})`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reminders;

