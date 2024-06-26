import React, { Suspense } from 'react'
import { Link, useRouteLoaderData, Await, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import style from './Event.module.css'
import LoadingMessage from '../../components/LoadingMessage/LoadingMessage'
import ConsentModal from '../../components/modals/ConsentModal/ConsentModal'

export default function Event() {

    const { eventData } = useRouteLoaderData('event')

    const [ searchParams ] = useSearchParams()

    const modal = searchParams?.get('modal') || null

    const navigate = useNavigate()

    const location = useLocation()
    
    const redirectPath = location.state?.redirectPath || '' // state set from combined search

    const redirect = location.state?.redirect || '' // state set from events search

    const searchKeyword = location.state?.searchKeyword || '' // state set from events search

    const redirectTo = `${redirect}${searchKeyword && `&keyword=${searchKeyword}`}`  // if search keyword exists attach it with the query params

    const pathName = location.pathname // getting the location pathname which is being protected

    const redirectionPath = pathName ? `&redirect=${pathName}` : '' // setting the pathname as a queryParams to redirect the user to the protected path when he logs in or signs in



    const renderEvent = (resolvedEvent) => { 
  
      const { event, isLoggedIn } = resolvedEvent
  
      const deleteHandler = (eventId) => { 
        if(isLoggedIn){
        navigate(`/events/${eventId}?modal=consent`, { state: { type: 'events', id: eventId } }) // Take Consent by opening a consent modal
        }else{
          navigate(`/login?state=signup${redirectionPath}`) // show signup page and send the redirection link as when the user logs in then he will be redirected to this page
        }
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
            <Link to={redirectPath ? redirectPath : `..${redirectTo}`}>Back</Link>
            <a onClick={() => deleteHandler(event.id)}>Delete</a>
            <Link to='edit'>Edit</Link>
          </div>
          {modal && <ConsentModal message='Are you sure?' />}  {/************** modal is visible only if modal has a value  **********/}
        </>

      )


     }

  return (
    <section className={style.container}>
      <Suspense fallback={<LoadingMessage postType='Event' />} >
        <Await resolve={eventData}>
          {renderEvent}
        </Await>
      </Suspense>
    </section>
  )
}
