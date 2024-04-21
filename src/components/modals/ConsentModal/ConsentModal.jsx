import React from 'react'
import Portal from '../../Portal/Portal'
import style from './ConsentModal.module.css'
import { useSubmit, useNavigate, useLocation } from 'react-router-dom'

export default function ConsentModal({ message }) {

    const navigate = useNavigate()

    const submit = useSubmit()

    const location = useLocation()

    const state = location.state

    const { type, id, pathName } = state


    const positiveConsentHandler = () => {
        submit(null, {method: 'DELETE', action: `/${type}/${id}${pathName ? `?pathname=${pathName}` : ''}`, replace: true }) // type defines the route path, id defines the dynamic segment and pathName is being sent as an optional query parameter and has the redirection path from the component where it is being called
    }

    const negetiveConsentHandler = () => {
        navigate(-1)
    }
    
    const handleClose = () => {
         navigate(-1)
     }

  return (
    <Portal handleClose={handleClose} >
        <div className={style.container}>
            <h2>{message}</h2>
            <div className={style['btn-box']}>
                <button onClick={positiveConsentHandler}>Yes</button>
                <button onClick={negetiveConsentHandler}>No</button>
            </div>
        </div>
    </Portal>
  )
}
