// import React, {useState, useEffect} from 'react'
import routes from './routes'
import Header from './Components/Header/Header'

import './App.scss';


function App() {
  return (
    <div className="App">

      <Header />
      {routes}

    </div>
  );
}

export default App;
