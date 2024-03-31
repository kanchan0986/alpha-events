import React from 'react'
import style from './Home.module.css'
import { useLoaderData, useSubmit, Link } from 'react-router-dom'

export default function Home() {

  const eventsData = useLoaderData()

  const submit = useSubmit()

  const deleteHandler = (e, eventId) => {
      e.preventDefault()
      submit(null, {method: 'DELETE', action: `/events/${eventId}`})
  }



  const eventsList = eventsData.events.map(event => {
    return (
      <li className={style.event} key={event.id}>
        <Link to={`events/${event.id}`}>
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
      <h2>Welcome to Alpha Events</h2>
      <div className={style['sub-container']}>
        <h3>Most Popular Events</h3>
        <div className={style['events-container']}>
          <ul className={style['events-list']}>{eventsList}</ul>
        </div>
        <div className={style['btn-box']}>
          <Link to='events'>Check All Events</Link>
          <Link to='events/new'>Add New Event</Link>
        </div>
      </div>
      <div className={style['sub-container']}>
        <h3>Most Trending Posts</h3>
      </div>
      <div className={style['sub-container']}>
        <h3>Newsletter</h3>
      </div>
    </section>
  )
}