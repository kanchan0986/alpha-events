import React, { Suspense } from 'react'
import style from './Post.module.css'
import { Link, useRouteLoaderData, Await, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import ConsentModal from '../../components/modals/ConsentModal/ConsentModal'
import LoadingMessage from '../../components/LoadingMessage/LoadingMessage'

export default function Post() {

    const { post } = useRouteLoaderData('post')

    const [ searchParams ] = useSearchParams()

    const modal = searchParams?.get('modal') || null

    const navigate = useNavigate()

    const location = useLocation()

    const redirectPath = location.state?.redirectPath || '' // state set from combined search

    const redirect = location.state?.redirect || '' // state set from posts search

    const searchKeyword = location.state?.searchKeyword || '' // state set from posts search

    const redirectTo = `${redirect}${searchKeyword && `&keyword=${searchKeyword}`}`  // if search keyword exists attach it with the query params



    const renderPost = (resolvedPost) => {

      const post = resolvedPost
  
      const deleteHandler = (postId) => {
        navigate(`/posts/${postId}?modal=consent`, { state: { type: 'posts', id: postId } }) // Take Consent by opening a consent modal
       }

      return (

        <>
          <h2>{post.title}</h2>
          <div className={`${style['sub-container']} ${style['desc-box']}`}>
            <p>{post.body}</p>
          </div>
          <div className={`${style['sub-container']} ${style['btn-box']}`}>
            <Link to={redirectPath ? redirectPath : `..${redirectTo}`}>Back</Link>
            <a onClick={() =>deleteHandler(post.id)}>Delete</a>
            <Link to='edit'>Edit</Link>
          </div>
          {modal && <ConsentModal message='Are you sure?' />}  {/************** modal is visible only if modal has a value  **********/}
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
