import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useCustomContext from '../../hooks/useCustomContext'
import style from './CombinedSearch.module.css'

export default function CombinedSearch() {

    const [searchKey, setSearchKey] = useState('')

    const [suggestionArr, setSuggestionArr] = useState([])

    const { backLinks } = useCustomContext() // get backlinks from the context provider which sets in Root layout file

    useEffect(() => {
        setSuggestionArr([ ...backLinks.events.eventLinks, ...backLinks.posts.postLinks ])
    }, [backLinks.events.eventLinks, backLinks.posts.postLinks]) // whenever event links and post link changes, set suggestion array


    const changeHandler = (event) => { 
        setSearchKey(event.target.value)
        }

    const submitHandler = () => {
        setSearchKey('')
    }

    const filterArr = suggestionArr.filter(item => item.title.toLowerCase().startsWith(searchKey.toLowerCase())) // check if the result array has the title which starts with the search letters


    const suggestionList = filterArr.map(suggestion => {
        return (
            <Link key={suggestion.id} to={suggestion.id} onClick={submitHandler}>{suggestion.title.slice(0, 55)}</Link>
        )
    })


return (

    <div className={style.container}>
        <input type="text" placeholder='Search Events or Posts' onChange={changeHandler} value={searchKey} />
        {searchKey && suggestionList.length > 0 && <div className={style.suggestions}>{suggestionList}</div>}     {/* check if both search term and result list is available */}
    </div>
)

}
