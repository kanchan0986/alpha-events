import React, { useEffect } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import PrimaryHeader from '../components/headers/PrimaryHeader/PrimaryHeader'
import PrimaryFooter from '../components/footers/PrimaryFooter/PrimaryFooter'
import SuccessModal from '../components/modals/SuccessModal/SuccessModal'
import useCustomContext from '../hooks/useCustomContext'
import ConsentModal from '../components/modals/ConsentModal/ConsentModal'

export default function RootLayout() {

  const responseData = useLoaderData()

  const { successModalVisibility, consentModalVisibility, backLinks } = useCustomContext()

  const eventsArrWithBacklinks = responseData.eventsData.events.map(event => ({ ...event, id:  `/events/${event.id}`})) // add events route before the id so to combined search functionality to work 

  const postsArrWithBacklinks = responseData.postsData.map(post => ({ ...post, id:  `/posts/${post.id}`})) // add posts route before the id so to combined search functionality to work 

  useEffect(() => {

    backLinks.events.setEventLinks(eventsArrWithBacklinks)
    backLinks.posts.setPostLinks(postsArrWithBacklinks)

  }, []) // set theem to the context provider once the app loads up

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
