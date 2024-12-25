import { Routes, Route } from 'react-router-dom';
import EmployeeDashboard from './components/Dashboard';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
