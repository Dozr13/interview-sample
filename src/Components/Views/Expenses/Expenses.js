import React, {useContext, useState}  from 'react'
import {ExpenseContext} from '../../../Context/ExpenseContext'
import Dropdown from './Dropdown-Menu/Dropdown'


function Expenses() {
  const [dueDate, setDate] = useState('')
  const [expenseTitle, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [billType, setType] = useState('')

  const userExpense = useContext(ExpenseContext)

  const createExpense = (e) => {
    // e.preventDefault()
    userExpense.createExpense(dueDate, expenseTitle, amount, billType)
    setDate('')
    setTitle('')
    setAmount('')
    setType('')
  }




  return (
    <div>
      This is the Expenses Component!
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
