import { defer } from "react-router-dom"

/* -------------------------------------------------------------------------- */
/*                               Events Loaders                               */
/* -------------------------------------------------------------------------- */

export const fetchEvents = async () => {
    const response = await fetch('http://localhost:8080/events')
    if(!response.ok){
        // 
    }
    const responseData = await response.json()
    return responseData.events
}

export const loadEvents = () => {
    return defer({
        events: fetchEvents()
    })
}


/* -------------------------------------------------------------------------- */
/*                                Event Loader                                */
/* -------------------------------------------------------------------------- */


export const fetchEvent = async ( params ) => {
    const id = params.id
    const response = await fetch(`http://localhost:8080/events/${id}`)
    if(!response.ok){
        // 
    }
    const responseData = await response.json()
    return responseData.event
}


export const loadEvent = ({ params }) => {
    return defer({
        event: fetchEvent(params)
    })
}

/* -------------------------------------------------------------------------- */
/*                                Posts Loaders                               */
/* -------------------------------------------------------------------------- */

export const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if(!response.ok){
        // 
    }
    const responseData = await response.json()
    return responseData
}

export const loadPosts = () => {
    return defer({
        posts: fetchPosts()
    })
}


/* -------------------------------------------------------------------------- */
/*                                Post Loaders                                */
/* -------------------------------------------------------------------------- */


export const fetchPost = async ( params ) => {
    const id = params.id
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    if(!response.ok){
        // 
    }
    const responseData = await response.json()
    return responseData
}

export const loadPost = ({ params }) => {
    return defer({
        post: fetchPost(params)
    })
}


/* -------------------------------------------------------------------------- */
/*                               Hompage Loaders                              */
/* -------------------------------------------------------------------------- */


export const loadHomepage = () => {

    return defer({
        events: fetchEvents(),
        posts: fetchPosts()
    })
}


