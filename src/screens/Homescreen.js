import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'

import { Container } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { GET_MONTH_DATA } from '../graphql/transactions/queries'

const Homescreen = () => {
  const where = {
    mm: '04',
    type: 'EXPENSE'
  }

  const { loading, data, error } = useQuery(GET_MONTH_DATA, {
    variables: {
      where: where
    }
  })
  useEffect(() => {
    console.log(`data.getTransactions`, data?.getUserTransactions)
  }, [data])

  const chartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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
        borderWidth: 1
      }
    ]
  }

  if (error) console.log(`error.message`, error.message)
  return (
    <>
      <Header />
      {loading && <Loader />}
      <Container className="my-5">
        <Doughnut height={120} data={chartData} />
      </Container>
    </>
  )
}

export default Homescreen
