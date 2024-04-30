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
import Error from '../pages/Error/Error' 
import RootLayout from '../layouts/RootLayout'
import { loadEvent, loadEvents, loadHomepage, loadPost, loadPosts, loadRoot } from '../util/Loaders'
import { deleteEvent, deletePost, loginAction, logoutAction, modifyEventAction, modifyPostAction, registerAction } from '../util/Actions'
import ProtectedRoute from './routes/ProtectedRoute'


const router = createBrowserRouter([
    {path: '/', element:<RootLayout />, id: 'root', loader: loadRoot, children: [
        {index: true, element:<Home />, loader: loadHomepage,},
        {path: 'events', children: [
            {index: true, element: <Events />, loader: loadEvents},
            {path: 'new', element: <ProtectedRoute> <NewEvent /> </ProtectedRoute>, action: modifyEventAction },
            {path: ':id', id: 'event', loader: loadEvent, action: deleteEvent, children: [
                {index: true, element: <Event />},
                {path: 'edit', element: <EditEvent />, action: modifyEventAction},
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
        {path: 'login', element:<Login />, action: loginAction},
        {path: 'logout', action: logoutAction},
    ], errorElement: <Error />},
])

export default router