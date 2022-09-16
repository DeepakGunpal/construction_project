import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Project from './pages/project/Project';
import PdfReport from './pages/report/PdfReport';
import LineChart from './pages/report/LineChart';
import Home from './pages/home/Home';

function App() {
  return (
    <div className="App">
      <Home />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/project' element={<Project />} >
          <Route path=':projectId' element={<Project />} />
        </Route>
        <Route path='/report/pdfreport' element={<PdfReport />} />
        <Route path='/report/allprojectbudgetplot' element={<LineChart />} />
      </Routes>
    </div>
  );
}

export default App;
