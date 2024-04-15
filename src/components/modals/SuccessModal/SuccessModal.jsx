import React from 'react'
import style from './SuccessModal.module.css'
import { useLocation, useSubmit } from 'react-router-dom'

export default function SuccessModal({ message }) {

  const submit = useSubmit()

  const pathName = useLocation().pathname

  const handleClick = () => { 
    submit(null, {method: 'POST', action: `${pathName}/success`, replace: true})
   }

  return (
    <div className={style.overlay}>
        <div className={style.modal}>
            <h2>{message}</h2>
            <button onClick={handleClick}>Close</button>
        </div>
    </div>
  )
}
