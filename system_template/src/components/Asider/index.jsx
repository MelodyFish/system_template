import React, { useState, useEffect } from 'react'
import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom'
import { routes } from '../../routes'

import './index.css'


const { SubMenu } = Menu;
const curItemKey = sessionStorage.getItem('curItemKey') || '/table/base'
export default function Asider(props) {
  const [theme, setTheme] = useState('light')
  const [current, setCurrent] = useState(curItemKey)
  const { pathname } = useLocation()
  const handleClick = (e) => {
    setCurrent(e.key)
    sessionStorage.setItem('curItemKey', e.key)
  }
  useEffect(()=> {
    setCurrent(pathname==='/'? '/table/base': pathname)
    console.log(pathname);
  },[pathname])
  return (
    <div style={{float: 'left'}}>
      <Menu
        theme={theme}
        onClick={ handleClick}
        className='asider'
        defaultOpenKeys	= {['1', '2', '3', '4']}
        selectedKeys={[current]}
        mode="inline"
      >
        {routes.map(route => {
          if(route.path !=='/') {
            return (
              <SubMenu key={route.key} icon={route.icon} title={route.title}>
               {route.children.map(routeItem => {
                  return (
                    <Menu.Item key={routeItem.key} title={routeItem.title}>
                      <NavLink to={routeItem.path}>{routeItem.title}</NavLink>
                    </Menu.Item>
                  )
               })}
              </SubMenu>
            )
          }
        })}
      </Menu>
    </div>
  )
}

