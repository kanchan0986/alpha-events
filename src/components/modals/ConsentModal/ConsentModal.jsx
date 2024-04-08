import React from 'react'
import Portal from '../../Portal/Portal'
import useCustomContext from '../../../hooks/useCustomContext'
import style from './ConsentModal.module.css'
import { useSubmit, useNavigate } from 'react-router-dom'

export default function ConsentModal() {

    const { consentDetails, consentModalVisibility } = useCustomContext()

    const submit = useSubmit()

    const navigate = useNavigate()

    const { key, value, option, redirect } = consentDetails.consentValue.value            // custom object with custom properties just to scale the functionality, redirection support and case dependent solution

    const positiveConsentHandler = () => {
        consentModalVisibility.setIsModalVisible(false)
        submit(redirect ? { redirect: redirect } : null, {method: 'DELETE', action: `/${key}/${value}`}) // if redirect is present then pass redirect as an object to actions file; key is the route and value is params
        if(option){
            navigate(`/${key}${option ? redirect : ''}`)  // if option is true navigate to key -> route and if redirect -> params is present then attach parans with the route
        }
     }

    const negetiveConsentHandler = () => {
        consentModalVisibility.setIsModalVisible(false)
        consentDetails.consentValue.setValue(null)
     }

     const handleClose = () => { 
        consentDetails.consentMessage.setMessage('')
        consentModalVisibility.setIsModalVisible(false)
        consentDetails.consentValue.setValue(null)
     }

  return (
    <Portal handleClose={handleClose} >
        <div className={style.container}>
            <h2>{consentDetails.consentMessage.message}</h2>
            <div className={style['btn-box']}>
                <button onClick={positiveConsentHandler}>Yes</button>
                <button onClick={negetiveConsentHandler}>No</button>
            </div>
        </div>
    </Portal>
  )
}
