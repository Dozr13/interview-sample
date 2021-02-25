import React, {useContext, useState, useEffect} from 'react'
import {ExpenseContext} from '../../Context/ExpenseContext'
import {Link} from 'react-router-dom'
import './Home.scss'

import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
// import Calendar from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';


  function Home(props) {
    
    // const [userId, setUserId] = useState('')
    // const [dueDate, setDueDate] = useState('')
    
    const [selectedDay, setSelectedDay] = useState('')

    const expenseCon = useContext(ExpenseContext)


  // useEffect(() => {
    
  // }, [expenseCon])


  
  const dayHandler = (date) => {
    // console.log(date)
    setSelectedDay(date)
    expenseCon.readDay(date)
    // setDueDate('')
  }

    const readDay = (e) => {
    expenseCon.expenses.map((b, i) => {
      return <li key={i}>{b.dueDate}</li>
    })
  }


  return (

    <section id='home-view'>
      <div className='calendar-box'>
          <DatePicker
            value={selectedDay}
            onChange={(e) => dayHandler(e)}
            />
      </div>

      {/* <input
        type='date'
        placeholder='Due Date'
        value={dueDate}
        onChange={(e) => dayHandler(e.target.value)}
      /> */}

      <ul>
        {readDay}
      </ul>



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