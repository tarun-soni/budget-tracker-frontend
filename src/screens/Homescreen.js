import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'

import { Button, Col, Container, Row } from 'react-bootstrap'
import ExpenseBreakDown from '../components/Dashboard/ExpenseBreakDown'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { GET_CATEGORIES, GET_MONTH_DATA } from '../graphql/transactions/queries'
import {
  getCurrentDate,
  getCurrentMonth,
  getCurrentYear
} from '../utils/getDates'
import {
  Container as FloatingContainer,
  Button as FloatingButton
} from 'react-floating-action-button'
import AddTransactionModal from '../components/AddTransactionModal'
import { CREATE_TRANSACTION } from '../graphql/transactions/mutations'
import AllPreviousTransactions from '../components/Dashboard/AllPreviousTransactions'
import CustomToast from '../components/CustomToast'

const Homescreen = () => {
  const [addLoading, setAddLoading] = useState(false)
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showAddToast, setShowAddToast] = useState(false)
  const [transactionData, setTransactionData] = useState({
    type: 'EXPENSE',
    amount: 1500,
    category: 'TRAVEL'
  })

  const where = {
    mm: getCurrentMonth(),
    yyyy: getCurrentYear()
  }

  const { loading, data, error, refetch } = useQuery(GET_MONTH_DATA, {
    variables: {
      where: where
    }
  })
  const [createTransaction] = useMutation(CREATE_TRANSACTION)
  const submitTransaction = () => {
    const { type, amount, category } = transactionData

    createTransaction({
      variables: {
        type: String(type),
        amount: String(amount),
        category: String(type) === 'EXPENSE' ? String(category) : '',
        dd: String(getCurrentDate()),
        mm: String(getCurrentMonth()),
        yyyy: String(getCurrentYear())
      },
      refetchQueries: [
        {
          query: GET_MONTH_DATA,
          variables: { where: {} }
        },
        { query: GET_CATEGORIES }
      ],
      awaitRefetchQueries: true
    })
      .then((res) => {
        setAddLoading(false)
        console.log(`res`, res)

        if (res?.data?.createTransaction.message === 'created') {
          setShowAddToast(true)
          refetch()
        }
      })
      .catch((error) => {
        setAddLoading(false)
        setShowAddModal(false)
        console.log(`error`, error)
      })
    setShowAddModal(false)
  }

  useEffect(() => {
    let _totalExpense = 0
    let _totalIncome = 0
    data?.getUserTransactions?.map((t) => {
      if (t.type === 'EXPENSE') _totalExpense += Number(t.amount)
      if (t.type === 'DEPOSIT') _totalIncome += Number(t.amount)

      return t
    })

    setTotalExpense(_totalExpense)
    setTotalIncome(_totalIncome)
  }, [data])

  if (error) console.log(`error.message`, error.message)
  return (
    <>
      <Header />
      {showAddModal && (
        <AddTransactionModal
          show={showAddModal}
          submitTransaction={submitTransaction}
          onHide={() => setShowAddModal(false)}
          transactionData={transactionData}
          setTransactionData={setTransactionData}
        />
      )}

      {loading && <Loader />}
      <Container className="my-5">
        {showAddToast && (
          <CustomToast
            msg="ADDED SUCESSFULLY"
            variant="success"
            onClose={() => setShowAddToast(false)}
          />
        )}
        <Row className="d-flex align-items-center justify-content-between">
          <h1 className="lspace-large">DashBoard</h1>

          <div className="d-flex">
            <h3 className="mx-5">Month {getCurrentMonth()}</h3>
            <h3> Year {getCurrentYear()}</h3>
          </div>
        </Row>
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
                totalIncome - totalExpense <= 0
                  ? 'amount text-danger'
                  : 'amount text-success'
              }
            >
              ₹ {totalIncome - totalExpense}
            </p>
          </Col>
        </Row>

        <FloatingContainer>
          <FloatingButton
            tooltip="Add Transaction"
            onClick={() => {
              console.log(`clicked`)
              setShowAddModal(true)
            }}
          >
            <AddSvg />
          </FloatingButton>
        </FloatingContainer>
      </Container>

      <AllPreviousTransactions />
    </>
  )
}

export default Homescreen

const AddSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <title>add</title>
      <path d="M16 9h-5V4H9v5H4v2h5v5h2v-5h5V9z" />
    </svg>
  )
}
