import React, { useState } from 'react'
import Context from './context'

export default function ProvideContext({children}) {
   
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
    const [isConsentModalVisible, setIsConsentModalVisible] = useState(false)
    const [successsMessage, setSuccesssMessage] = useState('')
    const [consentMessage, setConsentMessage] = useState('')
    const [consentValue, setConsentValue] = useState(null)
    const [eventLinks, setEventLinks] = useState([])
    const [postLinks, setPostLinks] = useState([])
    

    const initialValue = {

        successModalVisibility: {
            isModalVisible: isSuccessModalVisible,
            setIsModalVisible: setIsSuccessModalVisible,
        },
        consentModalVisibility: {
            isModalVisible: isConsentModalVisible,
            setIsModalVisible: setIsConsentModalVisible,
        },
        successMessage: {
            message: successsMessage,
            setMessage: setSuccesssMessage,
        },
        consentDetails: {
          consentMessage: {
              message: consentMessage,
              setMessage: setConsentMessage,
          },
          consentValue: {
              value: consentValue,
              setValue: setConsentValue,
          },
        },
        backLinks: {
            events: {
                eventLinks,
                setEventLinks,
            },
            posts: {
                postLinks,
                setPostLinks,
            },
        },
    }

  return (
    <Context.Provider value={initialValue}>{children}</Context.Provider>
  )
}
