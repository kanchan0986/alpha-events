export const loadHomepage = async () => {

    // fetch Events

    const eventsResponse = await fetch('http://localhost:8080/events')
    if(!eventsResponse.ok){
        // 
    }
    const eventsData = await eventsResponse.json()

    // fetch Posts

    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts')
    if(!postsResponse.ok){
        // 
    }
    const postsData = await postsResponse.json()

    const response = { eventsData, postsData}

    return response
}

export const loadEvents = async () => {
    const response = await fetch('http://localhost:8080/events')
    if(!response.ok){
        // 
    }
    return response
}

export const loadEvent = async ({ params }) => {
    const id = params.id
    const response = await fetch(`http://localhost:8080/events/${id}`)
    if(!response.ok){
        // 
    }
    return response
}

export const loadPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if(!response.ok){
        // 
    }
    return response
}

export const loadPost = async ({ params }) => {
    const id = params.id
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    if(!response.ok){
        // 
    }
    const responseData = await response.json()
    return responseData
}