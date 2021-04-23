import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Col, Container, Form, ProgressBar, Row, Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import { GET_CATEGORIES, GET_MONTH_DATA } from '../graphql/transactions/queries'
import { getCurrentMonth, getCurrentYear } from '../utils/getDates'
import getPercentage from '../utils/getPercentage'

const CategoryWisePage = () => {
  const [allCategories, setAllCategories] = useState([])
  const [category, setCategory] = useState('')
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())
  const [currentYear, setCurrentYear] = useState(getCurrentYear())
  const [totalSpent, setTotalSpent] = useState(0)
  const [numberOfInstances, setNumberOfInstances] = useState(0)
  //where is null hence get all categories
  const { loading: catLoading, data: categoryData, error: catError } = useQuery(
    GET_CATEGORIES,
    {
      variables: { where: {} }
    }
  )
  const where = {
    category: category,
    mm: String(currentMonth),
    yyyy: String(currentYear),
    type: 'EXPENSE'
  }

  const { loading, data, error, refetch } = useQuery(GET_MONTH_DATA, {
    variables: {
      where: where
    }
  })

  useEffect(() => {
    setAllCategories(
      categoryData?.getUserTransactions
        .filter((c) => c.category !== '')
        .map((c) => {
          return c.category
        })
    )
    console.log(`data`, data?.getUserTransactions)
    let _count = 0
    let _totalSpent = 0

    data?.getUserTransactions?.reduce((acc, t) => {
      _count++
      return acc + Number(t.amount)
    }, 0)

    _totalSpent = data?.getUserTransactions?.reduce(
      (acc, t) => acc + Number(t.amount),
      0
    )
    setTotalSpent(_totalSpent)
    setNumberOfInstances(_count)
  }, [categoryData, data])

  useEffect(() => {
    console.log(`where`, where)
  }, [where])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container className="my-5">
          <Row className="d-flex justify-content-between">
            <h1 className="lspace-large">View By Each Category</h1>
          </Row>

          <Row className="d-flex  justify-content-between mt-4 mb-2">
            <h2 className="lspace-large">Choose Category</h2>
          </Row>
          <Row>
            {/* <Col md={8}> */}
            <Form className="w-100 d-flex ">
              <Col md={5}>
                <Form.Control
                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  // placeholder="select a category"
                >
                  {' '}
                  <option className="font-l" disabled value="">
                    Select a Category
                  </option>
                  {allCategories?.map((c) => (
                    <option className="font-m">{c}</option>
                  ))}
                </Form.Control>
              </Col>
              <Col md={4}>
                <Form.Control
                  as="select"
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(e.target.value)}
                >
                  <option className="font-l" disabled>
                    Select Month
                  </option>

                  <option className="font-l">01</option>
                  <option className="font-l">02</option>
                  <option className="font-l">03</option>
                  <option className="font-l">04</option>
                  <option className="font-l">05</option>
                  <option className="font-l">06</option>
                  <option className="font-l">07</option>
                  <option className="font-l">08</option>
                  <option className="font-l">09</option>
                  <option className="font-l">10</option>
                  <option className="font-l">11</option>
                  <option className="font-l">12</option>
                </Form.Control>
              </Col>
              <Form.Control
                as="select"
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
              >
                <option className="font-l" disabled>
                  Select Year
                </option>
                <option className="font-l">2021</option>
                <option className="font-l">2022</option>
                <option className="font-l">2023</option>
                <option className="font-l">2024</option>
              </Form.Control>
            </Form>
            {/* </Col> */}
          </Row>

          {category !== '' ? (
            <>
              <Row className="d-flex hero-stats" style={{ fontSize: '2rem' }}>
                <Col
                  md={6}
                  className="my-4 d-flex flex-column align-items-center justify-content-center"
                >
                  <h6>Total Amount Spent on </h6>
                  <h3>
                    <strong style={{ color: 'blue' }}>{category}</strong>
                  </h3>
                  <h6>in the month of</h6>
                  <h3>
                    <strong style={{ color: 'blue' }}>
                      {currentMonth}/{currentYear}
                    </strong>
                  </h3>
                  <h2 className="amount m-4">{totalSpent}</h2>
                </Col>

                <Col
                  md={6}
                  className="my-4 d-flex flex-column align-items-center justify-content-center"
                >
                  <h6> Number of times Spent on</h6>
                  <h3>
                    <strong style={{ color: 'blue' }}>{category}</strong>
                  </h3>
                  <h6>in the month of</h6>
                  <h3>
                    <strong style={{ color: 'blue' }}>
                      {currentMonth}/{currentYear}
                    </strong>
                  </h3>
                  <h2 className="amount m-4">{numberOfInstances}</h2>
                </Col>
              </Row>
              <Row>
                <h3>Breakdown of {totalSpent}</h3>
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className="table-sm align-items-center"
                >
                  <thead className="text-center">
                    <tr className="text-center">
                      <th>amount</th>
                      <th>Date</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.getUserTransactions?.map((transaction) => (
                      <tr
                        key={transaction._id}
                        className={
                          transaction?.type === 'EXPENSE'
                            ? 'table-danger text-center'
                            : 'table-success text-center'
                        }
                      >
                        <td className="amount-sm"> - {transaction?.amount}</td>
                        <td>
                          {transaction?.dd} - {transaction?.mm} -{' '}
                          {transaction?.yyyy}
                        </td>
                        <td>
                          <h5>
                            {getPercentage(transaction?.amount, totalSpent) ===
                            Infinity
                              ? 0
                              : getPercentage(transaction?.amount, totalSpent)}
                            %
                          </h5>
                          <ProgressBar
                            now={transaction?.amount}
                            max={totalSpent}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
            </>
          ) : (
            <> </>
          )}
        </Container>
      )}
    </>
  )
}
export default CategoryWisePage
