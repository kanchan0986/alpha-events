import React, { Suspense, useState } from 'react'
import { Await, Link, useLoaderData, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import style from './Events.module.css'
import SearchForm from '../../components/SearchForm/SearchForm'
import LoadingMessage from '../../components/LoadingMessage/LoadingMessage'
import SuccessModal from '../../components/modals/SuccessModal/SuccessModal'
import ConsentModal from '../../components/modals/ConsentModal/ConsentModal'

export default function Events() {

  const [ searchData, setSearchData ] = useState([])

  const [ searchKeyword, setSearchKeyword ] = useState('')

  const { eventsData } = useLoaderData()

  const [ searchParams ] = useSearchParams()

  const navigate = useNavigate()

  const modal = searchParams?.get('modal') || null

  const pathName = useLocation().pathname // getting the location pathname which is being protected

  const redirectionPath = pathName ? `&redirect=${pathName}` : '' // setting the pathname as a queryParams to redirect the user to the protected path when he logs in or signs in


  const listEvents = (resolvedEventsData) => {    // Awaiting function to create listing component by getting the resolved data from the Await component's children

    //////////////////// Search Logic on Events page /////////////////////

  const redirectedKey = searchParams?.get('keyword') // getting back the search keyword
  
  const keyUpHandler = (searchKey) => {
    const searchValue = resolvedEventsData.events.filter(event => event.title.toLowerCase().includes(searchKey.toLowerCase()))
    setSearchData(searchValue)
    setSearchKeyword(searchKey) // setting search keyword to access it back from searchParams when any redirection occurs like pressing back button or delete event
   }



    //////////////////// Filteration Logic on Events page /////////////////////

  const filterParams = searchParams.get('filter')

  let filterData, alteredData

  searchData.length > 0 ? alteredData = searchData : alteredData = resolvedEventsData.events

  if(filterParams){

    if(filterParams === 'date'){
      filterData = alteredData.sort((a, b) => new Date(a.date) - new Date(b.date))
    }
  
    if(filterParams === 'alphabetical'){
      filterData = alteredData.sort((a, b) => {
        let x = a.title.toLowerCase()
        let y =  b.title.toLowerCase()
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
    }

  } else {
    filterData = alteredData
  }

   //////////////////// List Rendering /////////////////////


  const deleteHandler = (e, eventId) => {
    e.preventDefault()
    if(resolvedEventsData.isLoggedIn){
      navigate('/events?modal=consent', { state: { type: 'events', id: eventId } }) // Take Consent by opening a consent modal
    }else{
      navigate(`/login?state=signup${redirectionPath}`) // show signup page and send the redirection link as when the user logs in then he will be redirected to this page
    }
 }

  const eventsList = filterData.map(event => {
    return (
      <li className={style.event} key={event.id}>
        <Link to={event.id} state={{ redirect: `?${searchParams}`, searchKeyword: searchKeyword.trim() }}> 
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



      //////////////////// SearchParams generation for filteration /////////////////////



  const generateSearchParams = (paramsType, paramsValue) => { 

    const srchParams = new URLSearchParams(searchParams)

    if(paramsValue === null){
      srchParams.delete(paramsType)
    }else{
      srchParams.set(paramsType , paramsValue)
    }

    return `?${srchParams}`

   }



    return (
      <>
        <div className={style['feature-box']}>
          <div className={style['filter-box']}>
            <ul className={style['filter-list']}>
              <li className={style['filter-item']}><Link to={generateSearchParams('filter', 'date')} className={filterParams === 'date' ? `${style.btn} ${style['date']}` : style.btn}>Creation Date</Link></li>
              <li className={style['filter-item']}><Link to={generateSearchParams('filter', 'alphabetical')} className={filterParams === 'alphabetical' ? `${style.btn} ${style['alphabetical']}` : style.btn}>Alphabetical Order</Link></li>
              <li className={style['filter-item']}><Link to={generateSearchParams('filter', null)} className={style.btn}>Clear All</Link></li>
            </ul>
          </div>
          <div className={style['Search-box']}>
            <SearchForm onKeyUp={keyUpHandler} formName='Events' redirectedKey={redirectedKey} />
          </div>
        </div>
        <div className={style['sub-container']}>
          <ul className={style['events-list']}>{eventsList}</ul>
        </div>
        {modal === 'success' && <SuccessModal message='Event Deleted' redirect='/events' />}  {/************** modal is visible only if modal has a success value  **********/}
        {modal === 'consent' && <ConsentModal message='Are you sure?' />}  {/************** modal is visible only if modal has a consent value  **********/}
      </>
    )

   }
   

  return (
    <section className={style.container}>
      <h2>Events</h2>
      <Suspense fallback={<LoadingMessage postType='Events' />}>
        <Await resolve={eventsData}>
          {listEvents}
        </Await>
      </Suspense>
    </section>
  )
}


