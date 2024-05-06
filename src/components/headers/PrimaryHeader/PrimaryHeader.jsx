import React from 'react'
import style from './PrimaryHeader.module.css'
import RegisterForm from '../../RegisterForm/RegisterForm'
import { Form, Link, NavLink, useLocation, useRouteLoaderData, useSubmit } from 'react-router-dom'
import CombinedSearch from '../../CombinedSearch/CombinedSearch'

export default function PrimaryHeader() {

  const isLoggedIn = useRouteLoaderData('root')

  const location = useLocation()

  const submit = useSubmit()

  const logoutHandler = () => { 
      submit({pathname: location.pathname}, { method: 'post', action: '/logout', replace: true }) // logout but stay on that page
   }

  return (
    <nav className={style.container}>
      <div className={`${style['sub-container']} ${style.first}`}>
        <Link to='/'>Alpha Events</Link>
      </div>
      <div className={`${style['sub-container']} ${style.middle}`}>
        <CombinedSearch />
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
        {!isLoggedIn && <NavLink to='login?state=signup' className={({isActive}) => isActive ? style.active : ''}>Login</NavLink>}
        {isLoggedIn && <button onClick={logoutHandler} className={style.logout}>Logout</button>}
        <RegisterForm />
      </div>
    </nav>
  )
}
