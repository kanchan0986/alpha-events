import React from 'react'
import { Outlet } from 'react-router-dom'
import EventsHeader from '../components/headers/EventsHeader/EventsHeader'

export default function EventsLayout() {
  return (
    <>
        <EventsHeader />
        <Outlet />
    </>
  )
}
