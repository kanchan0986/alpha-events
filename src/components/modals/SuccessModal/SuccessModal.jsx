import React from 'react'
import style from './SuccessModal.module.css'
import Portal from '../../Portal/Portal'
import { useLocation, useSubmit } from 'react-router-dom'

export default function SuccessModal({ message }) {

  const submit = useSubmit()

  const pathName = useLocation().pathname

  const handleClose = () => { 
    submit(null, {method: 'POST', action: `${pathName}/success`, replace: true})
   }

  return (
    <Portal handleClose={handleClose}>
        <div className={style.container}>
            <h2>{message}</h2>
            <button onClick={handleClose}>Close</button>
        </div>
    </Portal>
  )
}
