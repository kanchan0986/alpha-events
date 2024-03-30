import React from 'react'
import style from './NewEvent.module.css'
import EventForm from '../../components/EventForm/EventForm'

export default function NewEvent() {
  return (
    <section className={style.container}>
      <h2>New Event</h2>
      <EventForm method='POST' />
    </section>
  )
}
