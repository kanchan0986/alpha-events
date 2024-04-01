import React from 'react'
import { Outlet } from 'react-router-dom'
import SecondaryHeader from '../components/headers/SecondaryHeader/SecondaryHeader'

export default function EventsLayout() {
  return (
    <>
        <SecondaryHeader type='event' />
        <Outlet />
    </>
  )
}
