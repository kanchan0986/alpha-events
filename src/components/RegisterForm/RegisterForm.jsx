import React, { useEffect, useRef } from 'react'
import { useFetcher } from 'react-router-dom'
import style from './RegisterForm.module.css'

export default function RegisterForm() {

  const formRef = useRef()

  const fetcher = useFetcher()


  useEffect(() => {                     ///////////////// Reseting input data 

    if(fetcher.formData){
      formRef.current.reset()
    }

  }, [fetcher.formData])

  return (
    <fetcher.Form method='POST' action='/newsletter' className={style['newsletter-form']} ref={formRef}>
        <input type="email" name="newsletter"/>
        <button>Register</button>
    </fetcher.Form>
  )
}
