import React from 'react'
import style from './Post.module.css'
import { useSubmit, Link, useRouteLoaderData } from 'react-router-dom'

export default function Post() {

    const post = useRouteLoaderData('post')
    const submit = useSubmit()

    const deleteHandler = () => { 
      submit(null, {method: 'DELETE'})
     }

  return (
    <section className={style.container}>
      <h2>{post.title}</h2>
      <div className={`${style['sub-container']} ${style['desc-box']}`}>
        <p>{post.body}</p>
      </div>
      <div className={`${style['sub-container']} ${style['btn-box']}`}>
        <Link to='..'>Back</Link>
        <a onClick={deleteHandler}>Delete</a>
        <Link to='edit'>Edit</Link>
      </div>
    </section>
  )
}
