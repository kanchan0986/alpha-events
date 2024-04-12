import React from 'react'
import style from './PrimaryHeader.module.css'
import RegisterForm from '../../RegisterForm/RegisterForm'
import { Link, NavLink } from 'react-router-dom'
import CombinedSearch from '../../CombinedSearch/CombinedSearch'

export default function PrimaryHeader( { combinedData }) {
  return (
    <nav className={style.container}>
      <div className={`${style['sub-container']} ${style.first}`}>
        <Link to='/'>Alpha Events</Link>
      </div>
      <div className={`${style['sub-container']} ${style.middle}`}>
        <CombinedSearch combinedData={combinedData} />
        <ul className={style.menu}>
          <li>
            <NavLink to='events' className={({isActive}) => isActive ? style.active : ''}>Events<span>&#11206;</span></NavLink>
            <ul>
              <li><NavLink to='events/new' className={({isActive}) => isActive ? style.active : ''}>New Event</NavLink></li>
            </ul>
          </li>
          <li>
            <NavLink to='posts' className={({isActive}) => isActive ? style.active : ''}>Posts<span>&#11206;</span></NavLink>
            <ul>
              <li><NavLink to='posts/new' className={({isActive}) => isActive ? style.active : ''}>New Post</NavLink></li>
            </ul>
          </li>
          <li>
            <NavLink to='newsletter' className={({isActive}) => isActive ? style.active : ''}>Newsletter</NavLink>
          </li>
        </ul>
      </div>
      <div className={`${style['sub-container']} ${style.last}`}>
        <NavLink to='login' className={({isActive}) => isActive ? style.active : ''}>Login</NavLink>
        <RegisterForm />
      </div>
    </nav>
  )
}
