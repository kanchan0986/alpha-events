import React, { useEffect } from 'react'
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom'
import PrimaryHeader from '../components/headers/PrimaryHeader/PrimaryHeader'
import PrimaryFooter from '../components/footers/PrimaryFooter/PrimaryFooter'

export default function RootLayout() {

  const token = useLoaderData()

  const submit  = useSubmit()

  useEffect(() => {

    if(!token){ // if token does not exists in the first load -> quit
      return
    }

    const timer = setTimeout(() => { // if token exists -> logout after set time
      submit(null, {method: 'post', action: '/logout', replace: true})
    }, 60 * 1000); // 60 sec * 1000 micro sec
    
    return () => {
      if(!token){ // if token does not exists -> quit
        return
      }
      clearTimeout(timer) // if token exists -> else clear the set timer
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
