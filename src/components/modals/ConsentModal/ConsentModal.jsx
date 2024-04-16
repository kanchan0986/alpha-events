import React from 'react'
import Portal from '../../Portal/Portal'
// import useCustomContext from '../../../hooks/useCustomContext'
import style from './ConsentModal.module.css'
import { useSubmit, useNavigate, useLocation } from 'react-router-dom'

export default function ConsentModal({ message }) {

    // const { consentDetails } = useCustomContext()

    const navigate = useNavigate()

    const submit = useSubmit()

    const location = useLocation()

    const state = location.state

    // const { key, value, option, redirect } = consentDetails.consentValue.value            // custom object with custom properties just to scale the functionality, redirection support and case dependent solution

    // const positiveConsentHandler = () => {
    //     submit(redirect ? { redirect: redirect } : null, {method: 'DELETE', action: `/${key}/${value}`}) // if redirect is present then pass redirect as an object to actions file; key is the route and value is params
    //     if(option){
    //         navigate(`/${key}${option ? redirect : ''}`)  // if option is true navigate to key -> route and if redirect -> params is present then attach parans with the route
    //     }
    //  }


    const positiveConsentHandler = () => {
        submit(null, {method: 'DELETE', action: `/${state.type}/${state.id}`, replace: true }) // state.type defines the route path and state.id defines the dynamic segment
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
