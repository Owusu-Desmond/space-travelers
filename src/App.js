import './styling/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/Navbar';
import store from './redux/configureStore';
import Missions from './components/Missions';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <div className="App-content">
          <Routes>
            <Route path="/" element={<h1>this is my rockets page</h1>} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/profile" element={<h3>this is my profile page</h3>} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>

  );
}

export default App;
