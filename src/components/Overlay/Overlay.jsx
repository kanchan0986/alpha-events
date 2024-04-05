import React from 'react'
import style from './Overlay.module.css'

export default function Overlay(props) {

  const handleClick = () => { 
    props.handleClose()
   }

  return (
    <div className={style.container} onClick={handleClick} />
  )
}
