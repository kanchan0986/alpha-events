import React from 'react'
import { useLoaderData, Link, useSearchParams } from 'react-router-dom'
import style from './Posts.module.css'
import useCustomContext from '../../hooks/useCustomContext'
import SearchForm from '../../components/SearchForm/SearchForm'
// import Filter from '../../components/Filter/Filter'

export default function Posts() {

  const postsData = useLoaderData()

  const [ searchParams ] = useSearchParams()

  const { consentModalVisibility, consentDetails } = useCustomContext()

  const deleteHandler = (e, postId) => {
    e.preventDefault()
    consentModalVisibility.setIsModalVisible(true)
    consentDetails.consentMessage.setMessage('Are you sure you to delete this post?')
    consentDetails.consentValue.setValue({key: 'posts', value: postId, option: true, redirect: `?${searchParams.toString()}`})   // refer to Consentmodal.jsx for explaination
 }

 const filterParam = searchParams.get('filter')

 let filterData

 if(filterParam){

   if(filterParam === 'grade'){
      filterData = postsData.sort((a, b) => b.userId - a.userId)
    }
  
   if(filterParam === 'alphabetical'){
      filterData = postsData.sort((a, b) => {
        let x = a.title.toLowerCase()
        let y =  b.title.toLowerCase()
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
    }

 } else {
    filterData = postsData
 }


  const postsList = filterData.map(post => {
    return (
      <li className={style.post} key={post.id}>
        <Link to={`${post.id}`} state={{ paramsValue: `?${searchParams.toString()}` }}  >
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


  const generateSearchParams = (paramsType, paramsValue) => {

    const srchParams = new URLSearchParams(searchParams);

    if (paramsValue === null) {
      srchParams.delete(paramsType);
    } else {
      srchParams.set(paramsType, paramsValue);
    }

    return `?${srchParams.toString()}`;
  };




  return (
    <section className={style.container}>
      <h2>Posts</h2>
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
          <SearchForm />
        </div>
      </div>
      <div className={style['posts-container']}>
          <ul className={style['posts-list']}>{postsList}</ul>
        </div>
    </section>
  )
}
