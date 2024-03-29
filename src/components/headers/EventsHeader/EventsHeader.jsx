import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './EventsHeader.module.css'

export default function EventsHeader() {
  return (
    <nav className={style.container}>
        <NavLink to='' className={({isActive}) => isActive ? style.active : ''} end>All Events</NavLink>
        <NavLink to='new' className={({isActive}) => isActive ? style.active : ''}>New</NavLink>
    </nav>
  )
}
