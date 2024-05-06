import React from 'react'
import style from './LoginForm.module.css'
import { Form, Link, useActionData, useSearchParams } from 'react-router-dom'

export default function LoginForm({ state }) {

  const [searchParams] = useSearchParams()

  const redirect = searchParams.get('redirect') // get redirection search params set in Protected routes component

  const redirectionPath = redirect ? `&redirect=${redirect}` : '' // if protected route provides redirection path as a searchparams

  const actionData = useActionData() // action data returned from the authenticateUser function called in login action

  return (
    <Form method='POST' className={style.container} replace={true}>
        {actionData && actionData.message && <div className={style['error-message']}>
          <h3>{actionData.message}</h3>
        </div>}
        <div className={style['input-container']}>
            <label htmlFor="username">Username</label>
            <input type="text" name="email" id="username" />
            {actionData && actionData.errors.email && <div className={style['error-input']}>
              <span>{actionData.errors.email}</span>
            </div>}
        </div>
        <div className={style['input-container']}>
            <label htmlFor="pass">Password</label>
            <input type="password" name="password" id="pass" />
            {actionData && actionData.errors.password && <div className={style['error-input']}>
              <span>{actionData.errors.password}</span>
            </div>}
        </div>
        <div className={style['button-container']}>
            {state === 'signup' && <Link to={`?state=login${redirectionPath}`} className={style.button}>Login</Link>}
            {state === 'login' && <Link to={`?state=signup${redirectionPath}`} className={style.button}>Signup</Link>}
            <button className={style.button}>Submit</button>
        </div>
    </Form>
  )
}
