export const getCurrentDate = () => {
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, '0')
  return dd
}
export const getCurrentMonth = () => {
  let today = new Date()
  let mm = String(today.getMonth() + 1).padStart(2, '0')

  return mm
}
export const getCurrentYear = () => {
  let today = new Date()
  let yyyy = today.getFullYear()
  return String(yyyy)
}
