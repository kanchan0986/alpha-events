import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import PostForm from '../../components/PostForm/PostForm'
import style from './EditPost.module.css'

export default function EditPost() {

    const postData = useRouteLoaderData('post')

  return (
    <section className={style.container}>
      <h2>Edit {postData.title}</h2>
      <PostForm existingPost={postData} method='PUT' />
    </section>
  )
}
