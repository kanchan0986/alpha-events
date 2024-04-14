import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Events from '../pages/Events/Events'
import Event from '../pages/Event/Event'
import Posts from '../pages/Posts/Posts'
import Post from '../pages/Post/Post'
import NewPost from '../pages/NewPost/NewPost'
import EditPost from '../pages/EditPost/EditPost'
import Newsletter from '../pages/Newsletter/Newsletter'
import Login from '../pages/Login/Login'
import NewEvent from '../pages/NewEvent/NewEvent'
import EditEvent from '../pages/EditEvent/EditEvent'
import RootLayout from '../layouts/RootLayout'
import { loadEvent, loadEvents, loadHomepage, loadPost, loadPosts } from '../util/Loaders'
import { deleteEvent, deletePost, modifyEventAction, modifyPostAction, registerAction } from '../util/Actions'


const router = createBrowserRouter([
    {path: '/', element:<RootLayout />, children: [
        {index: true, element:<Home />, id: 'root', loader: loadHomepage,},
        {path: 'events', children: [
            {index: true, element: <Events />, loader: loadEvents},
            {path: 'new', element: <NewEvent />, action: modifyEventAction},
            {path: ':id', id: 'event', loader: loadEvent, action: deleteEvent, children: [
                {index: true, element: <Event />},
                {path: 'edit', element: <EditEvent />, action: modifyEventAction}
            ]},
        ]},
        {path: 'posts', children: [
            {index: true, element: <Posts />, loader: loadPosts},
            {path: 'new', element: <NewPost />, action: modifyPostAction},
            {path: ':id', id: 'post',  loader: loadPost, action: deletePost, children: [
                {index: true, element: <Post />},
                {path: 'edit', element: <EditPost />, action: modifyPostAction},
            ]}
        ]},
        {path: 'newsletter', element:<Newsletter />, action: registerAction},
        {path: 'login', element:<Login />},
    ]},
])

export default router