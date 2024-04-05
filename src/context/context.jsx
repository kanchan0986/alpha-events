import { createContext } from "react";

const Context = createContext({

    modalVisibility: {
        isModalVisible: false,
        setIsModalVisible: () => {},
    },
    successMessage: {
        message: '',
        setMessage: () => {},
    },
    
})

export default Context