import React from 'react'
import style from './NewEvent.module.css'
import EventForm from '../../components/EventForm/EventForm'
import SuccessModal from '../../components/modals/SuccessModal/SuccessModal'
import { useSearchParams } from 'react-router-dom'

export default function NewEvent() {
  const [searchParams] = useSearchParams()
  const modal = searchParams?.get('modal') || null  // if searchParams is present and has a value in modal param or return null
  return (
    <section className={style.container}>
      <h2>New Event</h2>
      <EventForm method='POST' />
      {modal && <SuccessModal message='Event Created' searchParams={searchParams} />}  {/************** modal is visible only if modal has a value  **********/}
    </section>
  )
}
