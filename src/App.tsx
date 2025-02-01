import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SugarLevels from './pages/SugarLevels';
import BloodPressure from './pages/BloodPressure';
import Medicines from './pages/Medicines';
import MedicalRecords from './pages/MedicalRecords';
import Reports from './pages/Reports';
import Reminders from './pages/Reminders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="sugar-levels" element={<SugarLevels />} />
          <Route path="blood-pressure" element={<BloodPressure />} />
          <Route path="medicines" element={<Medicines />} />
          <Route path="medical-records" element={<MedicalRecords />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reminders" element={<Reminders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

