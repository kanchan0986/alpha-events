import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Events from '../pages/Events/Events'
import Posts from '../pages/Posts/Posts'
import Newsletter from '../pages/Newsletter/Newsletter'
import Login from '../pages/Login/Login'
import RootLayout from '../layouts/RootLayout'
import EventsLayout from '../layouts/EventsLayout'
import NewEvent from '../pages/NewEvent/NewEvent'
import { loadEvents } from './util/Loaders'


const browserRouter = createBrowserRouter([
    {path: '/', element:<RootLayout />, children: [
        {index: true, element:<Home />},
        {path: 'events', element:<EventsLayout />, children: [
            {index: true, element: <Events />, loader: loadEvents},
            {path: 'new', element: <NewEvent />},
        ]},
        {path: 'posts', element:<Posts />},
        {path: 'newsletter', element:<Newsletter />},
        {path: 'login', element:<Login />},
    ]},
])

export default browserRouter