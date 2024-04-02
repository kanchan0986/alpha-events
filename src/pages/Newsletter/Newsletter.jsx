import React from 'react'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import style from './Newsletter.module.css'

export default function Newsletter() {
  return (
    <section className={style.container}>
      <h2>Register to our Newsletter</h2>
      <div className={`${style['sub-container']}`}>
        <RegisterForm />
      </div>
    </section>
  )
}
