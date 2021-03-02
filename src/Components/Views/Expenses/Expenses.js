import React, {useContext, useState, useEffect}  from 'react'
import {ExpenseContext} from '../../../Context/ExpenseContext'
import {AuthContext} from '../../../Context/AuthContext'
import Dropdown from './Dropdown-Menu/Dropdown'
import Select from 'react-select'

import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

import TableView from './Table/TableView'

// import format from 'date-fns/format'


function Expenses() {
  const [dueDate, setDate] = useState('')
  const [expenseTitle, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [billType, setType] = useState('')
  // Bill Date selector to see specific dates
  const [selectedDay, setSelectedDay] = useState('')

  const userExpense = useContext(ExpenseContext)

  useEffect(() => {
    const curr = new Date()
    
    console.log('useEffect Expenses.js', curr)
    userExpense.readDay(curr)
  }, [])


  const createExpense = (e) => {
    // const date = format(new Date(), 'yyyy-MM-dd')
    userExpense.createExpense(dueDate, expenseTitle, amount, billType)
    // console.log('date Expense.js--', dueDate, selectedDay)
    setDate('')
    setTitle('')
    setAmount('')
    setType('')
  }

  const dayHandler = (dueDate) => {
    // console.log('readDay func', dueDate)
    setSelectedDay(dueDate)
    userExpense.readDay(dueDate)
  }


  const renderCustomInput = ({ ref }) => (

    <input
      readOnly
      ref={ref} // necessary
      placeholder="Click Here for Calendar!"
      value={selectedDay ? `${selectedDay.month}: ${selectedDay.day}` : ''}
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

  return (
    <div>

      <div className='calendar-box'>
          <DatePicker
            value={selectedDay}
            onChange={(e) => dayHandler(e)}
            renderInput={renderCustomInput}
            colorPrimary="#9c88ff" 
            calendarClassName="custom-calendar"
            calendarTodayClassName="custom-today-day" 
            shouldHighlightWeekends
            />
      </div>

      <div>
        <TableView />
      </div>

      <input
        type='date'
        placeholder='Due Date'
        value={dueDate}
        onChange={(e) => setDate(e.target.value)}
      />
      <input 
        placeholder='Expense Name'
        value={expenseTitle}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='text'
        pattern='[0-9]*'
        placeholder='Amount'
        value={amount}
        onInput={(e) => setAmount(e.target.value)}
      />


      {/* <input
        placeholder='Expense type'
        value={billType}
        onChange={(e) => setType(e.target.value)}
      /> */}
      <div className='drop-down'>
        <div className='center'>
          <Dropdown value={Dropdown.selectedOption} getValue={setType} />
        </div>
      </div>

      <button onClick={createExpense}>Add Expense</button>
    </div>
  )
}

export default Expenses
