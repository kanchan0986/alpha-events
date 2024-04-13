import React, { Suspense } from 'react'
import style from './Post.module.css'
import useCustomContext from '../../hooks/useCustomContext'
import { Link, useRouteLoaderData, useLocation, Await } from 'react-router-dom'
import LoadingMessage from '../../components/LoadingMessage/LoadingMessage'

export default function Post() {

    const { post } = useRouteLoaderData('post')

    const { consentModalVisibility, consentDetails } = useCustomContext()

    const location = useLocation()

    const renderPost = (resolvedPost) => { 

      const redirect = location.state?.paramsValue || '' // optional chaining

      const searchKeyword = location.state?.searchKeyword || '' // optional chaining
  
      const redirectTo = `${redirect}${searchKeyword ? `&keyword=${searchKeyword}` : ''}`  // if search keyword exists attach it with the query params

      const post = resolvedPost
  
      const deleteHandler = (postId) => { 
        consentModalVisibility.setIsModalVisible(true)
        consentDetails.consentMessage.setMessage('Are you sure you to delete this post?')
        consentDetails.consentValue.setValue({key: 'posts', value: postId, option: true, redirect: redirectTo})   // refer to Consentmodal.jsx for explaination
       }

      return (

        <>
          <h2>{post.title}</h2>
          <div className={`${style['sub-container']} ${style['desc-box']}`}>
            <p>{post.body}</p>
          </div>
          <div className={`${style['sub-container']} ${style['btn-box']}`}>
            <Link to={`..${redirectTo}`}>Back</Link>
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
