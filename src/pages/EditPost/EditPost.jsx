import React from 'react'
import { Await, useRouteLoaderData } from 'react-router-dom'
import PostForm from '../../components/PostForm/PostForm'
import style from './EditPost.module.css'

export default function EditPost() {

    const { post } = useRouteLoaderData('post')

  return (
    <section className={style.container}>
      <Await resolve={post}>{/**********Resolved the promise got from the loader********/}
        {resolvedPost => {
          return (
            <>
              <h2>Edit {resolvedPost.title}</h2>
              <PostForm existingPost={resolvedPost} method='PUT' />
            </>
          )
        }}
      </Await>
    </section>
  )
}
