// import React, {useState, useEffect} from 'react'
import routes from './routes'
import {Link} from 'react-router-dom'

import './App.css';


function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/graph">View as Graph</Link>
        <Link to="pie">View as Pie Chart</Link>
      </nav>
      {routes}
    </div>
  );
}

export default App;
