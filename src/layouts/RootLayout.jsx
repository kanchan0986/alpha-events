import React from 'react'
import { Outlet } from 'react-router-dom'
import PrimaryHeader from '../components/headers/PrimaryHeader/PrimaryHeader'
import PrimaryFooter from '../components/footers/PrimaryFooter/PrimaryFooter'

export default function RootLayout() {
  return (
    <>
        <PrimaryHeader />
        <Outlet />
        <PrimaryFooter />
    </>
  )
}
