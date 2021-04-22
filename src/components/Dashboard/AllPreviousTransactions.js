import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { GET_MONTH_DATA } from '../../graphql/transactions/queries'
import Loader from '../Loader'

const AllPreviousTransactions = () => {
  const [allTransactions, setAllTransactions] = useState([])
  const { loading, data, error } = useQuery(GET_MONTH_DATA, {
    variables: { where: {} }
  })

  useEffect(() => {
    console.log(`All Transactions`, data?.getUserTransactions)
    setAllTransactions(data?.getUserTransactions)
  }, [data])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container className="mb-5">
          <h2>All Transactions</h2>

          <Table striped bordered hover responsive className="table-sm">
            <thead className="text-center">
              <tr>
                <th>type</th>
                <th>category</th>
                <th>amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {data?.getUserTransactions !== [] &&
                [...allTransactions]?.reverse()?.map((transaction) => ( */}
              {allTransactions?.map((transaction) => (
                <tr
                  key={transaction._id}
                  className={
                    transaction?.type === 'EXPENSE'
                      ? 'table-danger text-center'
                      : 'table-success text-center'
                  }
                >
                  <td>{transaction?.type}</td>
                  <td>{transaction?.category ? transaction.category : '-'}</td>
                  <td>{transaction?.amount}</td>
                  <td>
                    {transaction?.dd} - {transaction?.mm} - {transaction?.yyyy}
                  </td>
                  <td>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  )
}

export default AllPreviousTransactions