import React, { useEffect } from 'react'
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom'
import PrimaryHeader from '../components/headers/PrimaryHeader/PrimaryHeader'
import PrimaryFooter from '../components/footers/PrimaryFooter/PrimaryFooter'
import { tokenEpiration } from '../util/helper'

export default function RootLayout() {

  const token = useLoaderData()

  const submit  = useSubmit()

  useEffect(() => {

    if(!token){ // if token does not exists in the first load -> quit
      return
    }

    const remainingExpirationTime = tokenEpiration()

    const logoutTimer = setTimeout(() => { // if token exists -> logout after token expires
      submit(null, {method: 'post', action: '/logout', replace: true})
    }, remainingExpirationTime);
    
    return () => {
      if(!token){ // if token does not exists -> quit
        return
      }
      clearTimeout(logoutTimer) // if token exists -> else clear the set timer
    }

  }, [token])

  return (
    <>
        <PrimaryHeader />
        <Outlet />
        <PrimaryFooter />
    </>
  )
}
