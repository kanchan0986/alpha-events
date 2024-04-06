import { redirect } from "react-router-dom"

export const modifyEventAction = ({setIsSuccessModalVisible, setSuccessMessage}) => async ({request, params}) => {

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
    setIsSuccessModalVisible(true)
    setSuccessMessage(`Event ${method === 'PATCH' ? 'Edited' : 'Created'}!`)
    return redirect('/events')
}

export const deleteEvent = ({setIsSuccessModalVisible, setSuccessMessage}) => async ({request, params}) => {
    const id = params.id
    const formData = await request.formData()
    const redirectionPath = formData.get('redirect')
    const response = await fetch(`http://localhost:8080/events/${id}`, {
        method: 'DELETE'
    })
    if(!response.ok){
        // 
    }
    console.log(response)
    setIsSuccessModalVisible(true)
    setSuccessMessage('Event Deleted!')
    if(redirectionPath === '/'){
        return redirect(redirectionPath)
    }else{
        return redirect('/events')
    }
}

export const modifyPostAction = ({setIsSuccessModalVisible, setSuccessMessage}) => async ({request, params}) => {

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
    setIsSuccessModalVisible(true)
    setSuccessMessage(`Post ${method === 'PUT' ? 'Edited' : 'Created'}!`)
    return redirect('/posts')
}

export const deletePost = ({setIsSuccessModalVisible, setSuccessMessage}) => async ({request, params}) => {
    const id = params.id
    const formData = await request.formData()
    const redirectionPath = formData.get('redirect')
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
    })
    if(!response.ok){
        // 
    }
    console.log(response)
    setIsSuccessModalVisible(true)
    setSuccessMessage('Post Deleted!')
    if(redirectionPath === '/'){
        return redirect(redirectionPath)
    }else{
        return redirect('/posts')
    }
}

export const registerAction = ({setIsSuccessModalVisible, setSuccessMessage}) => async ({request}) => {
    const formData = await request.formData()
    const newsletter = formData.get('newsletter')
    if(newsletter.trim() !== ''){
        console.log(newsletter)
        // Store the newsletter data
        setIsSuccessModalVisible(true)
        setSuccessMessage('Email Registered!')
    }
    return null
}                    // Note** This is a curried function