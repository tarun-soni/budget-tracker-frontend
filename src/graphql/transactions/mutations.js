import gql from 'graphql-tag'

export const CREATE_TRANSACTION = gql`
  mutation createTransaction(
    $type: TypeOfTransaction!
    $amount: String!
    $category: String
    $dd: String!
    $mm: String!
    $yyyy: String!
  ) {
    createTransaction(
      type: $type
      amount: $amount
      category: $category
      dd: $dd
      mm: $mm
      yyyy: $yyyy
    ) {
      message
    }
  }
`
export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      message
    }
  }
`

export const UPDATE_TRANSACTION = gql`
  mutation updateTransaction(
    $id: ID
    $category: String
    $amount: String
    $type: String
  ) {
    updateTransaction(
      id: $id
      category: $category
      amount: $amount
      type: $type
    ) {
      message
    }
  }
`
