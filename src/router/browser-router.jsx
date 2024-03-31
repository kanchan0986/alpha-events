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
import { deleteEvent, modifyEventAction } from './util/Actions'


const browserRouter = createBrowserRouter([
    {path: '/', element:<RootLayout />, children: [
        {index: true, element:<Home />, loader: loadEvents, action: deleteEvent},
        {path: 'events', element:<EventsLayout />, children: [
            {index: true, element: <Events />, loader: loadEvents},
            {path: 'new', element: <NewEvent />, action: modifyEventAction},
            {path: ':id', id: 'event', loader: loadEvent, action: deleteEvent, children: [
                {index: true, element: <Event />, action: deleteEvent},
                {path: 'edit', element: <EditEvent />, action: modifyEventAction}
            ]},
        ]},
        {path: 'posts', element:<Posts />},
        {path: 'newsletter', element:<Newsletter />},
        {path: 'login', element:<Login />},
    ]},
])

export default browserRouter