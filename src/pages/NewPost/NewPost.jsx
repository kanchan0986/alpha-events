import React from 'react'
import PostForm from '../../components/PostForm/PostForm'
import SuccessModal from '../../components/modals/SuccessModal/SuccessModal'
import style from './NewPost.module.css'
import { useSearchParams } from 'react-router-dom'

export default function NewPost() {

  const [ searchParams ] = useSearchParams()

  const modal = searchParams?.get('modal') || null  // if searchParams is present and has a value in modal param or return null

  return (
    <section className={style.container}>
      <h2>New Post</h2>
      <PostForm method='POST' />
      {modal && <SuccessModal message='Post Created' redirect='/posts' />}  {/************** modal is visible only if modal has a value  **********/}
    </section>
  )
}
