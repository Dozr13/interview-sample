import React, {useContext, useState, useEffect} from 'react'
import {ExpenseContext} from '../../Context/ExpenseContext'
import {Link} from 'react-router-dom'
import './Home.scss'

import Pie from '../Views/Charts/Pie'



  function Home(props) {
    
    // const [userId, setUserId] = useState('')
    // const [dueDate, setDueDate] = useState('')
    



  // useEffect(() => {
    
  // }, [expenseCon])


  return (


    <section id='home-view'>

      <div>
        <Pie />
      </div>


      <div className='bottom'>
        <section id='chart-btns'>
          {/* <button className='graph-btn'>
            <Link to="/graph">View Graph</Link>
          </button>
          <button className='pie-btn'>
            <Link to="/pie">View Pie Chart</Link>
          </button> */}
        </section>
      </div>
    </section>
  )
}

export default Home