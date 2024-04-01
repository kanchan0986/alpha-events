import React from 'react'
import SecondaryHeader from '../components/headers/SecondaryHeader/SecondaryHeader'
import { Outlet } from 'react-router-dom'

export default function PostsLayout() {
  return (
    <>
        <SecondaryHeader />
        <Outlet />
    </>
  )
}
