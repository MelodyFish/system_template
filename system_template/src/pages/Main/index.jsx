import React from 'react'
import {useRoutes} from 'react-router-dom'
import {routes} from '../../routes'
import './index.css'
export default function Main() {
  const element = useRoutes(routes)
  return (
    <div className='main'>
      {element}
    </div>
  )
}
