import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './SecondaryHeader.module.css'

export default function EventsHeader({type}) {
  return (
    <nav className={style.container}>
        <NavLink to='' className={({isActive}) => isActive ? style.active : ''} end>All {type === 'event' ? 'Events' : 'Posts'}</NavLink>
        <NavLink to='new' className={({isActive}) => isActive ? style.active : ''}>New</NavLink>
    </nav>
  )
}
