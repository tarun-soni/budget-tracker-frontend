import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import { GET_CATEGORIES, GET_MONTH_DATA } from '../graphql/transactions/queries'
import { getCurrentMonth, getCurrentYear } from '../utils/getDates'
import getPercentage from '../utils/getPercentage'

const CategoryWisePage = () => {
  const [allCategories, setAllCategories] = useState([])
  const [category, setCategory] = useState('')
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())
  const [currentYear, setCurrentYear] = useState(getCurrentYear())

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
    const a = data?.getUserTransactions?.reduce((acc, t) => {
      _count++
      return acc + Number(t.amount)
    }, 0)

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
            <Row>
              <Col md={6} className="my-4">
                <h3>
                  Total Amount Spent on{' '}
                  <strong style={{ color: 'blue' }}>{category}</strong>, in the
                  month of {currentMonth}/{currentYear}
                </h3>
                <h2 className="amount m-4">
                  {data?.getUserTransactions?.reduce(
                    (acc, t) => acc + Number(t.amount),
                    0
                  )}
                </h2>
              </Col>
              <Col md={6} className="my-4">
                <h3>
                  Number of times Spent on{' '}
                  <strong style={{ color: 'blue' }}>{category}</strong>, in the
                  month of {currentMonth}/{currentYear}
                </h3>
                <h2 className="amount m-4"> {numberOfInstances}</h2>
              </Col>
            </Row>
          ) : (
            <> </>
          )}
        </Container>
      )}
    </>
  )
}
export default CategoryWisePage
