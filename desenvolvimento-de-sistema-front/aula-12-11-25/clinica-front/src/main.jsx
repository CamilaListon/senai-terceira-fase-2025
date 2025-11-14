import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import reacr router

import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

// import toastify
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


import './index.css'
import Login from './pages/Login/Login'
import { Authprovider } from './contexts/AuthContext'
import Dashboard from './pages/Dashboard/Dashboard'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import DashboardLayout from './layouts/DashboardLayout'
import MedicalRecordList from './components/MedicalRecordList/MedicalRecordList'
import PatientRegistrationForm from './components/PatientRegistrationForm/PatientRegistrationForm'
import ConsultationForm from './components/ConsultationForm/ConsultationForm'
import ConsultationExam from './components/ConsultationExam/ConsultationExam'
// import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'prontuarios', element: <MedicalRecordList /> },
      { path: 'pacientes', element: <PatientRegistrationForm /> },
      { path: 'consultas', element: <ConsultationForm /> },
      { path: 'exames', element: <ConsultationExam /> },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <ToastContainer />
      <RouterProvider router={router} />
    </Authprovider>

    {/* <App /> */}
  </StrictMode>,
)
