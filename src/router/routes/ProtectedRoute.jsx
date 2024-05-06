import React from 'react'
import { Navigate, useLocation, useRouteLoaderData } from 'react-router-dom'

export default function ProtectedRoute({ children }) {

    const isLoggedIn = useRouteLoaderData('root')

    const pathName = useLocation().pathname // getting the location pathname which is being protected

    const redirect = pathName ? `&redirect=${pathName}` : '' // setting the pathname as a queryParams to redirect the user to the protected path when he logs in or signs in

  return (
    <>
    {isLoggedIn ? children : <Navigate to={`/login?state=signup${redirect}`} /> } {/* if logged in then render any children within this component else redirect to signup page */}
    </>
  )
}
