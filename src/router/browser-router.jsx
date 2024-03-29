import { createBrowserRouter } from 'react-router-dom'


const browserRouter = createBrowserRouter([
    {path: '/', element:<div>Home</div>},
    {path: '/events', element:<div>Events</div>},
    {path: '/posts', element:<div>Posts</div>},
    {path: '/newsletter', element:<div>Newsletter</div>},
    {path: '/login', element:<div>Login</div>}
])

export default browserRouter