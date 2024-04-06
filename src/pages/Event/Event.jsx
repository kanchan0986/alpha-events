import React from 'react'
import { Link, useRouteLoaderData } from 'react-router-dom'
import style from './Event.module.css'
import useCustomContext from '../../hooks/useCustomContext'

export default function Event() {

    const eventData = useRouteLoaderData('event')
    const { consentModalVisibility, consentDetails } = useCustomContext()
    const event = eventData.event

    const deleteHandler = (eventId) => { 
      consentModalVisibility.setIsModalVisible(true)
      consentDetails.consentMessage.setMessage('Are you sure you to delete this event?')
      consentDetails.consentValue.setValue({key: 'events', value: eventId, option: true})   // refer to Consentmodal.jsx for explaination
     }

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
        <a onClick={() => deleteHandler(event.id)}>Delete</a>
        <Link to='edit'>Edit</Link>
      </div>
    </section>
  )
}
