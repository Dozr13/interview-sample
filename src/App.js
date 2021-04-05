import React, {useEffect, useContext} from 'react'
import routes from './routes'
import Header from './Components/Header/Header'
import {AuthContext, AuthProvider} from './Context/AuthContext'
import {withRouter} from 'react-router-dom'


import './App.scss';

function App() {

  return (
    <AuthProvider>
      <div className="App">
        <Header />
        {routes}
      </div>
    </AuthProvider>
  );
}

export default withRouter(App);