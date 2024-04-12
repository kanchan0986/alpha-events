import React from 'react'
import style from './LoadingMessage.module.css'

export default function LoadingMessage({ postType }) {
  return (
    <div className={style.container}>
        <p>{postType} loading......Please wait!!</p>
    </div>
  )
}
