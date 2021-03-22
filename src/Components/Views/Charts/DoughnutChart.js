import React, {useContext, useEffect, useState} from 'react'
import {Doughnut, defaults} from 'react-chartjs-2'

import {AuthContext} from '../../../Context/AuthContext'
import {ExpenseContext} from '../../../Context/ExpenseContext'


defaults.global.legend.position = 'bottom'

const DoughnutChart = () => {
  const userAuth = useContext(AuthContext)
  const userExpense = useContext(ExpenseContext)

  const [home, setHome] = useState(1250)
  const [insurance, setInsurance] = useState(1000)
  const [auto, setAuto] = useState(400)
  const [food, setFood] = useState(300)
  const [miscellaneous, setMiscellaneous] = useState(500)
  const [expenses, setExpenses] = useState([])

  // useEffect(() => {
  //   // console.log('hi')
  //   userExpense.readDay()
  // }, [])

  useEffect(() => {
    setExpenses(setCatagories())
  }, [userExpense])

  const setCatagories = () => {
    // console.log(userExpense.expenses)
    let home = 0
    let insurance = 0
    let auto = 0
    let food = 0
    let misc = 0
    const homeTypes = ['Mortgage', 'Electricity', 'Water', 'Garbage']
    const insuranceTypes = ['Health Insurance', 'Auto Insurance', 'Medical Expenses']
    const autoTypes = ['Gas', 'Auto Insurance', 'Automotive Payment']
    const foodTypes = ['Groceries', 'Eating out']
    const miscTypes = ['Cell Phone', 'Internet', 'Miscellaneous']
    for(let i = 0; i < userExpense.expenses.length; i++){
      if(homeTypes.includes(userExpense.expenses[i].bill_type)){
        home += +userExpense.expenses[i].amount
      }
      if(insuranceTypes.includes(userExpense.expenses[i].bill_type)){
        insurance += +userExpense.expenses[i].amount
      }
      if(autoTypes.includes(userExpense.expenses[i].bill_type)){
        auto += +userExpense.expenses[i].amount
      }
      if(foodTypes.includes(userExpense.expenses[i].bill_type)){
        food += +userExpense.expenses[i].amount
      }
      if(miscTypes.includes(userExpense.expenses[i].bill_type)){
        misc += +userExpense.expenses[i].amount
      }
    }
    return [home, insurance, auto, food, misc]
  }

  // const [budgets, setBudgets] = useState([
  //   {
  //     type: 'Home',
  //     amount: 1250
  //   },
  //   {
  //     type: 'Auto',
  //     amount: 400
  //   },
  //   {
  //     type: 'Food',
  //     amount: 300
  //   },
  //   {
  //     type: 'Entertainment',
  //     amount: 1000000
  //   },
  //   {
  //     type: 'Miscellaneous',
  //     amount: 5
  //   } 
  // ])

  // const update = (type, amount) => {
  //   <input type='text' onChange={e => (setBudgets(budgets.splice(budgets, findIndex(b => b.type === 'Home'), 1, {type: 'Home', amount: +e.target.value.replace(/[^0-9]/g, '')})))}>
  // }

  // let now = new Date()
  // let month = now.setMonth(now.getMonth())


  return (
    <div>

      <Doughnut
        data={{
          labels: ['Home', 'Insurance', 'Auto', 'Food', 'Miscellaneous'],
          datasets: [
            {
              // label: 'Spending',
              data: expenses,
              backgroundColor: ['#AF1B3F', '#E28413', '#CEE7E6', '#7CDF64', '#5F5AA2'],
              borderColor: '#000',
              borderWidth: 1
            },
            // {
            //   label: `'s expected spending`,
            //   data: [home, insurance, auto, food, miscellaneous],
            //   backgroundColor: ['#AF1B3F', '#E28413', '#CEE7E6', '#7CDF64', '#5F5AA2'],
            //   borderColor: 'red',
            //   borderWidth: 2
            // }
          ]
        }}
        height={650}
        width={650}
        options={{
          maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    display: false
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  ticks: {
                    display: false
                  },
                  gridLines: {
                    display: false
                  }
                }
              ]
            },
            legend: {
              labels: {
                fontSize: 18
              }
            }
        }}
      />
    </div>
  )
}

export default DoughnutChart