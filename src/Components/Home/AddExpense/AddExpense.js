import React, {useContext, useState, useEffect}  from 'react'
import {ExpenseContext} from '../../../Context/ExpenseContext'
import Dropdown from '../../Views/Expenses/Dropdown-Menu/Dropdown'

function AddExpense() {
  const userExpense = useContext(ExpenseContext)

  const [dueDate, setDate] = useState('')
  const [expenseTitle, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [billType, setType] = useState('')


  const createExpense = (e) => {
    // const date = format(new Date(), 'yyyy-MM-dd')
    userExpense.createExpense(dueDate, expenseTitle, amount, billType)
    // console.log('date Expense.js--', dueDate, selectedDay)
    setDate('')
    setTitle('')
    setAmount('')
    setType('')
  }


  return (
    <div>

      <input
        type='date'
        placeholder='Due Date'
        value={dueDate}
        onChange={(e) => setDate(e.target.value)}
      />
      <input 
        type='text'
        placeholder='Expense Name'
        value={expenseTitle}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='text'
        placeholder='Amount'
        value={amount}
        onInput={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
      />

      <div className='drop-down'>
        <div className='center'>
          <Dropdown value={Dropdown.selectedOption} getValue={setType} />
        </div>
      </div>

      <button onClick={createExpense}>Add Expense</button>

    </div>
  )
}

export default AddExpense
