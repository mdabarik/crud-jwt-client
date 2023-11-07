import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'
import GlobalProvider from './providers/GlobalProvider'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalProvider>
    <React.StrictMode>

      <RouterProvider router={router} />

      <Toaster />
    </React.StrictMode>
  </GlobalProvider>
)
