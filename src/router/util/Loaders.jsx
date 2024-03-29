export const loadEvents = async () => {
    const response = await fetch('http://localhost:8080/events')
    if(!response.ok){
        // 
    }
    return response
}