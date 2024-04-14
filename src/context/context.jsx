import { createContext } from "react";

const Context = createContext({

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