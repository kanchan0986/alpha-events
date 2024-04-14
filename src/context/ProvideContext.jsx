import React, { useState } from 'react'
import Context from './context'

export default function ProvideContext({children}) {
    
    const [eventLinks, setEventLinks] = useState([])
    const [postLinks, setPostLinks] = useState([])
    

    const initialValue = {

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
