import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RoomList from './components/RoomList';
import RentalProfile from './components/RentalProfile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <h1>PG Rental Management System</h1>
            <nav className="nav-menu">
              <Link to="/" className="nav-link">Browse Rooms</Link>
              <Link to="/profile" className="nav-link">My Profile</Link>
            </nav>
          </div>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<RoomList />} />
            <Route path="/profile" element={<RentalProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;