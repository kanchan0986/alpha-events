import React, { Suspense, useEffect } from 'react'
import style from './Home.module.css'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import { Await, Link, useLoaderData, useNavigate, useSearchParams, useSubmit } from 'react-router-dom'
import LoadingMessage from '../../components/LoadingMessage/LoadingMessage'
import useCustomContext from '../../hooks/useCustomContext'
import SuccessModal from '../../components/modals/SuccessModal/SuccessModal'
import ConsentModal from '../../components/modals/ConsentModal/ConsentModal'

export default function Home() {

  const { events, posts } = useLoaderData()

  const { events: eventsLinks, posts: postsLinks } = useCustomContext().backLinks

  const submit = useSubmit()

  const [ searchParams ] = useSearchParams()

  const modal = searchParams?.get('modal') || null

  const navigate = useNavigate()


  /* -------------------------- Combined Search Logic ------------------------- */


  const resolvedEvents = Promise.resolve(events) // Promise came from Loaders which has to be resolved

  const resolvedPosts = Promise.resolve(posts) // Promise came from Loaders which has to be resolved

  useEffect(() => {

      resolvedEvents.then(data => {
          eventsLinks.setEventLinks([...data])
      })
      
      resolvedPosts.then(data => {
          postsLinks.setPostLinks([...data])
      })

  }, []) // Set the resolved promise data to the seperate contexts which can be used in combined search functionality



  /* ----------------------------- Events Listing ----------------------------- */



  const listEvents = (resolvedEventsData) => {    // Awaiting function to create listing component by getting the resolved data from the Await component's children

    const events = resolvedEventsData
    
    const eventDeleteHandler = (e, eventId) => {
        e.preventDefault()
        navigate('/?modal=consent', { state: { type: 'events', id: eventId, pathName: '/' } }) // Take Consent by opening a consent modal
    }


    const eventsList = events.map(event => {
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
    }).slice(0,3)


    return (
      <>
        <div className={style['events-container']}>
          <ul className={style['events-list']}>{eventsList}</ul>
        </div>
        <div className={style['btn-box']}>
          <Link to='events'>Check All Events</Link>
          <Link to='events/new'>Add New Event</Link>
        </div>
        {modal === 'success' && <SuccessModal message='Event Deleted' redirect='/' />}  {/************** modal is visible only if modal has a success value  **********/}
        {modal === 'consent' && <ConsentModal message='Are you sure?' />}  {/************** modal is visible only if modal has a consent value  **********/}
      </>
    )
   }


  /* ----------------------------- Posts Listing ----------------------------- */



  const listPosts = (resolvedPostsData) => {     // Awaiting function to create listing component by getting the resolved data from the Await component's children

    const posts = resolvedPostsData

    const postDeleteHandler = (e, postId) => {
        e.preventDefault()
        navigate('/?modal=consent', { state: { type: 'posts', id: postId, pathName: '/' } }) // Take Consent by opening a consent modal
    }


    const postsList = posts.map(post => {
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

      <>
        <div className={style['posts-container']}>
          <ul className={style['posts-list']}>{postsList}</ul>
        </div>
        <div className={style['btn-box']}>
          <Link to='posts'>Check All Posts</Link>
          <Link to='posts/new'>Add New Post</Link>
        </div>
        {modal === 'success' && <SuccessModal message='Post Deleted' redirect='/' />}  {/************** modal is visible only if modal has a success value  **********/}
        {modal === 'consent' && <ConsentModal message='Are you sure?' />}  {/************** modal is visible only if modal has a consent value  **********/}
      </>

    )
   }





  return (
    <section className={style.container}>
      <h2>Welcome to Alpha Events</h2>
      <div className={style['sub-container']}>
        <h3>Most Popular Events</h3>
        <Suspense fallback={<LoadingMessage postType='Events' />} >
          <Await resolve={events}>
            {resolvedEventsData => listEvents(resolvedEventsData)}
          </Await>
        </Suspense>
      </div>

      <div className={style['sub-container']}>
        <h3>Most Trending Posts</h3>
        <Suspense fallback={<LoadingMessage postType='Posts' />} >
          <Await resolve={posts}>
            {resolvedPostsData => listPosts(resolvedPostsData)}
          </Await>
        </Suspense>
      </div>
      <div className={`${style['sub-container']} ${style['form-container']}`}>
        <h3>Newsletter</h3>
        <RegisterForm />
      </div>
    </section>
  )
}