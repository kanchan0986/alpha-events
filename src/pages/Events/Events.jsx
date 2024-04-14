import React, { Suspense, useState } from 'react'
import { Await, Link, useLoaderData, useSearchParams, useSubmit } from 'react-router-dom'
import style from './Events.module.css'
import SearchForm from '../../components/SearchForm/SearchForm'
import LoadingMessage from '../../components/LoadingMessage/LoadingMessage'

export default function Events() {

  const [ searchData, setSearchData ] = useState([])

  const [ searchKeyword, setSearchKeyword ] = useState('')

  const { events } = useLoaderData()

  const [ searchParams ] = useSearchParams()

  const submit = useSubmit()


  const listEvents = (resolvedEventsData) => {    // Awaiting function to create listing component by getting the resolved data from the Await component's children

  //////////////////// Search Logic /////////////////////

  const redirectedKey = searchParams.get('keyword')  // getting back the search keyword
  
  const keyUpHandler = (searchKey) => {
    const searchValue = resolvedEventsData.filter(event => event.title.toLowerCase().includes(searchKey.toLowerCase()))
    setSearchData(searchValue)
    setSearchKeyword(searchKey) // setting search keyword to access it back from searchParams when any redirection occurs like pressing back button or delete event
   }



    //////////////////// Filteration Logic /////////////////////

  const filterParams = searchParams.get('filter')

  let filterData, alteredData

  searchData.length > 0 ? alteredData = searchData : alteredData = resolvedEventsData

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
    submit(null, {method: 'DELETE', action: `/events/${eventId}`})
 }

  const eventsList = filterData.map(event => {
    return (
      <li className={style.event} key={event.id}>
        <Link to={event.id} state={{ redirect: `?${searchParams}`, searchKeyword: searchKeyword }}>
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
      </>
    )

   }
   

  return (
    <section className={style.container}>
      <h2>Events</h2>
      <Suspense fallback={<LoadingMessage postType='Events' />}>
        <Await resolve={events}>
          {resolvedEventsData => listEvents(resolvedEventsData)}
        </Await>
      </Suspense>
    </section>
  )
}


