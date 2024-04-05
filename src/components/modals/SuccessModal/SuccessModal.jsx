import React from 'react'
import useCustomContext from '../../../hooks/useCustomContext'
import style from './SuccessModal.module.css'
import Portal from '../../Portal/Portal'

export default function SuccessModal() {

    const { modalVisibility } = useCustomContext()

    const handleClose = () => { 
        modalVisibility.setIsModalVisible(false)
     }

  return (
    <Portal handleClose={handleClose} >
        <div className={style.container}>
            <h2>SuccessModal</h2>
            <button onClick={handleClose}>Close</button>
        </div>
    </Portal>
  )
}
