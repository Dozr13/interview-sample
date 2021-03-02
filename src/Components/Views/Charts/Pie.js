import React, {useContext, useEffect, useState} from 'react'
import {Doughnut, defaults} from 'react-chartjs-2'

import {AuthContext} from '../../../Context/AuthContext'

import {ExpenseContext} from '../../../Context/ExpenseContext'

defaults.global.legend.position = 'left'

const BarChart = () => {
  const userAuth = useContext(AuthContext)

  return (
    <div>
      <Doughnut
        data={{
          labels: ['Mortgage', 'Health Insurance', 'Auto Insurance', 'Electricity', 'Water', 'Garbage', 'Automotive Payment', 'Cell Phone', 'Internet', 'Miscellaneous'],
          datasets: [
            {
              label: 'Spending',
              data: [25, 50, 75, 100, 150, 200, 85, 70, 22, 233],
              backgroundColor: ['black', 'orange', 'orange', 'orange', 'purple', 'blue', 'yellow', 'green', 'navy', 'pink'],
              borderColor: '#000',
              borderWidth: 1
            },
            {
              label: `'s expected spending`,
              data: [13, 32, 1, 10, 55, 100],
              backgroundColor: '#000',
              borderColor: 'red',
              borderWidth: 2
            }
          ]
        }}
        height={750}
        options={{
          maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
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

export default BarChart