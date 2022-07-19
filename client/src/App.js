import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PreviewTable from './components/PreviewTable';
import Dashboard from './components/Dashboard';
import LoginRegister from './components/LoginRegister';
import Header from './components/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <div className='App-body'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/JSON/:id' element={<PreviewTable />} />
            <Route path='/login' element={<LoginRegister />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;