import React from 'react'
import style from './EditEvent.module.css'
import EventForm from '../../components/EventForm/EventForm'
import { Await, useRouteLoaderData, useSearchParams } from 'react-router-dom'
import SuccessModal from '../../components/modals/SuccessModal/SuccessModal'

export default function EditEvent() {

  const { event } = useRouteLoaderData('event')

  const [ searchParams ] = useSearchParams()

  const modal = searchParams?.get('modal') || null  // if searchParams is present and has a value in modal param or return null

  return (
    <section className={style.container}>
      <Await resolve={event}>{/**********Resolved the promise got from the loader********/}
        {resolvedEvent => {
          return (
            <>
              <h2>Edit {resolvedEvent.title}</h2>
              <EventForm existingEvent={resolvedEvent} method='patch' />
              {modal && <SuccessModal message='Event Modified' />}  {/************** modal is visible only if modal has a value  **********/}
            </>
          )
        }}
      </Await>
    </section>
  )
}
