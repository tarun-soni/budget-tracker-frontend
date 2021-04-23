import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import {
  GET_CATEGORIES,
  GET_MONTH_DATA
} from '../../graphql/transactions/queries'
import Loader from '../Loader'
import CustomToast from '../CustomToast'
import {
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION
} from '../../graphql/transactions/mutations'
import { getCurrentMonth, getCurrentYear } from '../../utils/getDates'
import AddTransactionModal from '../AddTransactionModal'

const AllPreviousTransactions = () => {
  const [allTransactions, setAllTransactions] = useState([])
  const { loading, data, error } = useQuery(GET_MONTH_DATA, {
    variables: { where: {} }
  })
  const [showDeleteToast, setShowDeleteToast] = useState(false)
  const [deleteMutation] = useMutation(DELETE_TRANSACTION)
  const [updateTransactionMutation] = useMutation(UPDATE_TRANSACTION)
  const [showEditModal, setShowEditModal] = useState(false)
  let [transactionData, setTransactionData] = useState({})
  const [showUpdateToast, setShowUpdateToast] = useState(false)
  useEffect(() => {
    setAllTransactions(data?.getUserTransactions)
  }, [data])

  const deleteHandler = async (id) => {
    deleteMutation({
      variables: {
        id
      },
      refetchQueries: [
        {
          query: GET_MONTH_DATA,
          variables: { where: {} }
        },
        {
          query: GET_MONTH_DATA,
          variables: {
            where: {
              mm: getCurrentMonth(),
              yyyy: getCurrentYear()
            }
          }
        }
      ]
    })
      .then((res) => {
        if (res?.data?.deleteTransaction.message === 'DELETED') {
          setShowDeleteToast(true)
        }
      })
      .catch((error) => {
        console.log(`error`, error)
      })
  }

  const updateHandler = (id, type, amount, category) => {
    setShowEditModal(true)
    setTransactionData({
      id,
      type,
      amount,
      category
    })
  }
  const submitTransaction = () => {
    // mutation here
    const { id, type, amount, category } = transactionData

    updateTransactionMutation({
      variables: {
        id,
        type,
        category,
        amount
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
        if (res?.data?.updateTransaction.message === 'updated') {
          setShowUpdateToast(true)
        }
      })
      .catch((error) => {
        console.log(`error`, error)
      })
    setShowEditModal(false)
  }

  if (error) {
    console.log(`error`, error)
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container className="mb-5">
          {showDeleteToast && (
            <CustomToast
              msg="DELTED SUCESSFULLY"
              variant="info"
              onClose={() => setShowDeleteToast(false)}
            />
          )}
          {showUpdateToast && (
            <CustomToast
              msg="UPDATED SUCESSFULLY"
              variant="success"
              onClose={() => setShowUpdateToast(false)}
            />
          )}

          {showEditModal && (
            <AddTransactionModal
              show={showEditModal}
              submitTransaction={submitTransaction}
              onHide={() => setShowEditModal(false)}
              transactionData={transactionData}
              setTransactionData={setTransactionData}
              toEdit
            />
          )}

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
                  <td className="amount-sm">
                    {transaction?.type === 'EXPENSE' ? '-' : '+'}
                    {transaction?.amount}
                  </td>
                  <td>
                    {transaction?.dd} - {transaction?.mm} - {transaction?.yyyy}
                  </td>
                  <td className="d-flex align-items-center justify-content-around">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() =>
                        updateHandler(
                          transaction._id,
                          transaction?.type,
                          transaction?.amount,
                          transaction?.category
                        )
                      }
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteHandler(transaction._id)}
                    >
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
