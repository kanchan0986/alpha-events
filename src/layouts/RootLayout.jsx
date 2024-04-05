import React from 'react'
import { Outlet } from 'react-router-dom'
import PrimaryHeader from '../components/headers/PrimaryHeader/PrimaryHeader'
import PrimaryFooter from '../components/footers/PrimaryFooter/PrimaryFooter'
import SuccessModal from '../components/modals/SuccessModal/SuccessModal'
import useCustomContext from '../hooks/useCustomContext'

export default function RootLayout() {

  const { modalVisibility } = useCustomContext()

  return (
    <>
        {modalVisibility.isModalVisible && <SuccessModal />}
        <PrimaryHeader />
        <Outlet />
        <PrimaryFooter />
    </>
  )
}
