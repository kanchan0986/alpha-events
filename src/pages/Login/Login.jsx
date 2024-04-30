import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import style from './Login.module.css'
import { useSearchParams } from 'react-router-dom'

export default function Login() {

  const [ searchParams ] = useSearchParams()

  const state = searchParams.get('state')

  return (
    <section className={style.container}>
      <h2>{state ? state : 'signup'} Form</h2>
      <LoginForm state={state ? state : 'signup'} />
    </section>
  )
}
