import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router/browser-router'

export default function App() {

  return (
    <RouterProvider router={router} />
  )

}
