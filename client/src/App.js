import React from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/"></Link>
          <Link to="/task"></Link>
          <Link to="/other"></Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<Task />}>
          </Route>
          <Route path="/other" element={<Task />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
