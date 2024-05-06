import React, { Suspense, useState } from 'react'
import { useLoaderData, Link, useSearchParams, Await, useNavigate, useLocation } from 'react-router-dom'
import style from './Posts.module.css'
import SearchForm from '../../components/SearchForm/SearchForm'
import LoadingMessage from '../../components/LoadingMessage/LoadingMessage'
import SuccessModal from '../../components/modals/SuccessModal/SuccessModal'
import ConsentModal from '../../components/modals/ConsentModal/ConsentModal'

export default function Posts() {

  const [ searchData, setSearchData ] = useState([])

  const [ searchKeyword, setSearchKeyword ] = useState('')

  const { postsData } = useLoaderData()

  const [ searchParams ] = useSearchParams()

  const navigate = useNavigate()

  const modal = searchParams?.get('modal') || null

  const pathName = useLocation().pathname // getting the location pathname which is being protected

  const redirectionPath = pathName ? `&redirect=${pathName}` : '' // setting the pathname as a queryParams to redirect the user to the protected path when he logs in or signs in


  const listPosts = (resolvedPostsData) => {    // Awaiting function to create listing component by getting the resolved data from the Await component's children 

  //////////////////// Search Logic on Posts Page /////////////////////

  const redirectedKey = searchParams.get('keyword')  // getting back the search keyword
  
  const keyUpHandler = (searchKey) => {
    const searchValue = resolvedPostsData.posts.filter(post => post.title.toLowerCase().includes(searchKey.toLowerCase()))
    setSearchData(searchValue)
    setSearchKeyword(searchKey) // setting search keyword to access it back from searchParams when any redirection occurs like pressing back button or delet post
   }


  //////////////////// Filteration Logic on Posts Page /////////////////////


 const filterParam = searchParams.get('filter')

 let filterData, alteredData

 searchData.length > 0 ? alteredData = searchData : alteredData = resolvedPostsData.posts

 if(filterParam){

   if(filterParam === 'grade'){
      filterData = alteredData.sort((a, b) => b.userId - a.userId)
    }
  
   if(filterParam === 'alphabetical'){
      filterData = alteredData.sort((a, b) => {
        let x = a.title.toLowerCase()
        let y =  b.title.toLowerCase()
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
    }

 } else {
    filterData = alteredData
 }


   //////////////////// List Rendering /////////////////////


 const deleteHandler = (e, postId) => {
  e.preventDefault()
  if(resolvedPostsData.isLoggedIn){
    navigate('/posts?modal=consent', { state: { type: 'posts', id: postId } }) // Take Consent by opening a consent modal
  }else{
    navigate(`/login?state=signup${redirectionPath}`) // show signup page and send the redirection link as when the user logs in then he will be redirected to this page
  }
}


  const postsList = filterData.map(post => {
    return (
      <li className={style.post} key={post.id}>
        <Link to={`${post.id}`} state={{ redirect: `?${searchParams}`, searchKeyword: searchKeyword.trim() }}  >
          <div className={style['post-desc']}>
            <span className={style['userId']}>Grade: {post.userId}</span>
            <div>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </div>
            <button onClick={(e) => deleteHandler(e, post.id)}>Delete</button>
          </div>
        </Link>
      </li>
    )
  })
  // .slice(0,20)


    //////////////////// SearchParams generation for filteration /////////////////////


  const generateSearchParams = (paramsType, paramsValue) => {

    const srchParams = new URLSearchParams(searchParams);

    if (paramsValue === null) {
      srchParams.delete(paramsType);
    } else {
      srchParams.set(paramsType, paramsValue);
    }

    return `?${srchParams}`;
  };


  return (

    <>
      <div className={style['feature-box']}>
        <div className={style['filter-box']}>
          <ul className={style['filter-list']}>
            <li className={style['filter-item']}>
                <Link to={generateSearchParams('filter', 'grade')} className={filterParam === 'grade' ? `${style.btn} ${style['grade']}` : style.btn} >Grading Order</Link>
            </li>
            <li className={style['filter-item']}>
                <Link to={generateSearchParams('filter', 'alphabetical')} className={filterParam === 'alphabetical' ? `${style.btn} ${style['alphabetical']}` : style.btn} >Alphabetical Order</Link>
            </li>
            <li className={style['filter-item']}>
                <Link to={generateSearchParams('filter', null)} className={filterParam === null ? `${style.btn} ${style[filterParam]}` : style.btn} >Clear All</Link>
            </li>
          </ul>
        </div>
        <div className={style['Search-box']}>
          <SearchForm onKeyUp={keyUpHandler} formName='Posts' redirectedKey={redirectedKey} />
        </div>
      </div>
      <div className={style['posts-container']}>
        <ul className={style['posts-list']}>{postsList}</ul>
      </div>
      {modal === 'success' && <SuccessModal message='Post Deleted' redirect='/posts' />}  {/************** modal is visible only if modal has a success value  **********/}
      {modal === 'consent' && <ConsentModal message='Are you sure?' />}  {/************** modal is visible only if modal has a consent value  **********/}
    </>

  )
  
   }



  return (
    <section className={style.container}>
      <h2>Posts</h2>
      <Suspense fallback={<LoadingMessage postType='Posts' />}>
        <Await resolve={postsData}>
          {listPosts}
        </Await>
      </Suspense>

    </section>
  )
}
