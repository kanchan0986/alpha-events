import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import style from './Events.module.css'

export default function Events() {

  const eventsData = useLoaderData()

  const eventsList = eventsData.events.map(event => {
    return (
      <li className={style.event} key={event.id}>
        <Link to={event.id}>
          <img src={event.image} />
          <div className={style['event-desc']}>
            <h4>{event.title}</h4>
            <span>{event.date}</span>
            <p>{event.description}</p>
          </div>
        </Link>
        <button className={style.button}>Delete</button>
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
