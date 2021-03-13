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
import ReactDOM from 'react-dom'


import './Home.scss'


// let useClickOutside = (handler) => {
//   let domNode = useRef()

//   useEffect(() => {
//     let maybeHandler = (e) => {
//       if (!domNode.current.contains(e.target)) {
//         handler()
//     }
//   }
//     document.addEventListener("mousedown", maybeHandler)
//     return() => {
//       document.removeEventListener("mousedown", maybeHandler)
//     }
//   }, [])

//   return domNode
// }

function Home() {
  const userExpense = useContext(ExpenseContext)

  const [selectedChart, setSelectedChart] = useState('Doughnut')
// 
  const [showModal, setShowModal] = useState(false)

  const [show, setShow] = useState(false)
  const [add, setAdd] = useState(false)
  const [goal, setGoal] = useState(false)

  const date = new Date()

  useEffect(() => {
    userExpense.readRangeExpenses({
      startDate: startOfMonth(new Date(date.getFullYear(), date.getMonth(), 1)),
      endDate: lastDayOfMonth(new Date(date.getFullYear(), date.getMonth() + 1, 0)),
      key: 'default'
    })
  }, [])

// 
const handleClick = event => {
  event.preventDefault()

  setShowModal((true), () => {
    document.addEventListener("click", closeMenu())
  })
}

// 
const closeMenu = () => {
  setShowModal((false), () => {
    document.removeEventListener('click', closeMenu())
  })
}


  
  
  const handleRemove = (id) => {
    userExpense.deleteExpense(id)
  }



  // let domNode = useClickOutside(() => {
  //   setShow(false)
  // })


return (
  
  <div id='home-view'>
    <div>

      <header id='home-header'>
        <section className='home-bar'>
          <div className='modal' id='modal'>
          <button id='date-picker-btn' onClick={() => setShow(!show)}>        
            Select Dates to view
          </button>
            {show ? <div className='open-modal'>
                      <RangePicker />
                    </div>
            : null
            }
          </div>
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
                    <Goals />
                  </div> : null
                }
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
