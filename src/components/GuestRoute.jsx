import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthProvider'

function GuestRoute({ children }) {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/" />
  }

  return children
}

export default GuestRoute
