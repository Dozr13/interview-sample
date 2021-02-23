import React, {useContext, useEffect, useState}  from 'react'
import {AuthContext} from '../../Context/AuthContext'
// import Day from './Day'
import axios from 'axios'

import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'
import format from 'date-fns/format'

import startOfWeek from 'date-fns/startOfWeek'
import addDays from 'date-fns/addDays'

import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'

// import endOfDay from 'date-fns/endOfDay'
import endOfWeek from 'date-fns/endOfWeek'
import isSameMonth from 'date-fns/isSameMonth'
import isSameDay from 'date-fns/isSameDay'
import parse from 'date-fns/parse'

import './Month.scss'

function Month() {
  const userAuth = useContext(AuthContext)

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    if(!userAuth.user){
      axios.get('/api/auth/me').then(({data}) => {
        userAuth.setUser(data)
      }).catch(err => console.log(err))}
  }, [])


  const header = () => {
    const dateFormat = 'MMM dd, yyyy'

    return(
      <div className="header row flex-middle">
        <div className="column col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
      </div>
      <div className="column col-center">
        <span>
          {format(currentDate, dateFormat)}
        </span>
      </div>
      <div className="column col-end">
        <div className="icon" onClick={nextMonth}>
          chevron_right
        </div>
      </div>
   </div>
    )
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }


  const daysOfTheWeek = () => {
    const dateFormat = "iiii"
    const days = []

    let startDate = startOfWeek(currentDate)

    for(let i = 0; i < 7; i++){
      days.push(
        <div className='column col-center' key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      )
    }
    return <div className='days row'>{days}</div>
  }


  const cells = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    const dateFormat = 'd'
    const rows = []

    let days = []
    let day = startDate
    let formattedDate = ''

    while(day <= endDate){
      for(let i = 0; i < 7; i++){
        formattedDate = format(day, dateFormat)
        const cloneDay = day
        // console.log(dayClone)
        days.push(
          <div 
          className={`column cell ${!isSameMonth(day, monthStart) ? 'disabled' 
            : isSameDay(day, selectedDate) ? 'selected' : ''}`}
          key={day}
          onClick={() => onDateClick(parse(cloneDay))}
          >
            <span className='number'>{formattedDate}</span>
            <span className='bg'>{formattedDate}</span>
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div className='row' key={day}>{days}</div>
      )
      days = []
    }
    return <div className='body'>{rows}</div>
  }

  const onDateClick = (day) => {
    setSelectedDate(day, currentDate.getMonth(), currentDate.getYear())
    alert(format(day, 'MMM-dd-yyyy'))
  }

  // const dayFlop = () => {
  // let day = new Date('2015-04-21') 
  // return <h3>day.getDate()</h3>
  // }
  return (
    <section className='calender'>
      <div>{header()}</div>
      <div>{daysOfTheWeek()}</div>
      <div>{cells()}</div>
      {/* <h3>
        {new Date().getDate()}
      </h3> */}
    </section>
  )
}

export default Month