import React from 'react'
import { Outlet } from 'react-router-dom'
import PrimaryHeader from '../components/headers/PrimaryHeader/PrimaryHeader'
import PrimaryFooter from '../components/footers/PrimaryFooter/PrimaryFooter'
import SuccessModal from '../components/modals/SuccessModal/SuccessModal'
import useCustomContext from '../hooks/useCustomContext'
import ConsentModal from '../components/modals/ConsentModal/ConsentModal'

export default function RootLayout() {

  const { successModalVisibility, consentModalVisibility } = useCustomContext()

  return (
    <>
        {successModalVisibility.isModalVisible && <SuccessModal />}
        {consentModalVisibility.isModalVisible && <ConsentModal />}
        <PrimaryHeader />
        <Outlet />
        <PrimaryFooter />
    </>
  )
}
