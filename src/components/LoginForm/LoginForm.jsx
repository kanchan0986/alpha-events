import React from 'react'
import style from './LoginForm.module.css'
import { Form, Link, useSearchParams } from 'react-router-dom'

export default function LoginForm({ state }) {

  const [searchParams] = useSearchParams()

  const redirect = searchParams.get('redirect') // get redirection search params set in Protected routes component

  const redirectionPath = redirect ? `&redirect=${redirect}` : '' // if protected route provides redirection path as a searchparams

  return (
    <Form method='POST' className={style.container} replace={true}>
        <div className={style['input-container']}>
            <label htmlFor="username">Username</label>
            <input type="email" name="email" id="username" />
        </div>
        <div className={style['input-container']}>
            <label htmlFor="pass">Password</label>
            <input type="password" name="password" id="pass" />
        </div>
        <div className={style['button-container']}>
            {state === 'signup' && <Link to={`?state=login${redirectionPath}`} className={style.button}>Login</Link>}
            {state === 'login' && <Link to={`?state=signup${redirectionPath}`} className={style.button}>Signup</Link>}
            <button className={style.button}>Submit</button>
        </div>
    </Form>
  )
}
