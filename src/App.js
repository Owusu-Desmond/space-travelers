import './styling/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App-content">
        <Routes>
          <Route path="/" element={<h1>this is my rockets page</h1>} />
          <Route path="/missions" element={<h2>this is my missions page</h2>} />
          <Route path="/profile" element={<h3>this is my profile page</h3>} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
