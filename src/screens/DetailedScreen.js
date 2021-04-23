import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Container, Form, Row } from 'react-bootstrap'
import ExpenseBreakDown from '../components/Dashboard/ExpenseBreakDown'
import Loader from '../components/Loader'
import { GET_MONTH_DATA } from '../graphql/transactions/queries'
import { getCurrentMonth, getCurrentYear } from '../utils/getDates'

const DetailedScreen = () => {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())
  const [currentYear, setCurrentYear] = useState(getCurrentYear())
  const [totalExpense, setTotalExpense] = useState(0)

  const where = {
    mm: String(currentMonth),
    yyyy: String(currentYear)
  }

  const { loading, data, error } = useQuery(GET_MONTH_DATA, {
    variables: {
      where: where
    }
  })

  useEffect(() => {
    console.log(`data detailed`, data?.getUserTransactions)

    let _totalExpense = 0
    data?.getUserTransactions?.map((t) => {
      if (t.type === 'EXPENSE') _totalExpense += Number(t.amount)
      return t
    })

    setTotalExpense(_totalExpense)
  }, [data])
  if (error) console.log(`error`, error)
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container className="my-5">
          <Row className="d-flex justify-content-between">
            <h1 className="lspace-large">Detailed View</h1>

            <div className="d-flex">
              <div className="d-flex flex-direction-row">
                <h3 className="mx-5">
                  Month
                  <Form>
                    <Form.Control
                      as="select"
                      value={currentMonth}
                      onChange={(e) => setCurrentMonth(e.target.value)}
                    >
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
                  </Form>
                </h3>
              </div>

              {/* year div */}
              <div className="d-flex flex-direction-row">
                <h3 className="mx-5">
                  Year
                  <Form>
                    <Form.Control
                      as="select"
                      value={currentYear}
                      onChange={(e) => setCurrentYear(e.target.value)}
                    >
                      <option className="font-l">2021</option>
                      <option className="font-l">2022</option>
                      <option className="font-l">2023</option>
                      <option className="font-l">2024</option>
                    </Form.Control>
                  </Form>
                </h3>
              </div>
            </div>
          </Row>

          <ExpenseBreakDown totalExpense={totalExpense} where={where} />
        </Container>
      )}
    </>
  )
}

export default DetailedScreen
