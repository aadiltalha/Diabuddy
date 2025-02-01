import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Home, Activity, Heart, Pill, FileText, Menu, X, Sun, Moon, FileBarChart, Bell } from 'lucide-react';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const NavLink: React.FC<{ to: string; icon: React.ElementType; children: React.ReactNode }> = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className={`flex items-center space-x-2 p-2 rounded-lg ${
        location.pathname === to
          ? 'bg-blue-500 text-white'
          : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Icon size={20} />
      <span>{children}</span>
    </Link>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <nav
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
            <Link to="/" className="font-semibold text-xl text-blue-600 dark:text-blue-400">
              Diabuddy
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            <NavLink to="/" icon={Home}>Dashboard</NavLink>
            <NavLink to="/sugar-levels" icon={Activity}>Sugar Levels</NavLink>
            <NavLink to="/blood-pressure" icon={Heart}>Blood Pressure</NavLink>
            <NavLink to="/medicines" icon={Pill}>Medicines</NavLink>
            <NavLink to="/medical-records" icon={FileText}>Medical Records</NavLink>
            <NavLink to="/reports" icon={FileBarChart}>Reports</NavLink>
            <NavLink to="/reminders" icon={Bell}>Reminders</NavLink>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 mr-4"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white md:hidden">React.Js Diabetic Manager</h1>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDarkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-500" />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

