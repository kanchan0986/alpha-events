import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from './CombinedSearch.module.css'

export default function CombinedSearch( { combinedData }) {

    const [searchKey, setSearchKey] = useState('')

    const [suggestionArr, setSuggestionArr] = useState([])
    
    const resolvedEvents = Promise.resolve(combinedData.events) // Promise came from Loaders which has to be resolved

    const resolvedPosts = Promise.resolve(combinedData.posts) // Promise came from Loaders which has to be resolved

    useEffect(() => {

        resolvedEvents.then(data => {
            const eventsData = data.map(event => ({ ...event, id:  `/events/${event.id}`})) // add events route before the id so to combined search functionality to work
            setSuggestionArr(prevArr => [...prevArr, ...eventsData])
        })
        
        resolvedPosts.then(data => {
            const postsData = data.map(post => ({ ...post, id:  `/posts/${post.id}`})) // add posts route before the id so to combined search functionality to work
            setSuggestionArr(prevArr => [...prevArr, ...postsData])
        })



    }, [])


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
