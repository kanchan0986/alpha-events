import React from 'react'
import style from './PrimaryHeader.module.css'
import RegisterForm from '../../RegisterForm/RegisterForm'
import { Link, NavLink } from 'react-router-dom'

export default function PrimaryHeader() {
  return (
    <nav className={style.container}>
      <div className={`${style['sub-container']} ${style.first}`}>
        <Link to='/'>Alpha Events</Link>
      </div>
      <div className={`${style['sub-container']} ${style.middle}`}>
        <form className={style['search-form']}>
          <input type="search" name="search" id="search" />
          <button>Search</button>
        </form>
        <div className={style.menu}>
          <NavLink to='events' className={({isActive}) => isActive ? style.active : ''}>Events</NavLink>
          <NavLink to='posts' className={({isActive}) => isActive ? style.active : ''}>Posts</NavLink>
          <NavLink to='newsletter' className={({isActive}) => isActive ? style.active : ''}>Newsletter</NavLink>
        </div>
      </div>
      <div className={`${style['sub-container']} ${style.last}`}>
        <NavLink to='login' className={({isActive}) => isActive ? style.active : ''}>Login</NavLink>
        <RegisterForm />
      </div>
    </nav>
  )
}
