import React from 'react'
import { Link, useRouteLoaderData,  } from 'react-router-dom'
import style from './Event.module.css'

export default function Event() {

    const eventData = useRouteLoaderData('event')
    const event = eventData.event

  return (
    <section className={style.container}>
      <h2>{event.title}</h2>
      <div className={`${style['sub-container']} ${style['image-box']}`}>
        <img src={event.image}/>
      </div>
      <div className={`${style['sub-container']} ${style['date-box']}`}>
        <span>{event.date}</span>
      </div>
      <div className={`${style['sub-container']} ${style['desc-box']}`}>
        <p>{event.description}</p>
      </div>
      <div className={`${style['sub-container']} ${style['btn-box']}`}>
        <Link to='..'>Back</Link>
        <a >Delete</a>
        <Link to='edit'>Edit</Link>
      </div>
    </section>
  )
}
