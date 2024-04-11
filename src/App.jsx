import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import Events from './pages/Events/Events'
import Event from './pages/Event/Event'
import Posts from './pages/Posts/Posts'
import Post from './pages/Post/Post'
import NewPost from './pages/NewPost/NewPost'
import EditPost from './pages/EditPost/EditPost'
import Newsletter from './pages/Newsletter/Newsletter'
import Login from './pages/Login/Login'
import NewEvent from './pages/NewEvent/NewEvent'
import EditEvent from './pages/EditEvent/EditEvent'
import RootLayout from './layouts/RootLayout'
import EventsLayout from './layouts/EventsLayout'
import PostsLayout from './layouts/PostsLayout'
import { loadEvent, loadEvents, loadHomepage, loadPost, loadPosts } from './util/Loaders'
import { deleteEvent, deletePost, modifyEventAction, modifyPostAction, registerAction } from './util/Actions'
import useCustomContext from './hooks/useCustomContext'


export default function App() {  

  const { successModalVisibility, successMessage } = useCustomContext()

  const setter = {
    setIsSuccessModalVisible: successModalVisibility.setIsModalVisible,
    setSuccessMessage: successMessage.setMessage,
  }
  
  const router = createBrowserRouter([
      {path: '/', id: 'root', element:<RootLayout />, loader: loadHomepage, children: [
          {index: true, element:<Home />},
          {path: 'events', element:<EventsLayout />, children: [
              {index: true, element: <Events />, loader: loadEvents},
              {path: 'new', element: <NewEvent />, action: modifyEventAction(setter)},
              {path: ':id', id: 'event', loader: loadEvent, action: deleteEvent(setter), children: [
                  {index: true, element: <Event />, action: deleteEvent(setter)},
                  {path: 'edit', element: <EditEvent />, action: modifyEventAction(setter)}
              ]},
          ]},
          {path: 'posts', element: <PostsLayout />, children: [
              {index: true, element: <Posts />, loader: loadPosts},
              {path: 'new', element: <NewPost />, action: modifyPostAction(setter)},
              {path: ':id', id: 'post',  loader: loadPost, action: deletePost(setter), children: [
                  {index: true, element: <Post />, action: deletePost(setter)},
                  {path: 'edit', element: <EditPost />, action: modifyPostAction(setter)},
              ]}
          ]},
          {path: 'newsletter', element:<Newsletter />, action: registerAction(setter)},
          {path: 'login', element:<Login />},
      ]},
  ])



  return (
    <RouterProvider router={router} />
  )

}
