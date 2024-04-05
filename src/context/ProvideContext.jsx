import React, { useState } from 'react'
import Context from './context'

export default function ProvideContext({children}) {
   
    const [isModalVisible, setIsModalVisible] = useState(false)
    

    const initialValue = {

        modalVisibility: {
            isModalVisible,
            setIsModalVisible,
        },

    }

  return (
    <Context.Provider value={initialValue}>{children}</Context.Provider>
  )
}
