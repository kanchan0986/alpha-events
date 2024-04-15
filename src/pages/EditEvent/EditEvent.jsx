import React from 'react'
import style from './EditEvent.module.css'
import EventForm from '../../components/EventForm/EventForm'
import { Await, useRouteLoaderData } from 'react-router-dom'
import SuccessModal from '../../components/modals/SuccessModal/SuccessModal'

export default function EditEvent() {

  const { event } = useRouteLoaderData('event')

  return (
    <section className={style.container}>
      <Await resolve={event}>{/**********Resolved the promise got from the loader********/}
        {resolvedEvent => {
          return (
            <>
              <h2>Edit {resolvedEvent.title}</h2>
              <EventForm existingEvent={resolvedEvent} method='patch' />
            </>
          )
        }}
      </Await>
      <SuccessModal />
    </section>
  )
}
