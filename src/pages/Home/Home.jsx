import React from 'react'
import style from './Home.module.css'
import useCustomContext from '../../hooks/useCustomContext'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import { useLoaderData, Link } from 'react-router-dom'

export default function Home() {

  const responseData = useLoaderData()

  const { consentModalVisibility, consentDetails } = useCustomContext()

  const eventDeleteHandler = (e, eventId) => {
      e.preventDefault()
      consentModalVisibility.setIsModalVisible(true)
      consentDetails.consentMessage.setMessage('Are you sure you to delete this event?')
      consentDetails.consentValue.setValue({key: 'events', value: eventId, option: false, redirect: '/'})   // refer to Consentmodal.jsx for explaination
  }

  const postDeleteHandler = (e, postId) => {
      e.preventDefault()
      consentModalVisibility.setIsModalVisible(true)
      consentDetails.consentMessage.setMessage('Are you sure you to delete this post?')
      consentDetails.consentValue.setValue({key: 'posts', value: postId, option: false, redirect: '/'})   // refer to Consentmodal.jsx for explaination
  }



  const eventsList = responseData.eventsData.events.map(event => {
    return (
      <li className={style.event} key={event.id}>
        <Link to={`events/${event.id}`}>
          <img src={event.image} />
          <div className={style['event-desc']}>
            <h4>{event.title}</h4>
            <span>{event.date}</span>
            <p>{event.description}</p>
            <button onClick={(e) => eventDeleteHandler(e, event.id)}>Delete</button>
          </div>
        </Link>
      </li>
    )
  })

  const postsList = responseData.postsData.map(post => {
    return (
      <li className={style.post} key={post.id}>
        <Link to={`posts/${post.id}`}>
          <div className={style['post-desc']}>
            <div>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </div>
            <button onClick={(e) => postDeleteHandler(e, post.id)}>Delete</button>
          </div>
        </Link>
      </li>
    )
  }).slice(0,6)

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
        <div className={style['posts-container']}>
          <ul className={style['posts-list']}>{postsList}</ul>
        </div>
        <div className={style['btn-box']}>
          <Link to='posts'>Check All Posts</Link>
          <Link to='posts/new'>Add New Post</Link>
        </div>
      </div>
      <div className={`${style['sub-container']} ${style['form-container']}`}>
        <h3>Newsletter</h3>
        <RegisterForm />
      </div>
    </section>
  )
}