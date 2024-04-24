import React from 'react'
import style from './Error.module.css'
import PrimaryHeader from '../../components/headers/PrimaryHeader/PrimaryHeader'
import PrimaryFooter from '../../components/footers/PrimaryFooter/PrimaryFooter'
import { useRouteError } from 'react-router-dom'

export default function Error() {

  const error = useRouteError()
  
  let message = 'Page Not Found'
  
  if(error.status === 500){
    message = error.statusText
  }

  return (
    <>
      <PrimaryHeader />
        <div className={style.container}>
          <h1>{message}</h1>
        </div>
        <PrimaryFooter />
    </>
  )
}
