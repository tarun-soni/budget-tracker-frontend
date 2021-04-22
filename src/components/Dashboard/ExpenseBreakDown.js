import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { Container, ProgressBar } from 'react-bootstrap'
import Loader from '../Loader'
import {
  GET_MONTH_DATA,
  GET_CATEGORIES
} from '../../graphql/transactions/queries'
import getPercentage from '../../utils/getPercentage'
import CustomDoughnut from './CustomDoughnut'

const ExpenseBreakDown = ({ totalExpense, where }) => {
  const [userData, setUserData] = useState({})
  const [categories, setCategories] = useState([])

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
    console.log(`totalExpense`, totalExpense)

    let _categories = []
    categoryData?.getUserTransactions.map((t) => {
      _categories.push(t?.category)
      return _categories
    })

    setCategories(_categories)
  }, [data, categoryData, totalExpense])

  //for each category add them as keys in userData
  useEffect(() => {
    const filteredCategories = categories.filter((cat) => cat !== '')

    const _data = filteredCategories.reduce(
      (acc, curr) => ((acc[curr] = 0), acc),
      {}
    )

    data?.getUserTransactions?.map((t) => {
      if (t.category in _data) {
        _data[t.category] += Number(t.amount)
      }
      return _data
      // console.log(`transaction`, transaction)
    })

    setUserData(_data)
  }, [data, categories])

  return (
    <>
      {catLoading || loading ? (
        <Loader />
      ) : (
        <Container>
          <h4>Expense Breakdown</h4>
          <div className="mx-2  my-4">
            {totalExpense !== 0 ? (
              <CustomDoughnut userData={userData} />
            ) : (
              <h1>'NO DATA'</h1>
            )}
          </div>

          <div>
            {console.log(`categories`, categories)}
            {[...new Set(categories)]?.map((c) => (
              <div style={{ margin: '1rem' }} key={c}>
                <div className="d-flex justify-content-between align-items-center">
                  <h5>{c}</h5>
                  <div className="d-flex justify-content-between">
                    <h4>
                      {getPercentage(userData[`${c}`], totalExpense) ===
                      Infinity
                        ? 0
                        : getPercentage(userData[`${c}`], totalExpense)}
                      %
                    </h4>
                  </div>
                </div>
                <ProgressBar now={userData[`${c}`]} max={totalExpense} />
              </div>
            ))}
          </div>
        </Container>
      )}
    </>
  )
}

export default ExpenseBreakDown
