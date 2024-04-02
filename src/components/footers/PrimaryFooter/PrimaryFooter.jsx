import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../../RegisterForm/RegisterForm'
import style from './PrimaryFooter.module.css'

export default function PrimaryFooter() {
  return (
    <footer className={style.container}>
      <div className={`${style['sub-container']} ${style.first}`}>
        <Link to=''>Home</Link>
        <Link to='events'>Events</Link>
        <Link to='posts'>Posts</Link>
        <Link to='newsletter'>Newsletter</Link>
      </div>
      <div className={`${style['sub-container']} ${style.last}`}>
        <RegisterForm />
      </div>
    </footer>
  )
}
