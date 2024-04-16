import React from 'react'
import style from './SuccessModal.module.css'
import Portal from '../../Portal/Portal'
import { useNavigate } from 'react-router-dom'

export default function SuccessModal({ message, redirect }) {

  const navigate = useNavigate()

  const handleClose = () => {
    navigate(redirect, { replace: true }) // get a redirection path as a prop and replace the form history
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
