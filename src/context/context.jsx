import { createContext } from "react";

const Context = createContext({

    modalVisibility: {
        isModalVisible: false,
        setIsModalVisible: () => {},
    },
    
})

export default Context