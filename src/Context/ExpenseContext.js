import {createContext, useState} from 'react'
import axios from 'axios'


export const ExpenseContext = createContext(null)

export const ExpenseProvider = (props) => {
  const [expenses, setExpense] = useState([])


  const createExpense = (dueDate, expenseTitle, amount, billType) => {
    axios.post('/api/new-expense', {dueDate, expenseTitle, amount, billType}).then(({data}) => {
      console.log(dueDate, 'createExpenseTest outter')
      axios.post('/api/read-day', {dueDate}).then(({data}) => {
        console.log('create context', data)
        setExpense(data)
      }).catch(err => console.log('createExpenseTest inner .catch', dueDate))
      // for(let e in data){
      //   console.log(e, typeof e)
      // }
      setExpense(data)
    }).catch(err => console.log(dueDate))
  }

  const readDay = (dueDate) => {
    axios.post('/api/read-day', {dueDate}).then((res) => {
      console.log('readDay', res)
      setExpense(res.data)
    }).catch(err => console.log(err))
  }

  return (
    <ExpenseContext.Provider value={{expenses, setExpense, createExpense, readDay}}>
      {props.children}
    </ExpenseContext.Provider>
  )
}

