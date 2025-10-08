import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function isAuthed() {
  return localStorage.getItem('bob_auth') === 'true'
}

function PrivateRoute({ children }) {
  if (!isAuthed()) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthed() ? '/app' : '/login'} replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/app/*"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
