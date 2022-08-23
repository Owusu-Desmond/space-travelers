import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styling/App.css';
import Navbar from './components/Navbar';
import RocketPage from './components/rocketPage';
import Missions from './components/Missions';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <hr />
      <div className="App-content">
        <Routes>
          <Route path="/" element={<RocketPage />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/profile" element={<h3>this is my profile page</h3>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
