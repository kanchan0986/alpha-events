import React, { useState } from 'react'
import Context from './context'

export default function ProvideContext({children}) {
   
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    

    const initialValue = {

        modalVisibility: {
            isModalVisible,
            setIsModalVisible,
        },
        successMessage: {
            message: successMessage,
            setMessage: setSuccessMessage,
        },

    }

  return (
    <Context.Provider value={initialValue}>{children}</Context.Provider>
  )
}
