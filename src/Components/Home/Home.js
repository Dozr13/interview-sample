import React, {useState} from 'react'
// import {ExpenseContext} from '../../Context/ExpenseContext'
// import {Link} from 'react-router-dom'
import DoughnutChart from '../Views/Charts/DoughnutChart'
import BarChart from '../Views/Charts/BarChart'

import Expenses from '../Views/Expenses/Expenses'
import RangePicker from './RangePicker/RangePicker'

import LibraryAddIcon from '@material-ui/icons/LibraryAdd';


import './Home.scss'
import AddExpense from './AddExpense/AddExpense'
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';




function Home() {
  const [selectedChart, setSelectedChart] = useState('Doughnut')
  const [show, setShow] = useState(false)
  const [add, setAdd] = useState(false)
  const [goal, setGoal] = useState(false)

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
            <Expenses />
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
