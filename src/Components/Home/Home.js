import React, {useContext, useEffect} from 'react'
import {AuthContext} from '../../Context/AuthContext'
import {Link} from 'react-router-dom'
import './Home.scss'
import axios from 'axios'

function Home() {
const userAuth = useContext(AuthContext)
// console.log(userAuth)

useEffect(() => {
  if(!userAuth.user){
    axios.get('/api/auth/me').then(({data}) => {
      userAuth.setUser(data)
    }).catch(err => (err))}
}, [])


  return (
    <div className='bottom'>

      <section id='chart-btns'>

        <button className='graph-btn'>
          <Link to="/graph">View Graph</Link>
        </button>

        <button className='pie-btn'>
          <Link to="/pie">View Pie Chart</Link>
        </button>

      </section>

    </div>
  )
}

export default Home