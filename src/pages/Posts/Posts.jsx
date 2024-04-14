import React, { Suspense, useState } from 'react'
import { useLoaderData, Link, useSearchParams, Await, useSubmit } from 'react-router-dom'
import style from './Posts.module.css'
import SearchForm from '../../components/SearchForm/SearchForm'
import LoadingMessage from '../../components/LoadingMessage/LoadingMessage'

export default function Posts() {

  const [ searchData, setSearchData ] = useState([])

  const [ searchKeyword, setSearchKeyword ] = useState('')

  const { posts } = useLoaderData()

  const [ searchParams ] = useSearchParams()

  const submit = useSubmit()


  const listPosts = (resolvedPostsData) => {    // Awaiting function to create listing component by getting the resolved data from the Await component's children 

  //////////////////// Search Logic /////////////////////

  const redirectedKey = searchParams.get('keyword')  // getting back the search keyword
  
  const keyUpHandler = (searchKey) => {
    const searchValue = resolvedPostsData.filter(post => post.title.toLowerCase().includes(searchKey.toLowerCase()))
    setSearchData(searchValue)
    setSearchKeyword(searchKey) // setting search keyword to access it back from searchParams when any redirection occurs like pressing back button or delet post
   }


  //////////////////// Filteration Logic /////////////////////


 const filterParam = searchParams.get('filter')

 let filterData, alteredData

 searchData.length > 0 ? alteredData = searchData : alteredData = resolvedPostsData

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
  submit(null, {method: 'DELETE', action: `/posts/${postId}`, replace: true})
}


  const postsList = filterData.map(post => {
    return (
      <li className={style.post} key={post.id}>
        <Link to={`${post.id}`} state={{ paramsValue: `?${searchParams}`, searchKeyword: searchKeyword }}  >
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
    </>

  )
  
   }



  return (
    <section className={style.container}>
      <h2>Posts</h2>
      <Suspense fallback={<LoadingMessage postType='Posts' />}>
        <Await resolve={posts}>
          {resolvedPostsData => listPosts(resolvedPostsData)}
        </Await>
      </Suspense>

    </section>
  )
}
