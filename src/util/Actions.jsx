import { redirect } from "react-router-dom"

export const modifyEventAction = async ({request, params}) => {

    const formData = await request.formData()

    const method = request.method

    let url = 'http://localhost:8080/events/'

    const event = {
        title: formData.get('event_title'),
        description: formData.get('event_description'),
        date: formData.get('event_date'),
        image: formData.get('event_image')
    }

    if(method === 'PATCH'){
        url = url + params.id
    }

    const response = await fetch(url, {
        method,
        body: JSON.stringify(event),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
        // 
    }

    console.log(response)
    console.log('Event Modified')
    return redirect('/events')
}

export const deleteEvent = async ({params}) => {
    const id = params.id
    const response = await fetch(`http://localhost:8080/events/${id}`, {
        method: 'DELETE'
    })
    if(!response.ok){
        // 
    }
    console.log(response)
    console.log('Event Deleted')
    return redirect('/events')
}

export const modifyPostAction = async ({request, params}) => {

    const formData = await request.formData()

    const method = request.method

    let url = 'https://jsonplaceholder.typicode.com/posts/'

    const post = {
        title: formData.get('post_title'),
        body: formData.get('post_body'),
        userId: formData.get('post_userId')
    }

    if(method === 'PUT'){
        url = url + params.id
    }

    const response = await fetch(url, {
        method,
        body: JSON.stringify(post),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    if(!response.ok){
        // 
    }

    console.log(response)
    console.log('Post Modified')
    return redirect('/posts')
}

export const deletePost = async ({params}) => {
    const id = params.id
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
    })
    if(!response.ok){
        // 
    }
    console.log(response)
    console.log('Post Deleted')

    return redirect('/posts')
}

export const registerAction = async ({request}) => {
    const formData = await request.formData()
    const newsletter = formData.get('newsletter')
    if(newsletter.trim() !== ''){
        console.log(newsletter)
        // Store the newsletter data
    }
    return null
}