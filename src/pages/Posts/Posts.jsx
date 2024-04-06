import React from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import style from './Posts.module.css'
import useCustomContext from '../../hooks/useCustomContext'

export default function Posts() {

  const postsData = useLoaderData()

  const { consentModalVisibility, consentDetails } = useCustomContext()

  const deleteHandler = (e, postId) => {
    e.preventDefault()
    consentModalVisibility.setIsModalVisible(true)
    consentDetails.consentMessage.setMessage('Are you sure you to delete this post?')
    consentDetails.consentValue.setValue(postId)
 }

  const postsList = postsData.map(post => {
    return (
      <li className={style.post} key={post.id}>
        <Link to={`${post.id}`}>
          <div className={style['post-desc']}>
            <div>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </div>
            <button onClick={(e) => deleteHandler(e, post.id)}>Delete</button>
          </div>
        </Link>
      </li>
    )
  }).slice(0,20)


  return (
    <section className={style.container}>
      <h2>Posts</h2>
      <div className={style['posts-container']}>
          <ul className={style['posts-list']}>{postsList}</ul>
        </div>
    </section>
  )
}
