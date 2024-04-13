import React, { Suspense } from 'react'
import { Link, useRouteLoaderData, useLocation, Await } from 'react-router-dom'
import style from './Event.module.css'
import useCustomContext from '../../hooks/useCustomContext'
import LoadingMessage from '../../components/LoadingMessage/LoadingMessage'

export default function Event() {

    const location = useLocation()

    const { event } = useRouteLoaderData('event')

    const { consentModalVisibility, consentDetails } = useCustomContext()

    const renderEvent = (resolvedEvent) => { 

      const redirect = location.state?.redirect || ''     // optional chaining

      const searchKeyword = location.state?.searchKeyword || '' // optional chaining
  
      const redirectTo = `${redirect}${searchKeyword ? `&keyword=${searchKeyword}` : ''}`  // if search keyword exists attach it with the query params
  
      const event = resolvedEvent
  
      const deleteHandler = (eventId) => { 
        consentModalVisibility.setIsModalVisible(true)
        consentDetails.consentMessage.setMessage('Are you sure you to delete this event?')
        consentDetails.consentValue.setValue({key: 'events', value: eventId, option: true, redirect: redirectTo})   // refer to Consentmodal.jsx for explaination
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
            <Link to={`..${redirectTo}`}>Back</Link>
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
