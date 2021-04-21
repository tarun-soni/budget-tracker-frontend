import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2'
import ExpenseBreakDown from '../components/Dashboard/ExpenseBreakDown'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { GET_MONTH_DATA } from '../graphql/transactions/queries'

const Homescreen = () => {
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)

  const where = {
    mm: '04'
  }

  const { loading, data, error } = useQuery(GET_MONTH_DATA, {
    variables: {
      where: where
    }
  })
  useEffect(() => {
    console.log(`data.getTransactions`, data?.getUserTransactions)

    let _totalExpense = 0
    let _totalIncome = 0
    data?.getUserTransactions?.map((t) => {
      if (t.type === 'EXPENSE') _totalExpense += Number(t.amount)
      if (t.type === 'DEPOSIT') _totalIncome += Number(t.amount)
    })

    setTotalExpense(_totalExpense)
    setTotalIncome(_totalIncome)
  }, [data])

  if (error) console.log(`error.message`, error.message)
  return (
    <>
      <Header />
      {loading && <Loader />}
      <Container className="my-5">
        <h1 className="lspace-large">DashBoard</h1>
        <Row className="d-flex  hero-stats" style={{ fontSize: '2rem' }}>
          <Col>
            TOTAL INCOME <p className="amount">₹ {totalIncome}</p>
          </Col>
          <Col>
            TOTAL EXPENSE <p className="amount">₹ {totalExpense}</p>
          </Col>
          <Col>
            REMAINING BALANCE
            <p
              className={
                totalIncome - totalExpense <= 0 ? 'amount red' : 'amount'
              }
            >
              ₹ {totalIncome - totalExpense}
            </p>
          </Col>
        </Row>
      </Container>

      <ExpenseBreakDown totalExpense={totalExpense} />
    </>
  )
}

export default Homescreen
