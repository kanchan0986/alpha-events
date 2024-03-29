import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Events from '../pages/Events/Events'
import Posts from '../pages/Posts/Posts'
import Newsletter from '../pages/Newsletter/Newsletter'
import Login from '../pages/Login/Login'
import RootLayout from '../layouts/RootLayout'


const browserRouter = createBrowserRouter([
    {path: '/', element:<RootLayout />, children: [
        {index: true, element:<Home />},
        {path: '/events', element:<Events />},
        {path: '/posts', element:<Posts />},
        {path: '/newsletter', element:<Newsletter />},
        {path: '/login', element:<Login />},
    ]},
])

export default browserRouter