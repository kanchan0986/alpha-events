import React from 'react'
import PostForm from '../../components/PostForm/PostForm'
import style from './NewPost.module.css'

export default function NewPost() {
  return (
    <section className={style.container}>
      <h2>New Post</h2>
      <PostForm method='POST' />
    </section>
  )
}
