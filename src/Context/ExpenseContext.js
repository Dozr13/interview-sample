import {createContext, useState} from 'react'
import axios from 'axios'


export const ExpenseContext = createContext(null)

export const ExpenseProvider = (props) => {
  const [expenses, setExpense] = useState([])


  const createExpense = (dueDate, expenseTitle, amount, billType) => {
    axios.post('/api/new-expense', {dueDate, expenseTitle, amount, billType}).then(({data}) => {
      setExpense(data)
    })
  }

  const readDay = (dueDate) => {
    console.log(dueDate, 'hi!')
    axios.post('/api/read-day', {dueDate}).then(({data}) => {
      console.log('blah', data)
      setExpense(data)
    }).catch(err => console.log(err))
  }

  return (
    <ExpenseContext.Provider value={{expenses, setExpense, createExpense, readDay}}>
      {props.children}
    </ExpenseContext.Provider>
  )
}

