import React, {useContext, useState, useEffect}  from 'react'
import {ExpenseContext} from '../../../Context/ExpenseContext'
// import {AuthContext} from '../../../Context/AuthContext'
import Dropdown from './Dropdown-Menu/Dropdown'
// import Select from 'react-select'

import TableView from './Table/TableView'

// import format from 'date-fns/format'


function Expenses() {
  const [dueDate, setDate] = useState('')
  const [expenseTitle, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [billType, setType] = useState('')
  // Bill Date selector to see specific dates
  // const [selectedDay, setSelectedDay] = useState('')

  const userExpense = useContext(ExpenseContext)

  // useEffect(() => {
  //   // console.log('useEffect Expenses.js')
  //   userExpense.readDay()
  // }, [])


  const createExpense = (e) => {
    // const date = format(new Date(), 'yyyy-MM-dd')
    userExpense.createExpense(dueDate, expenseTitle, amount, billType)
    // console.log('date Expense.js--', dueDate, selectedDay)
    setDate('')
    setTitle('')
    setAmount('')
    setType('')
  }

  // const dayHandler = (dueDate) => {
  //   // console.log('readDay func', dueDate)
  //   setSelectedDay(dueDate)
  //   userExpense.readDay(dueDate)
  // }


  return (
    <div>
      <div>
        <TableView />
      </div>


    </div>
  )
}

export default Expenses
