import React, {useState, useEffect, useContext, useRef} from 'react'
import {ExpenseContext} from '../../Context/ExpenseContext'
import {lastDayOfMonth, startOfMonth} from 'date-fns';
import AddExpense from './AddExpense/AddExpense'
import Goals from './Goals/Goals'
import DoughnutChart from '../Views/Charts/DoughnutChart'
import BarChart from '../Views/Charts/BarChart'
import RangePicker from './RangePicker/RangePicker'
import TableView from './Table/TableView'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';



import './Home.scss'


function Home() {
  const userExpense = useContext(ExpenseContext)

  const [selectedChart, setSelectedChart] = useState('Doughnut')


  const modal = useRef(null)
  const addModal = useRef(null)
  const goalModal = useRef(null)

  const date = new Date()

  useEffect(() => {
    userExpense.readRangeExpenses({
      startDate: startOfMonth(new Date(date.getFullYear(), date.getMonth(), 1)),
      endDate: lastDayOfMonth(new Date(date.getFullYear(), date.getMonth() + 1, 0)),
      key: 'default'
    })
  }, [])
  
  
  const handleRemove = (id) => {
    userExpense.deleteExpense(id)
  }

  

return (
  
  <div id='home-view'>
    <div>

      <header id='home-header'>
        <section className='home-bar'>
          <button id='date-picker-btn' onClick={() => modal.current.open()}>
            Open Date Range
          </button>
            <RangePicker ref={modal} />
        </section>
      </header>

      <main>

        <div id='vertical-panes'>
          <div className='left'>
            {selectedChart === 'Doughnut' ? <DoughnutChart /> : <BarChart />}
            <br />

              <section id='view-selection-btns'>
                <button className='doughnut-btn' onClick={() => setSelectedChart('Doughnut')}>
                  View Doughnut
                </button>
                <button className='bar-chart-btn' onClick={() => setSelectedChart('Bar')}>
                  View Bar Graph
                </button>
              </section>      
            
          </div>

          <div className='right'>
            <TableView 
              handleRemove={handleRemove}
              />
          </div>
            
            <div className='popup-list'>

              <div className='expenses-link-modal'>
                <a onClick={() => addModal.current.open()}>
                {/* // <a onClick={() => setAdd(!add)}> */}
                  <LibraryAddIcon style={{fontSize: 50}} />
                  <span>Add Expense</span>
                </a>
                    <AddExpense ref={addModal} />
              </div>

              <div className='goals-link'>
                <a onClick={() => goalModal.current.open()}>
                  <SentimentVerySatisfiedIcon style={{fontSize: 50}} />
                  <span>Add Goals</span>
                </a>
                    <Goals ref={goalModal} />
              </div>

            </div>






        </div>


      </main>











      
      <footer>

      </footer>







      </div>
    </div>
  )
}

export default Home
