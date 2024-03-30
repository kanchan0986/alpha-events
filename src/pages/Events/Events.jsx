import React from 'react'
import { Link, useLoaderData, useSubmit } from 'react-router-dom'
import style from './Events.module.css'

export default function Events() {

  const eventsData = useLoaderData()

  const submit = useSubmit()

  const deleteHandler = (e, eventId) => {
    e.preventDefault()
    submit(null, {method: 'DELETE', action: `/events/${eventId}`})
 }

  const eventsList = eventsData.events.map(event => {
    return (
      <li className={style.event} key={event.id}>
        <Link to={event.id}>
          <img src={event.image} />
          <div className={style['event-desc']}>
            <h4>{event.title}</h4>
            <span>{event.date}</span>
            <p>{event.description}</p>
            <button onClick={(e) => deleteHandler(e, event.id)}>Delete</button>
          </div>
        </Link>
      </li>
    )
  })

  return (
    <section className={style.container}>
      <h2>Events</h2>
      <div className={style['sub-container']}>
        <ul className={style['events-list']}>{eventsList}</ul>
      </div>
    </section>
  )
}
