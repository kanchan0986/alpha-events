import React from 'react'
import { useSearchParams, Await, useRouteLoaderData } from 'react-router-dom'
import PostForm from '../../components/PostForm/PostForm'
import SuccessModal from '../../components/modals/SuccessModal/SuccessModal'
import style from './EditPost.module.css'

export default function EditPost() {

    const { post } = useRouteLoaderData('post')
    
    const [ searchParams ] = useSearchParams()
  
    const modal = searchParams?.get('modal') || null  // if searchParams is present and has a value in modal param or return null

  return (
    <section className={style.container}>
      <Await resolve={post}>{/**********Resolved the promise got from the loader********/}
        {resolvedPost => {
          return (
            <>
              <h2>Edit {resolvedPost.title}</h2>
              <PostForm existingPost={resolvedPost} method='PUT' />
              {modal && <SuccessModal message='Post Modified' redirect='..' />}  {/************** modal is visible only if modal has a value  **********/}
            </>
          )
        }}
      </Await>
    </section>
  )
}
