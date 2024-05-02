import { defer, json } from "react-router-dom"
import { loginState } from "./helper"

/* -------------------------------------------------------------------------- */
/*                               Events Loaders                               */
/* -------------------------------------------------------------------------- */

export const fetchEvents = async () => {
    const response = await fetch('http://localhost:8080/events')
    if(!response.ok){
        throw json(null, {status: 500, statusText: 'Unable to load Events!'})
    }
    const responseData = await response.json()
    const isLoggedIn = loginState()
    return { events: responseData.events, isLoggedIn: isLoggedIn}
}

export const loadEvents = () => {
    return defer({
        eventsData: fetchEvents()
    })
}


/* -------------------------------------------------------------------------- */
/*                                Event Loader                                */
/* -------------------------------------------------------------------------- */


export const fetchEvent = async ( params ) => {
    const id = params.id
    const response = await fetch(`http://localhost:8080/events/${id}`)
    if(!response.ok){
        throw json(null, {status: 500, statusText: 'Unable to load Event!'})
    }
    const responseData = await response.json()
    const isLoggedIn = loginState()
    return { event: responseData.event, isLoggedIn: isLoggedIn}
}


export const loadEvent = ({ params }) => {
    return defer({
        eventData: fetchEvent(params)
    })
}

/* -------------------------------------------------------------------------- */
/*                                Posts Loaders                               */
/* -------------------------------------------------------------------------- */

export const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if(!response.ok){
        throw json(null, {status: 500, statusText: 'Unable to load Posts!'})
    }
    const responseData = await response.json()
    const isLoggedIn = loginState()
    return {posts: responseData, isLoggedIn: isLoggedIn}
}

export const loadPosts = () => {
    return defer({
        postsData: fetchPosts()
    })
}


/* -------------------------------------------------------------------------- */
/*                                Post Loaders                                */
/* -------------------------------------------------------------------------- */


export const fetchPost = async ( params ) => {
    const id = params.id
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    if(!response.ok){
        throw json(null, {status: 500, statusText: 'Unable to load Post!'})
    }
    const responseData = await response.json()
    const isLoggedIn = loginState()
    return {post: responseData, isLoggedIn: isLoggedIn}
}

export const loadPost = ({ params }) => {
    return defer({
        postData: fetchPost(params)
    })
}


/* -------------------------------------------------------------------------- */
/*                               Hompage Loaders                              */
/* -------------------------------------------------------------------------- */


export const loadHomepage = () => {

    return defer({
        eventsData: fetchEvents(),
        postsData: fetchPosts()
    })
}


/* -------------------------------------------------------------------------- */
/*                               Root Loader                              */
/* -------------------------------------------------------------------------- */


export const loadRoot = () => {
    return loginState()
}


