import React from 'react'
import Portal from '../../Portal/Portal'
import useCustomContext from '../../../hooks/useCustomContext'
import style from './ConsentModal.module.css'
import { useSubmit } from 'react-router-dom'

export default function ConsentModal() {

    const { consentDetails, consentModalVisibility } = useCustomContext()

    const submit = useSubmit()

    const id = consentDetails.consentValue.value

    const positiveConsentHandler = () => { 
        consentDetails.consentValue.setValue(true)
        consentModalVisibility.setIsModalVisible(false)
        submit(null, {method: 'DELETE', action: `/posts/${id}`})
     }

    const negetiveConsentHandler = () => { 
        consentDetails.consentValue.setValue(false)
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
