import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2'
import Loader from '../Loader'
import {
  GET_MONTH_DATA,
  GET_CATEGORIES
} from '../../graphql/transactions/queries'
import getPercentage from '../../utils/getPercentage'

const ExpenseBreakDown = ({ totalExpense }) => {
  const [userData, setUserData] = useState({})
  const [amountArrayToPass, setAmountArrayToPass] = useState([])
  const [categories, setCategories] = useState([])
  const where = {
    mm: '04',
    type: 'EXPENSE'
  }
  const { loading, data, error } = useQuery(GET_MONTH_DATA, {
    variables: { where: where }
  })
  const { loading: catLoading, data: categoryData, error: catError } = useQuery(
    GET_CATEGORIES,
    {
      variables: { where: where }
    }
  )
  useEffect(() => {
    let _categories = []
    categoryData?.getUserTransactions.map((t) => {
      _categories.push(t?.category)
    })
    setCategories(_categories)
  }, [data, categoryData])

  //for each category add them as keys in userData
  useEffect(() => {
    const _data = categories.reduce((acc, curr) => ((acc[curr] = 0), acc), {})

    data?.getUserTransactions?.map((t) => {
      console.log(`t`)
      if (t.category in _data) {
        _data[t.category] += Number(t.amount)
      }
      return _data
      // console.log(`transaction`, transaction)
    })

    console.log(`_userData`, _data)

    setUserData(_data)
  }, [data, categories])

  const chartData = {
    labels: Object.keys(userData),
    datasets: [
      {
        label: 'Expense distirbution',
        data: Object.values(userData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2
      }
    ]
  }
  return (
    <>
      <Container>
        <div className="m-2">
          <Doughnut
            height={120}
            data={chartData}
            options={{
              // rotation: Math.PI,
              cutoutPercentage: 70,
              legend: {
                display: true
              }
            }}
          />
        </div>

        <div>
          {categories?.map((c) => (
            <div style={{ margin: '1rem' }}>
              <div className="d-flex justify-content-between align-items-center">
                <h5>{c}</h5>
                <div className="d-flex justify-content-between">
                  <h6>{getPercentage(userData[`${c}`], totalExpense)} %</h6>
                </div>
              </div>
              <ProgressBar now={userData[`${c}`]} max={totalExpense} />
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}

export default ExpenseBreakDown
