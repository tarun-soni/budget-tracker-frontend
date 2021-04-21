import gql from 'graphql-tag'

export const CREATE_TRANSACTION = gql`
  mutation createTransaction(
    $type: TypeOfTransaction!
    $amount: String!
    $category: String!
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
