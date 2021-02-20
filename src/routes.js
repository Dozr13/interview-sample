import React from 'react'
import {Switch, Route, HashRouter} from 'react-router-dom'

import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Home from './Components/Home/Home'
import Edit from './Components/Edit/Edit'
import Graph from './Components/Views/Graph'
import Pie from './Components/Views/Pie'


export default (
  <HashRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/edit' component={Edit} />
      <Route path='/graph' component={Graph} />
      <Route path='/pie' component={Pie} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </Switch>
  </HashRouter>
)