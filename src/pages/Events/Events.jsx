import React from 'react'
import { Link, useLoaderData, useSearchParams } from 'react-router-dom'
import style from './Events.module.css'
import useCustomContext from '../../hooks/useCustomContext'
import SearchForm from '../../components/SearchForm/SearchForm'

export default function Events() {

  const eventsData = useLoaderData()

  const { consentModalVisibility, consentDetails } = useCustomContext()

  const [ searchParams ] = useSearchParams()

  const filterParams = searchParams.get('filter')


  let filterData

  if(filterParams){

    if(filterParams === 'date'){
      filterData = eventsData.events.sort((a, b) => new Date(a.date) - new Date(b.date))
    }
  
    if(filterParams === 'alphabetical'){
      filterData = eventsData.events.sort((a, b) => {
        let x = a.title.toLowerCase()
        let y =  b.title.toLowerCase()
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
    }

  } else {
    filterData = eventsData.events
  }




  const deleteHandler = (e, eventId) => {
    e.preventDefault()
    consentModalVisibility.setIsModalVisible(true)
    consentDetails.consentMessage.setMessage('Are you sure you to delete this event?')
    consentDetails.consentValue.setValue({key: 'events', value: eventId, option: true, redirect: `?${searchParams}`})   // refer to Consentmodal.jsx for explaination
 }

  const eventsList = filterData.map(event => {
    return (
      <li className={style.event} key={event.id}>
        <Link to={event.id} state={{ redirect: `?${searchParams}` }}>
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
    <section className={style.container}>
      <h2>Events</h2>
      <div className={style['feature-box']}>
        <div className={style['filter-box']}>
          <ul className={style['filter-list']}>
            <li className={style['filter-item']}><Link to={generateSearchParams('filter', 'date')} className={filterParams === 'date' ? `${style.btn} ${style['date']}` : style.btn}>Creation Date</Link></li>
            <li className={style['filter-item']}><Link to={generateSearchParams('filter', 'alphabetical')} className={filterParams === 'alphabetical' ? `${style.btn} ${style['alphabetical']}` : style.btn}>Alphabetical Order</Link></li>
            <li className={style['filter-item']}><Link to={generateSearchParams('filter', null)} className={style.btn}>Clear All</Link></li>
          </ul>
        </div>
        <div className={style['Search-box']}>
          <SearchForm />
        </div>
      </div>
      <div className={style['sub-container']}>
        <ul className={style['events-list']}>{eventsList}</ul>
      </div>
    </section>
  )
}
