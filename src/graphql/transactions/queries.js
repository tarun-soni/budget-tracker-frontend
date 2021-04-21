import gql from 'graphql-tag'

export const GET_MONTH_DATA = gql`
  query getUserTransactions($where: WHEREFILTER) {
    getUserTransactions(where: $where) {
      _id
      type
      category
      amount
      dd
      mm
      yyyy
    }
  }
`
export const GET_CATEGORIES = gql`
  query getUserTransactions($where: WHEREFILTER) {
    getUserTransactions(where: $where) {
      category
    }
  }
`
