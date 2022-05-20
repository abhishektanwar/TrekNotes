import React, { FC } from 'react'
import { useDocumentTitle } from '../../helpers/helper'
import './page-404.css'
const Page404:FC = () => {
  
  useDocumentTitle("Trek Flix | 404 Page not found")
  return (
    <div className="flex-row flex-align-item-center flex-justify-content-center page-404-container">
      <h2 style={{textAlign:'center'}}>Page not found!</h2>
    </div>
  )
}

export default Page404