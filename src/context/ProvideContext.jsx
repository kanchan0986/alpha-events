import React, { useState } from 'react'
import Context from './context'

export default function ProvideContext({children}) {
   
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [successsMessage, setSuccesssMessage] = useState('')
    

    const initialValue = {

        modalVisibility: {
            isModalVisible,
            setIsModalVisible,
        },
        successMessage: {
            message: successsMessage,
            setMessage: setSuccesssMessage,
        },

    }

  return (
    <Context.Provider value={initialValue}>{children}</Context.Provider>
  )
}
