import React, { useState } from 'react'
import style from './SearchForm.module.css'

export default function SearchForm(props) {

  const redirectedKey = props.redirectedKey

  const [ searchKey, setSearchKey ] = useState(redirectedKey || '')

  const changeHandler = (event) => { 
    setSearchKey(event.target.value)
   }

  const keyUpHandler = (event) => { 
    setSearchKey(event.target.value)
    props.onKeyUp(searchKey)
   }


  return (
    <div className={style['search-form']}>
        <input type="text" value={searchKey} onKeyUp={keyUpHandler} onChange={changeHandler}  placeholder={`Search ${props.formName}`} />
    </div>
  )
}
