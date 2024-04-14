import React, { Suspense } from 'react'
import style from './Post.module.css'
import { Link, useRouteLoaderData, Await, useSubmit } from 'react-router-dom'
import LoadingMessage from '../../components/LoadingMessage/LoadingMessage'

export default function Post() {

    const { post } = useRouteLoaderData('post')

    const submit = useSubmit()

    const renderPost = (resolvedPost) => {

      const post = resolvedPost
  
      const deleteHandler = (postId) => { 
        console.log('Deleting Post...')
        submit(null, {method: 'DELETE', action: `/posts/${postId}`, replace: true})
       }

      return (

        <>
          <h2>{post.title}</h2>
          <div className={`${style['sub-container']} ${style['desc-box']}`}>
            <p>{post.body}</p>
          </div>
          <div className={`${style['sub-container']} ${style['btn-box']}`}>
            <Link to={`..`}>Back</Link>
            <a onClick={() =>deleteHandler(post.id)}>Delete</a>
            <Link to='edit'>Edit</Link>
          </div>
        </>

      )

     }

  return (
    <section className={style.container}>
      <Suspense fallback={<LoadingMessage postType='Post'/>}>
        <Await resolve={post}>
          {resolvedPost => renderPost(resolvedPost)}
        </Await>
      </Suspense>
    </section>
  )
}
