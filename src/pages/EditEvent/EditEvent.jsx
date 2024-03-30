import React from 'react'
import style from './EditEvent.module.css'
import EventForm from '../../components/EventForm/EventForm'
import { useRouteLoaderData } from 'react-router-dom'

export default function EditEvent() {

  const eventData = useRouteLoaderData('event')
  const event = eventData.event

  return (
    <section className={style.container}>
      <h2>Edit {event.title}</h2>
      <EventForm existingEvent={event} method='patch' />
    </section>
  )
}
