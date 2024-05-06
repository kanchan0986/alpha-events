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