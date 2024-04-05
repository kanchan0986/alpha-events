import React from 'react'
import { useFetcher } from 'react-router-dom'
import style from './RegisterForm.module.css'

export default function RegisterForm() {

  const fetcher = useFetcher()

  return (
    <fetcher.Form method='POST' action='/newsletter' className={style['newsletter-form']}>
        <input type="email" name="newsletter"/>
        <button>Register</button>
    </fetcher.Form>
  )
}
