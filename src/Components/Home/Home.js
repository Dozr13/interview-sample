import React, {useContext, useState, useEffect} from 'react'
import {ExpenseContext} from '../../Context/ExpenseContext'
import {Link} from 'react-router-dom'
import './Home.scss'



  function Home(props) {
    
    // const [userId, setUserId] = useState('')
    // const [dueDate, setDueDate] = useState('')
    



  // useEffect(() => {
    
  // }, [expenseCon])


  return (


    <section id='home-view'>

      {/* <input
        type='date'
        placeholder='Due Date'
        value={dueDate}
        onChange={(e) => dayHandler(e.target.value)}
      /> */}




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
    </section>
  )
}

export default Home