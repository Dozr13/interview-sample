import React from 'react'
import {Switch, Route, HashRouter} from 'react-router-dom'

// import PrivateRoute from './PrivateRoute'

import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Home from './Components/Home/Home'
import Month from './Components/Display/Month'
import Week from './Components/Display/Week'
import Day from './Components/Display/Day'
import Graph from './Components/Views/Graph'
import Pie from './Components/Views/Pie'


export default (
  <HashRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register} />

      <Route path='/home' component={Home} />
      <Route path='/month' component={Month} />
      <Route path='/week' component={Week} />
      <Route path='/day' component={Day} />
      <Route path='/graph' component={Graph} />
      <Route path='/pie' component={Pie} />
    </Switch>
  </HashRouter>
)