import { redirect } from "react-router-dom"

/* -------------------------------------------------------------------------- */
/*                     Event creation and updation Action                     */
/* -------------------------------------------------------------------------- */

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

    if(method === 'PATCH'){
        return redirect(`/events/${params.id}/edit?modal=success`) // redirecting to /events/:id/edit with modal-->success as a searchParams
    } else {
        return redirect('/events/new?modal=success') // redirecting to /events/new with modal-->success as a searchParams
    }
}

/* -------------------------------------------------------------------------- */
/*                            Event Deletion Action                           */
/* -------------------------------------------------------------------------- */

export const deleteEvent = async ({request, params}) => {
    const id = params.id
    const pathName = new URL(request.url).searchParams.get('pathname')
    const response = await fetch(`http://localhost:8080/events/${id}`, {
        method: 'DELETE'
    })
    if(!response.ok){
        // 
    }
    console.log(response)

    if(pathName){
        return redirect(`${pathName}?modal=success`) // set to success modal from here with a dynamic pathname
    } else {
        return redirect('/events?modal=success') // set to success modal from here with a fixed path as events
    }

}


/* -------------------------------------------------------------------------- */
/*                      Post creation and updation Action                     */
/* -------------------------------------------------------------------------- */


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
    if(method === 'PUT'){
        console.log('Post Modified')
        return redirect(`/posts/${params.id}`)
    } else {
        console.log('Post Created')
        return redirect('/posts')
    }
}


/* -------------------------------------------------------------------------- */
/*                            Post Deletion Action                            */
/* -------------------------------------------------------------------------- */


export const deletePost = async ({request, params}) => {
    const id = params.id
    const formData = await request.formData()
    const pathName = formData.get('pathName')
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
    })
    if(!response.ok){
        // 
    }
    console.log(response)

    if(pathName){
        console.log('Post Deleted')
        return redirect(pathName)
    } else {
        console.log('Post Deleted')
        return redirect('/posts')
    }

}


/* -------------------------------------------------------------------------- */
/*                       Newsletter Registration Action                       */
/* -------------------------------------------------------------------------- */


export const registerAction = async ({request}) => {
    const formData = await request.formData()
    const newsletter = formData.get('newsletter')
    if(newsletter.trim() !== ''){
        console.log(newsletter)
        // Store the newsletter data
    }
    return null
}