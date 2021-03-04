import React, {useContext, useState, useEffect} from 'react'
import {ExpenseContext} from '../../Context/ExpenseContext'
import {Link} from 'react-router-dom'
import './Home.scss'

import DoughnutChart from '../Views/Charts/DoughnutChart'
import BarChart from '../Views/Charts/BarChart'

// import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
// import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';



  function Home() {
    const userExpense = useContext(ExpenseContext)
    const [selectedChart, setSelectedChart] = useState('Doughnut')

    useEffect(() => {
      // console.log('useEffect Expenses.js')
      userExpense.readRangeExpenses()
    }, [])


// !Date Picker

    const defaultFrom = {
      // year: setYear(new Date()),
      // month: setMonth(new Date()),
      // day: setDay(new Date())
      year: 2021,
      month: 3,
      day: 1
    }

    const defaultTo = {
      // year: setYear(new Date()),
      // month: setMonth(new Date()),
      // day: setDay(new Date())
      year: 2021,
      month: 3,
      day: 7
    }


    const defaultRange = {
      from: defaultFrom,
      to: defaultTo
    }

    const [selectedDayRange, setSelectedDayRange] = useState(defaultRange)

    

    const renderCustomInput = ({ ref }) => (
      <input
        readOnly
        ref={ref} // necessary
        placeholder="Select Dates"
        value={selectedDayRange ? `${selectedDayRange.from} - ${selectedDayRange.to}` : ''}
        style={{
          textAlign: 'center',
          padding: '1rem 1.5rem',
          fontSize: '1rem',
          border: '1px solid #9c88ff',
          borderRadius: '100px',
          boxShadow: '0 1.5rem 2rem rgba(156, 136, 255, 0.2)',
          color: '#9c88ff',
          outline: 'none',
        }}
        className="my-custom-input-class" // a styling class
      />
    )



    // useEffect(() => {
      
    // }, [expenseCon])






// // !Button functions to view Doughnut or Bar chart components
//   const doughnutClick = () => {
//     return (
//       <div>
//         <DoughnutChart />
//       </div>
//     )
//   }

//   const barClick = () => {
//     return (
//       <div>
//         <BarChart />
//       </div>
//     )
//   }


  return (


    <section id='home-view'>

      <div className='home-bar'>
        <h5 className='date-view-options'>
          Select View:
        </h5>
        {/* <section className='date-btns'>
          <button className='day'>Day</button>
          <button className='month'>Month</button>
          <button className='year'>Year</button>
        </section> */}
        <section className='date-picker'>
          <DatePicker
            value={selectedDayRange}
            onChange={setSelectedDayRange}
            renderInput={renderCustomInput}
            colorPrimary="#9c88ff" 
            calendarClassName="custom-calendar"
            calendarTodayClassName="custom-today-day" 
            shouldHighlightWeekends
          />
        </section>
      </div>


        <button className='doughnut-btn' onClick={() => setSelectedChart('Doughnut')}>
          View Doughnut
        </button>

        <button className='bar-chart-btn' onClick={() => setSelectedChart('Bar')}>
          View Bar Graph
        </button>

        {selectedChart === 'Doughnut' ? <DoughnutChart /> : <BarChart />}


      <div className='bottom'>
        <section id='chart-btns'>

        </section>
      </div>
    </section>
  )
}

export default Home