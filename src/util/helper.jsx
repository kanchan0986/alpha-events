export const tokenEpiration = () => {
    const expiration = localStorage.getItem('expiration')
    const expirationDate = new Date(expiration).getTime()
    const currentDate = new Date().getTime()
    const remainingExpTime = expirationDate - currentDate
    return remainingExpTime
}

export const loginState = () => {
    return localStorage.getItem('token')
}

export const authenticateUser = async ({ loginData, loginState }) => {
    const request = await fetch(`http://localhost:8080/${loginState}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    if(!request.ok){
        return request
    }    
    return await request.json()
}

export const tokenStorage = ( token ) => {
    localStorage.setItem('token', token)
    const expiration = new Date()
    expiration.setSeconds(expiration.getSeconds() + 60)
    localStorage.setItem('expiration', expiration.toISOString())
}