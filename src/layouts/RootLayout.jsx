import React from 'react'
import { Outlet } from 'react-router-dom'
import PrimaryHeader from '../components/PrimaryHeader/PrimaryHeader'
import PrimaryFooter from '../components/PrimaryFooter/PrimaryFooter'

export default function RootLayout() {
  return (
    <>
        <PrimaryHeader />
        <Outlet />
        <PrimaryFooter />
    </>
  )
}
