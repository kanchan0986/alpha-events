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