import { redirect } from "react-router-dom"

export const modifyEventAction = async ({request, params}) => {

    const formData = await request.formData()

    const method = request.method

    let url = 'http://localhost:8080/events/'

    const event = {
        title: formData.get('title'),
        description: formData.get('description'),
        date: formData.get('date'),
        image: formData.get('image')
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
    return redirect('/events')
}

export const modifyPostAction = async ({request, params}) => {

    const formData = await request.formData()

    const method = request.method

    let url = 'https://jsonplaceholder.typicode.com/posts/'

    const post = {
        title: formData.get('title'),
        body: formData.get('body'),
        userId: formData.get('userId')
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
    return redirect('/posts')
}

export const registerAction = async ({request}) => {
    const formData = await request.formData()
    const newsletter = formData.get('newsletter')
    // Store the newsletter data
    console.log(newsletter)
    return redirect('/')
}