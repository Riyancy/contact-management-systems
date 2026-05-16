import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastContainer } from './components/Toast.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Contacts from './pages/Contacts.jsx'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/contacts" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
