import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PreviewTable from './components/PreviewTable';
import Dashboard from './components/Dashboard';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <header className='App-header'>
          <div>
            <img src={logo} className='App-logo' alt='logo' />
            <h1>Dashboard App</h1>
          </div>
          <div>
            <Link to={`/`}><button className='Navigation'>Back To Home</button></Link>
          </div>
        </header>
        <div className='App-body'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/JSON/:id' element={<PreviewTable />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;