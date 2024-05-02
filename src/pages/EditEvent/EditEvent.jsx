import React from 'react'
import style from './EditEvent.module.css'
import EventForm from '../../components/EventForm/EventForm'
import { Await, useRouteLoaderData, useSearchParams } from 'react-router-dom'
import SuccessModal from '../../components/modals/SuccessModal/SuccessModal'

export default function EditEvent() {

  const { eventData } = useRouteLoaderData('event')

  const [ searchParams ] = useSearchParams()

  const modal = searchParams?.get('modal') || null  // if searchParams is present and has a value in modal param or return null

  return (
    <section className={style.container}>
      <Await resolve={eventData}>{/**********Resolved the promise got from the loader********/}
        {resolvedEvent => {
          const { event } = resolvedEvent
          return (
            <>
              <h2>Edit {event.title}</h2>
              <EventForm existingEvent={event} method='patch' />
              {modal && <SuccessModal message='Event Modified' redirect='..' />}  {/************** modal is visible only if modal has a value  **********/}
            </>
          )
        }}
      </Await>
    </section>
  )
}
