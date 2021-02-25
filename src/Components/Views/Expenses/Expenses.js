import React, {useContext, useState}  from 'react'
import {ExpenseContext} from '../../../Context/ExpenseContext'
import Dropdown from './Dropdown-Menu/Dropdown'

import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

import TableView from './Table/TableView'


function Expenses() {
  const [dueDate, setDate] = useState('')
  const [expenseTitle, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [billType, setType] = useState('')

  const [selectedDay, setSelectedDay] = useState('')

  const userExpense = useContext(ExpenseContext)


  const createExpense = (e) => {
    // e.preventDefault()
    userExpense.createExpense(dueDate, expenseTitle, amount, billType)
    setDate('')
    setTitle('')
    setAmount('')
    setType('')
  }

  const dayHandler = (date) => {
    setSelectedDay(date)
    userExpense.readDay(date)
  }

  // const readDay = (e) => {
  //   userExpense.expenses.map((b, i) => {
  //     return <li key={i}>{b.dueDate}</li>
  //   })
  // }

  return (
    <div>
      This is the Expenses Component!


      <div className='calendar-box'>
          <DatePicker
            value={selectedDay}
            onChange={(e) => dayHandler(e)}
            />
      </div>

      <div>
        <TableView />
      </div>

      {/* <ul>
        {readDay}
      </ul> */}



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
        type='number'
        placeholder='Amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
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
