import React, { Suspense } from 'react'
import { Link, useRouteLoaderData, Await, useSubmit } from 'react-router-dom'
import style from './Event.module.css'
import LoadingMessage from '../../components/LoadingMessage/LoadingMessage'

export default function Event() {

    const { event } = useRouteLoaderData('event')

    const submit = useSubmit()

    const renderEvent = (resolvedEvent) => { 
  
      const event = resolvedEvent
  
      const deleteHandler = (eventId) => { 
        console.log('Deleting Event...')
        submit(null, {method: 'DELETE', action: `/events/${eventId}`, replace: true })
       }

      return (
        
        <>
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
            <Link to={`..`}>Back</Link>
            <a onClick={() => deleteHandler(event.id)}>Delete</a>
            <Link to='edit'>Edit</Link>
          </div>
        </>

      )


     }

  return (
    <section className={style.container}>
      <Suspense fallback={<LoadingMessage postType='Event' />} >
        <Await resolve={event}>
          {resolvedEvent => renderEvent(resolvedEvent)}
        </Await>
      </Suspense>
    </section>
  )
}
