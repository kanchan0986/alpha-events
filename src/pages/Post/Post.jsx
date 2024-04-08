import React from 'react'
import style from './Post.module.css'
import useCustomContext from '../../hooks/useCustomContext'
import { Link, useRouteLoaderData, useLocation } from 'react-router-dom'

export default function Post() {

    const post = useRouteLoaderData('post')

    const { consentModalVisibility, consentDetails } = useCustomContext()

    const location = useLocation()

    const redirect = location.state?.paramsValue || '' // conditional chaining

    const deleteHandler = (postId) => { 
      consentModalVisibility.setIsModalVisible(true)
      consentDetails.consentMessage.setMessage('Are you sure you to delete this post?')
      consentDetails.consentValue.setValue({key: 'posts', value: postId, option: true, redirect: redirect})   // refer to Consentmodal.jsx for explaination
     }

  return (
    <section className={style.container}>
      <h2>{post.title}</h2>
      <div className={`${style['sub-container']} ${style['desc-box']}`}>
        <p>{post.body}</p>
      </div>
      <div className={`${style['sub-container']} ${style['btn-box']}`}>
        <Link to={`..${redirect}`}>Back</Link>
        <a onClick={() =>deleteHandler(post.id)}>Delete</a>
        <Link to='edit'>Edit</Link>
      </div>
    </section>
  )
}
