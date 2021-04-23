import Loader from './Loader'

const LoadingWrapper = ({ loading, error, data, children }) => {
  if (error) {
    return <p>ERROR: {error.message}</p>
  }
  if (loading) {
    return <Loader />
  }
  if (!data) {
    return <p>Nothing to show...</p>
  }
  if (data) {
    return children
  }
}

export default LoadingWrapper
