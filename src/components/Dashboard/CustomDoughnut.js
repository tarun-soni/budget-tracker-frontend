import { Doughnut } from 'react-chartjs-2'

const CustomDoughnut = ({ userData }) => {
  console.log(`userData in chart`, userData)
  const chartData = {
    labels: Object.keys(userData),
    datasets: [
      {
        label: 'Expense distirbution',
        data: Object.values(userData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2
      }
    ]
  }

  return (
    <Doughnut
      height={120}
      data={chartData}
      options={{
        cutoutPercentage: 70
      }}
    />
  )
}

CustomDoughnut.defaultProps = {
  userData: {}
}
export default CustomDoughnut
