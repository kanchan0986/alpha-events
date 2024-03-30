import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Events from '../pages/Events/Events'
import Event from '../pages/Event/Event'
import Posts from '../pages/Posts/Posts'
import Newsletter from '../pages/Newsletter/Newsletter'
import Login from '../pages/Login/Login'
import RootLayout from '../layouts/RootLayout'
import EventsLayout from '../layouts/EventsLayout'
import NewEvent from '../pages/NewEvent/NewEvent'
import { loadEvent, loadEvents } from './util/Loaders'
import EditEvent from '../pages/EditEvent/EditEvent'


const browserRouter = createBrowserRouter([
    {path: '/', element:<RootLayout />, children: [
        {index: true, element:<Home />},
        {path: 'events', element:<EventsLayout />, children: [
            {index: true, element: <Events />, loader: loadEvents},
            {path: 'new', element: <NewEvent />},
            {path: ':id', id: 'event', loader: loadEvent, children: [
                {index: true, element: <Event />},
                {path: 'edit', element: <EditEvent />}
            ]},
        ]},
        {path: 'posts', element:<Posts />},
        {path: 'newsletter', element:<Newsletter />},
        {path: 'login', element:<Login />},
    ]},
])

export default browserRouter