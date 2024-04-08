import React from 'react'
import style from './SearchForm.module.css'

export default function SearchForm() {
  return (
    <form className={style['search-form']}>
        <input type="search" name="search" id="search" />
        <button>Search</button>
    </form>
  )
}
