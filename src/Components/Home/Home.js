import React, {useState, useEffect, useContext} from 'react'
import {ExpenseContext} from '../../Context/ExpenseContext'
// import {Link} from 'react-router-dom'
import DoughnutChart from '../Views/Charts/DoughnutChart'
import BarChart from '../Views/Charts/BarChart'

import RangePicker from './RangePicker/RangePicker'

import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

import {lastDayOfMonth, startOfMonth} from 'date-fns';

import './Home.scss'
import AddExpense from './AddExpense/AddExpense'
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

import TableView from './Table/TableView'




function Home() {
  const userExpense = useContext(ExpenseContext)

  const [selectedChart, setSelectedChart] = useState('Doughnut')
  const [show, setShow] = useState(false)
  const [add, setAdd] = useState(false)
  const [goal, setGoal] = useState(false)

  const date = new Date()

  useEffect(() => {
    userExpense.readRangeExpenses({
      startDate: (new Date(date.getFullYear(), date.getMonth(), 1)),
      endDate: (new Date(date.getFullYear(), date.getMonth(), 0)),
      key: 'default'
    })
  }, [])

  const [editIdx, setEditIdx] = useState(-1)

  const handleRemove = (id) => {
    userExpense.deleteExpense(id)
  }


  const startEditing = (i) => {
    setEditIdx({editIdx: i})
  }

  const stopEditing = (e) => {
    console.log(e)
    userExpense.editExpense(e.due_date, e.expense_title, e.bill_type, e.amount, e.id)
    setEditIdx({editIdx: -1})
  }

  const handleChange = (e, name, i) => {
    const {value} = e.target
    setEditIdx(editIdx => ({
      data: editIdx.data.map((row, j) => j === i ? ({...row, [name]: value}) : row)
    }))
  }


return (
  
  <main id='home-view'>
      <header className='home-bar'>
        <div className='modal' id='modal'>
          <button onClick={() => setShow(!show)}>        
            Select Dates to view
          </button>
            {show ? 
            <div className='open-modal'>
              <RangePicker />
            </div> : null
            }
        </div>
      </header>

      <main>
        <button className='doughnut-btn' onClick={() => setSelectedChart('Doughnut')}>
          View Doughnut
        </button>
        <button className='bar-chart-btn' onClick={() => setSelectedChart('Bar')}>
          View Bar Graph
        </button>

        <div id='vertical-panes'>
          <div className='left'>
            {selectedChart === 'Doughnut' ? <DoughnutChart /> : <BarChart />}
          </div>

          <div className='right'>
            <TableView 
              // startEditing={startEdit}
              // editIdx={editIdx}
              // stopEditing={stopEditing}
              // handleChange={handleChange} 
              handleRemove={handleRemove}
            />
          </div>
            
            <div className='popup-list'>

              <div className='expenses-link modal'>
                <a onClick={() => setAdd(!add)}>
                  <LibraryAddIcon style={{fontSize: 50}} />
                  <span>Add Expense</span>
                </a>
                {add ? 
                  <div className='open-add-modal'>
                    <AddExpense />
                  </div> : null
                }
              </div>

              <div className='goals-link'>
                <a onClick={() => setGoal(!goal)}>
                  <SentimentVerySatisfiedIcon style={{fontSize: 50}} />
                  <span>Add Goals</span>
                </a>
                {goal ?
                  <div className='open-goal-modal'>

                  </div> : null
                }
              </div>

            </div>






        </div>


      </main>











      
      <footer>

      </footer>












    </main>
  )
}

export default Home
