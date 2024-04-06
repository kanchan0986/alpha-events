import React from 'react'
import useCustomContext from '../../../hooks/useCustomContext'
import style from './SuccessModal.module.css'
import Portal from '../../Portal/Portal'

export default function SuccessModal() {

    const { successModalVisibility, successMessage } = useCustomContext()

    const handleClose = () => { 
        successMessage.setMessage('')
        successModalVisibility.setIsModalVisible(false)
     }

  return (
    <Portal handleClose={handleClose} >
        <div className={style.container}>
            <h2>{successMessage.message}</h2>
            <button onClick={handleClose}>Close</button>
        </div>
    </Portal>
  )
}
