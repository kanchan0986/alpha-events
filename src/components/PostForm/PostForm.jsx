import React from 'react'
import { Form, Link } from 'react-router-dom'
import style from './PostForm.module.css'

export default function PostForm({existingPost, method}) {
  return (
    <Form method={method} className={style.container}>
      <div className={`${style['sub-container']} ${style['title-box']}`}>
        <label htmlFor="post_title">Title</label>
        <input type="text" name="post_title" id='post_title' placeholder='Enter Post Title' defaultValue={existingPost ? existingPost.title : null} required />
      </div>
      <div className={`${style['sub-container']} ${style['date-box']}`}>
        <label htmlFor="post_userId">User ID</label>
        <input type="number" name="post_userId" id='post_userId' min='1' placeholder='Enter User ID' defaultValue={existingPost ? existingPost.userId : null} required />
      </div>
      <div className={`${style['sub-container']} ${style['desc-box']}`}>
        <label htmlFor="post_body">Description</label>
        <textarea name="post_body" id='post_body' cols="30" rows="10" placeholder='Enter Post Description' defaultValue={existingPost ? existingPost.body : null} required></textarea>
      </div>
      <div className={`${style['sub-container']} ${style['btn-box']}`}>
        <Link to='..'>Back</Link>
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
      </div>
    </Form>
  )
}
