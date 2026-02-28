import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import DonorDashboard from './pages/donor/Dashboard'
import NGODashboard from './pages/ngo/Dashboard'
import VolunteerDashboard from './pages/volunteer/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/donor/dashboard" element={<DonorDashboard />} />
        <Route path="/ngo/dashboard" element={<NGODashboard />} />
        <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
