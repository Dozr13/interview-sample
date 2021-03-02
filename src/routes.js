import React from 'react'
import {Switch, Route, HashRouter} from 'react-router-dom'

import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Home from './Components/Home/Home'
import Expenses from './Components/Views/Expenses/Expenses'
// import Graph from './Components/Views/Graph'
// import Pie from './Components/Views/Pie'


export default (
  <HashRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register} />

      <Route path='/home' component={Home} />
      <Route path='/expenses' component={Expenses} />
      {/* <Route path='/graph' component={Graph} />
      <Route path='/pie' component={Pie} /> */}
    </Switch>
  </HashRouter>
)