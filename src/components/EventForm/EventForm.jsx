import React from 'react'
import { Form, Link } from 'react-router-dom'
import style from './EventForm.module.css'

export default function EventForm({existingEvent, method}) {
  return (
    <Form method={method} className={style.container}>
      <div className={`${style['sub-container']} ${style['title-box']}`}>
        <label htmlFor="event_title">Title</label>
        <input type="text" name="event_title" id='event_title' placeholder='Enter Event Title' defaultValue={existingEvent ? existingEvent.title : null} required />
      </div>
      <div className={`${style['sub-container']} ${style['image-box']}`}>
        <label htmlFor="event_image">Image</label>
        <input type="url" name="event_image" id='event_image' placeholder='Add Image URL' defaultValue={existingEvent ? existingEvent.image : null} required />
      </div>
      <div className={`${style['sub-container']} ${style['date-box']}`}>
        <label htmlFor="event_date">Date</label>
        <input type="date" name="event_date" id='event_date' defaultValue={existingEvent ? existingEvent.date : null} required />
      </div>
      <div className={`${style['sub-container']} ${style['desc-box']}`}>
        <label htmlFor="event_description">Description</label>
        <textarea name="event_description" id='event_description' cols="30" rows="10" placeholder='Enter Event Description' defaultValue={existingEvent ? existingEvent.description : null} required></textarea>
      </div>
      <div className={`${style['sub-container']} ${style['btn-box']}`}>
        <Link to='..'>Back</Link>
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
      </div>
    </Form>
  )
}
