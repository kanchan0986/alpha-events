import { createContext } from "react";

const Context = createContext({

    successModalVisibility: {
        isModalVisible: false,
        setIsModalVisible: () => {},
    },
    consentModalVisibility: {
        isModalVisible: false,
        setIsModalVisible: () => {},
    },
    successMessage: {
        message: '',
        setMessage: () => {},
    },
    consentDetails: {
        consentMessage: {
            message: '',
            setMessage: () => {},
        },
        consentValue: {
            value: null,
            setValue: () => {},
        },
    },
    backLinks: {
        events: {
            eventLinks: [],
            setEventLinks: () => {},
        },
        posts: {
            postLinks: [],
            setPostLinks: () => {},
        },
    },

    
})

export default Context